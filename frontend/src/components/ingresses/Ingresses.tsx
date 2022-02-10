import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useListIngress } from "../../states/ingresses";
import { useListNamespace } from "../../states/namespaces";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import IngressCard from "./IngressCard";
import PatchIngressModal from "./PatchIngressModal";

const Ingresses: FC = (): JSX.Element => {
  const namespace = useListNamespace((state) => state.selected);
  const { data, list, isLoading } = useListIngress((state) => state, shallow);

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
        <IngressCard key={idx} {...ingress} />
      ))}
      <PatchIngressModal />
    </div>
  );
};

export default Ingresses;
