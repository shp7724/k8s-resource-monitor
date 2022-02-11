import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { k8sConnectionErrorToast } from "../../common/utils";
import { useListNamespace } from "../../states/namespaces";
import { useListPod, usePodUsage } from "../../states/pods";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import PodCard from "./PodCard";
import TerminalDialog from "./TerminalDialog";

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
      fetchPodUsage().catch(err => {
        k8sConnectionErrorToast(err);
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
