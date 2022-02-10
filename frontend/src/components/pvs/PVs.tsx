import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useListNamespace } from "../../states/namespaces";
import { useListPV } from "../../states/pvs";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import PatchPVModal from "./PatchPVModal";
import PVCard from "./PVCard";

const PVs: FC = (): JSX.Element => {
  const namespace = useListNamespace((state) => state.selected);
  const { data, list, isLoading } = useListPV((state) => state, shallow);

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
        <PVCard key={idx} {...ingress} />
      ))}
      <PatchPVModal />
    </div>
  );
};

export default PVs;
