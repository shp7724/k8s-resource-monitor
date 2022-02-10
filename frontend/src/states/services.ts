import create from "zustand";
import { ServiceProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListServiceState = ListState<ServiceProps>;

export const useListService = create<ListServiceState>((set, get) => ({
  baseUrl: () => `services/`,
  ...createListStore<ServiceProps, ListServiceState>(set, get),
}));

export const useDetailService = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `services/${namespace ?? get().namespace}/${name ?? get().name}/`,
  ...createDetailStore<DetailState>(set, get),
}));
