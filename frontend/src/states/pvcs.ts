import create from "zustand";
import { PersistentVolumeClaimProps } from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState,
} from "./common";

type ListPVCState = ListState<PersistentVolumeClaimProps>;

export const useListPVC = create<ListPVCState>((set, get) => ({
  baseUrl: () => `pvcs/`,
  ...createListStore<PersistentVolumeClaimProps, ListPVCState>(set, get),
}));

export const useDetailPVC = create<DetailState>((set, get) => ({
  baseUrl: (namespace?, name?) =>
    `pvcs/${namespace ?? get().namespace}/${name ?? get().name}/`,
  ...createDetailStore<DetailState>(set, get),
}));
