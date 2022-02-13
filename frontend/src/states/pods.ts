import create from "zustand";
import {
  PodProps
} from "../common/types";
import {
  createDetailStore,
  createListStore,
  DetailState,
  ListState
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

/* -------------------------------------------------------------------------- */
/*                                Pod Terminal                                */
/* -------------------------------------------------------------------------- */

export interface TerminalProps {
  podName: string;
  namespace: string;
  containerName: string;
}

interface TerminalState extends TerminalProps {
  isOpen: boolean;
  openTerminal: (props: TerminalProps) => () => void;
  closeTerminal: () => void;
}

export const useTerminal = create<TerminalState>((set) => ({
  isOpen: false,
  podName: "",
  containerName: "",
  namespace: "",
  openTerminal: (props) => () => {
    set({ isOpen: true, ...props });
  },
  closeTerminal: () => {
    set({ isOpen: false });
  },
}));
