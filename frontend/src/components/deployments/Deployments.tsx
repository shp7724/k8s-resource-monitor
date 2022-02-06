import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useDeployment, useNamespace } from "../../common/states";
import DeploymentCard from "./DeploymentCard";
import PatchDeploymentModal from "./PatchDeploymentModal";

const Deployments: FC = (): JSX.Element => {
  const namespace = useNamespace((state) => state.selected);
  const { deployments, fetch } = useDeployment((state) => state, shallow);

  useEffect(() => {
    fetch(namespace);
  }, [namespace]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {deployments.map((deployment, idx) => (
        <>
          <DeploymentCard key={idx} {...deployment} />
        </>
      ))}
      <PatchDeploymentModal />
    </div>
  );
};

export default Deployments;
