import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useListConfigMap } from "../../states/configmaps";
import { useListNamespace } from "../../states/namespaces";
import NotFound from "../common/NotFound";
import Spinner from "../common/Spinner";
import { gridClassName } from "../deployments/Deployments";
import ConfigMapCard from "./ConfigMapCard";
import PatchConfigMapModal from "./PatchConfigMapModal";

const ConfigMaps: FC = (): JSX.Element => {
  const namespace = useListNamespace((state) => state.selected);
  const { data, list, isLoading } = useListConfigMap((state) => state, shallow);

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
      {data.map((configmap, idx) => (
        <ConfigMapCard key={idx} {...configmap} />
      ))}
      <PatchConfigMapModal />
    </div>
  );
};

export default ConfigMaps;
