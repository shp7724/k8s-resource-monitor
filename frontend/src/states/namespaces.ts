import { createListStore, ListState } from "./common";
import create from "zustand";
import { NamespaceProps } from "../common/types";

interface ListNamespaceState extends ListState<NamespaceProps> {
  selected?: NamespaceProps;
  setSelected: (namespace?: NamespaceProps) => void;
}

export const useListNamespace = create<ListNamespaceState>((set, get) => ({
  selected: undefined,
  setSelected: (namespace) => {
    set({ selected: namespace });
  },
  baseUrl: () => `namespaces/`,
  ...createListStore<NamespaceProps, ListNamespaceState>(set, get),
}));
