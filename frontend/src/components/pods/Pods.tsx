import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import shallow from "zustand/shallow";
import { usePodUsage } from "../../common/states";
import { useListNamespace } from "../../states/namespaces";
import { useListPod } from "../../states/pods";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import PodCard from "./PodCard";
import TerminalDialog from "./TerminalDialog";

export const k8sConnectionErrorToast = () => {
  toast.error(
    "K8s 클러스터와의 연결 상태가 불안정합니다.\n나중에 다시 시도해주세요.",
    {
      id: "k8s-error",
      duration: 5000,
    }
  );
};

const Pods: FC = (): JSX.Element => {
  const namespace = useListNamespace((state) => state.selected);
  const { data: pods, list, isLoading } = useListPod((state) => state, shallow);
  const fetchPodUsage = usePodUsage((state) => state.fetch);

  useEffect(() => {
    list(namespace);
  }, [namespace]);

  useEffect(() => {
    fetchPodUsage();
    const timerId = setInterval(() => {
      fetchPodUsage().catch(() => {
        k8sConnectionErrorToast();
      });
    }, 5000);
    return () => clearInterval(timerId);
  }, []);

  if (!isLoading && pods.length === 0) {
    return <NotFound />;
  }

  return isLoading ? (
    <Spinner wrapperClassName="h-96" />
  ) : (
    <>
      <TerminalDialog />
      <div className={gridClassName}>
        {pods.map((pod, idx) => (
          <PodCard key={idx} {...pod} />
        ))}
      </div>
    </>
  );
};

export default Pods;
