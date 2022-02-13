import create from "zustand";
import { NodeProps } from "../common/types";
import { createListStore, ListState } from "./common";

type ListNodeState = ListState<NodeProps>;

export const useListNode = create<ListNodeState>((set, get) => ({
  baseUrl: () => `nodes/`,
  ...createListStore<NodeProps, ListNodeState>(set, get),
}));
