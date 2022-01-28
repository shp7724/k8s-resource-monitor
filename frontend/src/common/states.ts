import create from "zustand";
import axiosClient from "./axios";
import { DeploymentProps, NamespaceProps } from "./types";

interface NamespaceState {
  selected: NamespaceProps | null;
  options: NamespaceProps[];
  setSelected: (namespace: NamespaceProps | null) => void;
  fetch: () => Promise<void>;
}

export const useNamespace = create<NamespaceState>((set) => ({
  selected: null,
  options: [],
  setSelected: (namespace) => {
    set({ selected: namespace });
  },
  fetch: async () => {
    const res = await axiosClient.get<NamespaceProps[]>("namespaces/");
    set({ options: res.data });
  },
}));

interface DeploymentState {
  deployments: DeploymentProps[];
  fetch: (namespace: NamespaceProps | null) => Promise<void>;
}

export const useDeployment = create<DeploymentState>((set) => ({
  deployments: [],
  fetch: async (namespace) => {
    const res = await axiosClient.get<DeploymentProps[]>("deployments/", {
      params: { namespace: namespace?.name },
    });
    set({ deployments: res.data });
  },
}));
