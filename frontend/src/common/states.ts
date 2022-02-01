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
  fetch: (namespace: NamespaceProps | null) => Promise<void>;
  getChartDataOf: (podName: string) => ContainerChartDataProps[];
}

export const usePodUsage = create<PodUsageState>((set, get) => ({
  usagesByPod: {},
  fetch: async (namespace) => {
    const res = await axiosClient.get<PodUsageProps[]>("pods/top/", {
      params: { namespace: namespace?.name },
    });
    const usagesByPod = { ...get().usagesByPod };
    for (const usage of res.data) {
      if (usage.name in usagesByPod) {
        usagesByPod[usage.name].push(usage);
      } else {
        usagesByPod[usage.name] = [];
      }
    }
    set({ usagesByPod: usagesByPod });
  },
  getChartDataOf: (podName) => {
    const podUsages = get().usagesByPod[podName];
    if (podUsages == null || podUsages[0]?.usage == null) return [];

    const numContainers = podUsages[0].usage.length;
    const containersData: ContainerChartDataProps[] = [];
    for (let i = 0; i < numContainers; i++) {
      const cpuData = {
        id: "cpu",
        data: podUsages.map((usage) => ({
          x: usage.timestamp,
          y: usage.usage[i].cpu,
        })),
      };
      const memoryData = {
        id: "memory",
        data: podUsages.map((usage) => ({
          x: usage.timestamp,
          y: usage.usage[i].memory,
        })),
      };
      const containerData: ContainerChartDataProps = {
        containerName: podUsages[0].usage[i].name,
        chartData: [cpuData, memoryData],
      };
      containersData.push(containerData);
    }
    return containersData;
  },
}));
