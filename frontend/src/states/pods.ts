import create from "zustand";
import { PodProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListPodState = ListState<PodProps>;

export const useListPod = create<ListPodState>((set, get) => ({
  baseUrl: () => `pods/`,
  ...createListStore<PodProps, ListPodState>(set, get),
}));

export const useDetailPod = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `pods/${namespace ?? get().namespace}/${name ?? get().name}/`,
  ...createDetailStore<DetailState>(set, get),
}));
