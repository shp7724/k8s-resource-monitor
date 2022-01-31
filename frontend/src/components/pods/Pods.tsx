import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useNamespace, usePod } from "../../common/states";
import PodCard from "./PodCard";

const Pods: FC = (): JSX.Element => {
  const namespace = useNamespace((state) => state.selected);
  const { pods, fetch: fetchPods } = usePod((state) => state, shallow);

  useEffect(() => {
    fetchPods(namespace);
  }, [namespace]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {pods.map((pod, idx) => (
        <PodCard key={idx} {...pod} />
      ))}
    </div>
  );
};

export default Pods;
