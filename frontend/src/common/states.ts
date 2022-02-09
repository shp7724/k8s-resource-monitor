import toast from "react-hot-toast";
import create from "zustand";
import axiosClient from "./axios";
import {
  ContainerChartDataProps, PodUsageProps
} from "./types";

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

/* -------------------------- Create Resource Modal ------------------------- */

interface CreateResourceModalState {
  yaml: string;
  setYaml: (code: string) => void;
  create: () => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useCreateResourceModal = create<CreateResourceModalState>(
  (set, get) => ({
    yaml: "",
    setYaml: (code) => {
      set({ yaml: code });
    },
    create: () => {
      const promise = axiosClient.post("common/create/", { yaml: get().yaml });
      toast.promise(promise, {
        loading: "생성 중...",
        success: "생성 요청이 전송되었습니다.",
        error: (err) => err.response.data.message,
      });
    },
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  })
);
