import create from "zustand";
import axiosClient from "../common/axios";
import {
  ContainerChartDataProps,
  NodeChartDataProps,
  NodeUsageProps,
  PodUsageProps,
} from "../common/types";

interface TopResponse {
  node: NodeUsageProps[];
  pod: PodUsageProps[];
}

interface PodUsageState {
  usagesByPod: {
    [podName: string]: PodUsageProps[];
  };
  usagesByNode: {
    [nodeName: string]: NodeUsageProps[];
  };
  fetch: () => Promise<void>;
  getChartDataOf: (podName: string) => ContainerChartDataProps[];
  getNodeChartDataOf: (nodeName: string) => NodeChartDataProps;
}

export const useMetrics = create<PodUsageState>((set, get) => ({
  usagesByPod: {},
  usagesByNode: {},
  fetch: async () => {
    const res = await axiosClient.get<TopResponse>("top/");
    const usagesByPod = { ...get().usagesByPod };
    for (const usage of res.data.pod) {
      if (usage.name in usagesByPod) {
        if (
          !usagesByPod[usage.name].find((i) => i.timestamp == usage.timestamp)
        ) {
          usagesByPod[usage.name].push(usage);
        }
      } else {
        usagesByPod[usage.name] = [usage];
      }
    }

    const usagesByNode = { ...get().usagesByNode };
    for (const usage of res.data.node) {
      if (usage.name in usagesByNode) {
        if (
          !usagesByNode[usage.name].find((i) => i.timestamp == usage.timestamp)
        ) {
          usagesByNode[usage.name].push(usage);
        }
      } else {
        usagesByNode[usage.name] = [usage];
      }
    }

    set({ usagesByPod: usagesByPod, usagesByNode: usagesByNode });
  },
  getChartDataOf: (podName) => {
    const podUsages = get().usagesByPod[podName];
    if (podUsages == null || podUsages.length === 0) return [];

    const numContainers = podUsages[0].usage.length;

    const containersData: ContainerChartDataProps[] = [];
    for (let i = 0; i < numContainers; i++) {
      const cpuData = {
        id: "cpu",
        data: podUsages.slice(-30).map((usage) => ({
          x: usage.timestamp,
          y: usage.usage[i].cpu,
        })),
      };
      const memoryData = {
        id: "memory",
        data: podUsages.slice(-30).map((usage) => ({
          x: usage.timestamp,
          y: usage.usage[i].memory / 2 ** 20,
        })),
      };
      const containerData: ContainerChartDataProps = {
        containerName: podUsages[0].usage[i].name,
        cpuChartData: cpuData,
        memoryChartData: memoryData,
      };
      containersData.push(containerData);
    }
    return containersData;
  },
  getNodeChartDataOf: (nodeName) => {
    const nodeUsages = get().usagesByNode[nodeName];
    if (nodeUsages == null) {
      return {
        nodeName: nodeName,
        cpuChartData: { id: "cpu", data: [] },
        memoryChartData: { id: "memory", data: [] },
      };
    }

    const cpuData = nodeUsages.slice(-30).map((usage) => ({
      x: usage.timestamp,
      y: usage.usage.cpu,
    }));

    const memoryData = nodeUsages.slice(-30).map((usage) => ({
      x: usage.timestamp,
      y: usage.usage.memory / 2 ** 20,
    }));

    return {
      nodeName: nodeName,
      cpuChartData: { id: "cpu", data: cpuData },
      memoryChartData: { id: "memory", data: memoryData },
    };
  },
}));
