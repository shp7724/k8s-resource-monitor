import toast from "react-hot-toast";
import create, { GetState, SetState } from "zustand";
import axiosClient from "../common/axios";
import { NamespaceProps } from "../common/types";
import { k8sConnectionErrorToast } from "../common/utils";

/* -------------------------------------------------------------------------- */
/*                                  ListState                                 */
/* -------------------------------------------------------------------------- */

export interface ListState<T> {
  data: T[];
  isLoading: boolean;
  baseUrl: () => string;
  list: (namespace?: NamespaceProps) => Promise<void>;
}

export const createListStore = <
  DataType,
  StateType extends ListState<DataType>
>(
  set: SetState<StateType>,
  get: GetState<StateType>
) => ({
  data: [],
  isLoading: false,
  list: async (namespace?: NamespaceProps) => {
    set({ isLoading: true });
    const res = await axiosClient
      .get<DataType[]>(get().baseUrl(), {
        params: { namespace: namespace?.name },
      })
      .catch(() => k8sConnectionErrorToast());
    if (!res) {
      return;
    }
    set({ data: res.data, isLoading: false });
  },
});

/* -------------------------------------------------------------------------- */
/*                                 DetailState                                */
/* -------------------------------------------------------------------------- */

export interface DetailState {
  yaml: string;
  setYaml: (yaml: string) => void;

  name: string;
  namespace: string;

  isPatchModalOpen: boolean;
  openModal: (namespace: string, name: string) => void;
  closeModal: () => void;

  isLoading: boolean;
  baseUrl: (namespace?: string, name?: string) => string;

  // only when PatchModal is open
  retrieve: () => Promise<void>;
  update: () => Promise<void>;
  delete: (namespace: string, name: string) => Promise<void>;

  restart?: (namespace: string, name: string) => Promise<void>;
}

export const createDetailStore = <StateType extends DetailState>(
  set: SetState<StateType>,
  get: GetState<StateType>
) => ({
  yaml: "",
  setYaml: (yaml: string) => {
    set({ yaml: yaml });
  },

  name: "",
  namespace: "",
  setNameSpace: (namespace: string, name: string) => {
    set({ namespace: namespace, name: name });
  },

  isPatchModalOpen: false,
  openModal: (namespace: string, name: string) => {
    set({ name: name, namespace: namespace, isPatchModalOpen: true });
  },
  closeModal: () => {
    set({ isPatchModalOpen: false });
  },

  isLoading: false,
  retrieve: async () => {
    set({ yaml: "", isLoading: true });
    const res = await axiosClient.get(get().baseUrl());
    set({ yaml: res.data, isLoading: false });
  },
  update: async () => {
    const promise = axiosClient.patch(get().baseUrl(), { yaml: get().yaml });
    toast.promise(promise, {
      loading: "업데이트 중...",
      success: "업데이트 성공!",
      error: (err) => err.response.data.message,
    });
  },
  delete: async (namespace: string, name: string) => {
    const promise = axiosClient.patch(get().baseUrl(namespace, name));
    toast.promise(promise, {
      loading: "삭제 중...",
      success: "삭제 성공!",
      error: (err) => err.response.data.message,
    });
  },
});

/* -------------------------------------------------------------------------- */
/*                                 CreateState                                */
/* -------------------------------------------------------------------------- */

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
