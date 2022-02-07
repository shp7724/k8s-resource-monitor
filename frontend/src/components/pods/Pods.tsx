import { AxiosError } from "axios";
import { randomInt } from "crypto";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import shallow from "zustand/shallow";
import { useNamespace, usePod, usePodUsage } from "../../common/states";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import PodCard from "./PodCard";
import TerminalDialog from "./TerminalDialog";

export const k8sErrorToast = () => {
  toast.error(
    "K8s 클러스터와의 연결 상태가 불안정합니다.\n나중에 다시 시도해주세요.",
    {
      id: "k8s-error",
      duration: 10000,
    }
  );
};

const Pods: FC = (): JSX.Element => {
  const namespace = useNamespace((state) => state.selected);
  const {
    pods,
    fetch: fetchPods,
    isLoading,
  } = usePod((state) => state, shallow);
  const fetchPodUsage = usePodUsage((state) => state.fetch);

  useEffect(() => {
    fetchPods(namespace);
  }, [namespace]);

  useEffect(() => {
    fetchPodUsage();
    const timerId = setInterval(() => {
      fetchPodUsage().catch(() => {
        k8sErrorToast();
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
      <div className="grid grid-cols-3 gap-6">
        {pods.map((pod, idx) => (
          <PodCard key={idx} {...pod} />
        ))}
      </div>
    </>
  );
};

export default Pods;
