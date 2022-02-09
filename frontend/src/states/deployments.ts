import toast from "react-hot-toast";
import create from "zustand";
import axiosClient from "../common/axios";
import { DeploymentProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListDeploymentState = ListState<DeploymentProps>;

export const useListDeployment = create<ListDeploymentState>((set, get) => ({
  baseUrl: () => `deployments/`,
  ...createListStore<DeploymentProps, ListDeploymentState>(set, get),
}));

export const useDetailDeployment = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `deployments/${namespace ?? get().namespace}/${name ?? get().name}/`,
  restart: async (namespace: string, name: string) => {
    const promise = axiosClient.put(get().baseUrl(namespace, name));
    toast.promise(promise, {
      loading: "로딩 중...",
      success: "재시작 요청이 전송되었습니다.",
      error: (err) => err.response.data.message,
    });
  },
  ...createDetailStore<DetailState>(set, get),
}));
