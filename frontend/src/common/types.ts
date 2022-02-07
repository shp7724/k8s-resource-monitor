/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

interface DefaultProps {
  name: string;
  namespace: string;
  labels: {
    [key: string]: string;
  };
}

export interface PodProps extends DefaultProps {
  pod_ip: string;
  creation_timestamp: string;
  status: PodStatusProps[];
}

export interface DeploymentProps extends DefaultProps {
  creation_timestamp: string;
  desired_replicas: string;
  status: {
    available_replicas: number;
    ready_replicas: number;
    replicas: number;
  };
  containers: ContainerProps[];
  pods: PodProps[];
}

export interface ConfigMapProps extends DefaultProps {
  data: {
    [key: string]: string;
  };
}

export interface ContainerProps {
  name: string;
  image: string;
  image_pull_policy: string;
}

export interface PodStatusProps {
  type: "Initialized" | "Ready" | "ContainersReady" | "PodScheduled";
  message: string;
  reason: string;
  status: boolean;
}

export interface NamespaceProps {
  name: string;
}

export interface PodUsageProps {
  name: string; // pod name
  timestamp: string;
  window: number;
  usage: UsageProps[];
}

export interface NodeUsageProps {
  name: string;
  timestamp: string;
  window: number;
  usage: UsageProps;
}

export interface UsageProps {
  name: string;
  cpu: number;
  memory: number;
}

export interface ContainerChartDataProps {
  containerName: string;
  cpuChartData: ChartDataProps;
  memoryChartData: ChartDataProps;
}

export interface ChartDataProps {
  id: string;
  data: { x: string; y: number }[];
}

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type themeColors = "indigo" | "blue";
export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;
