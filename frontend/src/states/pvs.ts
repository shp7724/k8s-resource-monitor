import create from "zustand";
import { PersistentVolumeProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListPVState = ListState<PersistentVolumeProps>;

export const useListPV = create<ListPVState>((set, get) => ({
  baseUrl: () => `pvs/`,
  ...createListStore<PersistentVolumeProps, ListPVState>(set, get),
}));

export const useDetailPV = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `pvs/${namespace ?? get().namespace}/${name ?? get().name}/`,
  ...createDetailStore<DetailState>(set, get),
}));
