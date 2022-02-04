import toast from "react-hot-toast";
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
  delete: (namespace: string, name: string) => Promise<void>;
}

export const useDeployment = create<DeploymentState>((set, get) => ({
  deployments: [],
  fetch: async (namespace) => {
    const res = await axiosClient.get<DeploymentProps[]>("deployments/", {
      params: { namespace: namespace?.name },
    });
    set({
      deployments: res.data.filter((dep) => dep.status.available_replicas > 0),
    });
  },
  delete: async (namespace, name) => {
    const promise = axiosClient.delete(`deployments/${namespace}/${name}/`);
    toast
      .promise(promise, {
        loading: "삭제 중...",
        success: "삭제 성공!",
        error: (err) => `${err.response.data.message}`,
      })
      .then(() => {
        setTimeout(() => {
          get().fetch(useNamespace.getState().selected);
        }, 1000);
      });
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
        usagesByPod[usage.name] = [usage];
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

/* --------------------------- Container Terminal --------------------------- */

export interface TerminalProps {
  podName: string;
  namespace: string;
  containerName: string;
}

interface TerminalState extends TerminalProps {
  isOpen: boolean;
  openTerminal: (props: TerminalProps) => () => void;
  closeTerminal: () => void;
}

export const useTerminal = create<TerminalState>((set) => ({
  isOpen: false,
  podName: "",
  containerName: "",
  namespace: "",
  openTerminal: (props) => () => {
    set({ isOpen: true, ...props });
  },
  closeTerminal: () => {
    set({ isOpen: false });
  },
}));
