import create from "zustand";
import { combine } from "zustand/middleware";
import { NamespaceProps } from "./types";

interface NamespaceState {
  selected: NamespaceProps | null;
  options: NamespaceProps[];
  setSelected: (namespace: NamespaceProps | null) => void;
  setOptions: (options: NamespaceProps[]) => void;
}

export const useNamespace = create<NamespaceState>((set) => ({
  selected: null,
  options: [],
  setSelected: (namespace) => {
    set({ selected: namespace });
  },
  setOptions: (options) => set({ options: options }),
}));
