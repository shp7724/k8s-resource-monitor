import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useDeployment, useNamespace } from "../../common/states";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import DeploymentCard from "./DeploymentCard";
import PatchDeploymentModal from "./PatchDeploymentModal";

export const gridClassName =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

const Deployments: FC = (): JSX.Element => {
  const namespace = useNamespace((state) => state.selected);
  const { deployments, fetch, isLoading } = useDeployment(
    (state) => state,
    shallow
  );

  useEffect(() => {
    fetch(namespace);
  }, [namespace]);

  if (!isLoading && deployments.length === 0) {
    return <NotFound />;
  }

  return isLoading ? (
    <Spinner wrapperClassName="h-96" />
  ) : (
    <div className={gridClassName}>
      {deployments.map((deployment, idx) => (
        <DeploymentCard key={idx} {...deployment} />
      ))}
      <PatchDeploymentModal />
    </div>
  );
};

export default Deployments;
