import toast from "react-hot-toast";
import create, { GetState, SetState } from "zustand";
import { k8sErrorToast } from "../components/pods/Pods";
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
  isLoading: boolean;
  fetch: (namespace: NamespaceProps | null) => Promise<void>;
  delete: (namespace: string, name: string) => void;
  restart: (namespace: string, name: string) => void;
}

export const useDeployment = create<DeploymentState>((set, get) => ({
  deployments: [],
  isLoading: false,
  fetch: async (namespace) => {
    set({ isLoading: true });
    const res = await axiosClient
      .get<DeploymentProps[]>("deployments/", {
        params: { namespace: namespace?.name },
      })
      .catch(() => {
        k8sErrorToast();
      });
    if (!res) {
      return;
    }
    set({
      deployments: res.data.filter((dep) => dep.status.available_replicas > 0),
      isLoading: false,
    });
  },
  delete: (namespace, name) => {
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
  restart: (namespace, name) => {
    const promise = axiosClient.put(`deployments/${namespace}/${name}/`);
    toast
      .promise(promise, {
        loading: "로딩 중...",
        success: "재시작 요청이 전송되었습니다.",
        error: (err) => err.response.data.message,
      })
      .then(() => {
        setTimeout(() => {
          get().fetch(useNamespace.getState().selected);
        }, 1000);
      });
  },
}));

/* ----------------------------- Patch Resources ---------------------------- */

interface PatchResourceModalState {
  yaml: string;
  isPatchModalOpen: boolean;
  name: string;
  namespace: string;
  isLoading: boolean;
  baseUrl: () => string;
  openModal: (namespace: string, name: string) => void;
  setPatchModalOpen: (isOpen: boolean) => void;
  retrieve: () => Promise<void>;
  update: () => void;
  setYaml: (code: string) => void;
}

const commonPatchModalStore = (
  set: SetState<PatchResourceModalState>,
  get: GetState<PatchResourceModalState>
) => ({
  name: "",
  namespace: "",
  yaml: "",
  isPatchModalOpen: false,
  isLoading: false,
  openModal: (namespace: string, name: string) => {
    set({ name: name, namespace: namespace, isPatchModalOpen: true });
  },
  setPatchModalOpen: (isOpen: boolean) => {
    set({ isPatchModalOpen: isOpen });
  },
  setYaml: (code: string) => {
    set({ yaml: code });
  },
  retrieve: async () => {
    set({ yaml: "", isLoading: true });
    const res = await axiosClient.get(get().baseUrl());
    set({ yaml: res.data, isLoading: false });
  },
  update: () => {
    const promise = axiosClient.patch(get().baseUrl(), { yaml: get().yaml });
    toast.promise(promise, {
      loading: "업데이트 중...",
      success: "업데이트 성공!",
      error: (err) => err.response.data.message,
    });
  },
});

/* ------------------------- Deployment Patch Modal ------------------------- */

export const useDeploymentPatchModal = create<PatchResourceModalState>(
  (set, get) => ({
    baseUrl: () => `deployments/${get().namespace}/${get().name}/`,
    ...commonPatchModalStore(set, get),
  })
);

/* -------------------------- ConfigMap Patch Modal ------------------------- */

export const useConfigMapPatchModal = create<PatchResourceModalState>(
  (set, get) => ({
    baseUrl: () => `configmaps/${get().namespace}/${get().name}/`,
    ...commonPatchModalStore(set, get),
  })
);

/* ---------------------------------- Pods ---------------------------------- */

interface PodState {
  pods: PodProps[];
  isLoading: boolean;
  fetch: (namespace: NamespaceProps | null) => Promise<void>;
  delete: (namespace: string, name: string) => void;
}

export const usePod = create<PodState>((set) => ({
  pods: [],
  isLoading: false,
  fetch: async (namespace) => {
    set({ isLoading: true });
    const res = await axiosClient.get<PodProps[]>("pods/", {
      params: { namespace: namespace?.name },
    });
    set({ pods: res.data, isLoading: false });
  },
  delete: (namespace, name) => {
    const promise = axiosClient.delete(`pods/${namespace}/${name}/`);
    toast.promise(promise, {
      loading: "삭제 중...",
      success: "삭제 성공!",
      error: (err) => err.response.data.message,
    });
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
