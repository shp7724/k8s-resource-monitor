import create from "zustand";
import { ConfigMapProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListConfigMapState = ListState<ConfigMapProps>;

export const useListConfigMap = create<ListConfigMapState>((set, get) => ({
  baseUrl: () => `configmaps/`,
  ...createListStore<ConfigMapProps, ListConfigMapState>(set, get),
}));

export const useDetailConfigMap = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `configmaps/${namespace ?? get().namespace}/${name ?? get().name}/`,
  ...createDetailStore<DetailState>(set, get),
}));
