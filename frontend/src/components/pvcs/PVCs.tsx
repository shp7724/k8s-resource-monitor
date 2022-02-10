import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useListNamespace } from "../../states/namespaces";
import { useListPVC } from "../../states/pvcs";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import PatchPVCModal from "./PatchPVCModal";
import PVCCard from "./PVCCard";

const PVCs: FC = (): JSX.Element => {
  const namespace = useListNamespace((state) => state.selected);
  const { data, list, isLoading } = useListPVC((state) => state, shallow);

  useEffect(() => {
    list(namespace);
  }, [namespace]);

  if (!isLoading && data.length === 0) {
    return <NotFound />;
  }

  return isLoading ? (
    <Spinner wrapperClassName="h-96" />
  ) : (
    <div className={gridClassName}>
      {data.map((ingress, idx) => (
        <PVCCard key={idx} {...ingress} />
      ))}
      <PatchPVCModal />
    </div>
  );
};

export default PVCs;
