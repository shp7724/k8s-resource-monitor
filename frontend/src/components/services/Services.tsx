import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useListNamespace } from "../../states/namespaces";
import { useListService } from "../../states/services";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import PatchServiceModal from "./PatchIngressModal";
import ServiceCard from "./ServiceCard";

const Ingresses: FC = (): JSX.Element => {
  const namespace = useListNamespace((state) => state.selected);
  const { data, list, isLoading } = useListService((state) => state, shallow);

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
        <ServiceCard key={idx} {...ingress} />
      ))}
      <PatchServiceModal />
    </div>
  );
};

export default Ingresses;
