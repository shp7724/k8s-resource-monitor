import create from "zustand";
import { IngressProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListIngressState = ListState<IngressProps>;

export const useListIngress = create<ListIngressState>((set, get) => ({
  baseUrl: () => `ingresses/`,
  ...createListStore<IngressProps, ListIngressState>(set, get),
}));

export const useDetailIngress = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `ingresses/${namespace ?? get().namespace}/${name ?? get().name}/`,
  ...createDetailStore<DetailState>(set, get),
}));
