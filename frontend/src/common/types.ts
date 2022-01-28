import colors from "tailwindcss/colors";

export interface PodProps {
  name: string;
  namespace: string;
  labels: {
    [key: string]: string;
  };
  pod_ip: string;
  creation_timestamp: string;
  status: ConditionProps[];
}

export interface DeploymentProps {
  name: string;
  namespace: string;
  labels: {
    [key: string]: string;
  };
  creation_timestamp: string;
  desired_replicas: string;
  status: {
    available_replicas: number;
    ready_replicas: number;
    replicas: number;
  };
  containers: ContainerProps[];
}

export interface ContainerProps {
  image: string;
  image_pull_policy: string;
}

export interface ConditionProps {
  type: string;
  message: string;
  reason: string;
  status: string;
}

export interface NamespaceProps {
  name: string;
}
