import create from "zustand";
import axiosClient from "./axios";
import {
  ContainerChartDataProps,
  DeploymentProps,
  NamespaceProps,
  PodProps,
  PodUsageProps,
} from "./types";

/* -------------------------------- Namespace ------------------------------- */

interface NamespaceState {
  selected: NamespaceProps | null;
  options: NamespaceProps[];
  setSelected: (namespace: NamespaceProps | null) => void;
  fetch: () => Promise<void>;
}

export const useNamespace = create<NamespaceState>((set) => ({
  selected: null,
  options: [],
  setSelected: (namespace) => {
    set({ selected: namespace });
  },
  fetch: async () => {
    const res = await axiosClient.get<NamespaceProps[]>("namespaces/");
    res.data.unshift({ name: "전체" });
    set({ options: res.data });
  },
}));

/* ------------------------------- Deployment ------------------------------- */

interface DeploymentState {
  deployments: DeploymentProps[];
  fetch: (namespace: NamespaceProps | null) => Promise<void>;
}

export const useDeployment = create<DeploymentState>((set) => ({
  deployments: [],
  fetch: async (namespace) => {
    const res = await axiosClient.get<DeploymentProps[]>("deployments/", {
      params: { namespace: namespace?.name },
    });
    set({ deployments: res.data });
  },
}));

/* ---------------------------------- Pods ---------------------------------- */

interface PodState {
  pods: PodProps[];
  fetch: (namespace: NamespaceProps | null) => Promise<void>;
}

export const usePod = create<PodState>((set) => ({
  pods: [],
  fetch: async (namespace) => {
    const res = await axiosClient.get<PodProps[]>("pods/", {
      params: { namespace: namespace?.name },
    });
    set({ pods: res.data });
  },
}));

/* ---------------------------- Pod Usage Monitor --------------------------- */

interface PodUsageState {
  usagesByPod: {
    [podName: string]: PodUsageProps[];
  };
  fetch: () => Promise<void>;
  getChartDataOf: (podName: string) => ContainerChartDataProps[];
}

export const usePodUsage = create<PodUsageState>((set, get) => ({
  usagesByPod: {},
  fetch: async () => {
    const res = await axiosClient.get<PodUsageProps[]>("pods/top/");
    const usagesByPod = { ...get().usagesByPod };
    for (const usage of res.data) {
      if (usage.name in usagesByPod) {
        if (
          !usagesByPod[usage.name].find((i) => i.timestamp == usage.timestamp)
        ) {
          usagesByPod[usage.name].push(usage);
        }
      } else {
        usagesByPod[usage.name] = [];
      }
    }
    set({ usagesByPod: usagesByPod });
  },
  getChartDataOf: (podName) => {
    const podUsages = get().usagesByPod[podName];
    if (podUsages == null || podUsages.length === 0) return [];

    const numContainers = podUsages[0].usage.length;

    const containersData: ContainerChartDataProps[] = [];
    for (let i = 0; i < numContainers; i++) {
      const cpuData = {
        id: "cpu",
        data: podUsages.slice(-30).map((usage) => ({
          x: usage.timestamp,
          y: usage.usage[i].cpu,
        })),
      };
      const memoryData = {
        id: "memory",
        data: podUsages.slice(-30).map((usage) => ({
          x: usage.timestamp,
          y: usage.usage[i].memory / 2 ** 20,
        })),
      };
      const containerData: ContainerChartDataProps = {
        containerName: podUsages[0].usage[i].name,
        cpuChartData: cpuData,
        memoryChartData: memoryData,
      };
      containersData.push(containerData);
    }
    return containersData;
  },
}));
