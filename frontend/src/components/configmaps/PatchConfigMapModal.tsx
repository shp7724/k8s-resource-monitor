import { FC } from "react";
import shallow from "zustand/shallow";
import { useDetailConfigMap } from "../../states/configmaps";
import PatchModal from "../common/PatchModal";

const PatchConfigMapModal: FC = (): JSX.Element => {
  const detailState = useDetailConfigMap((state) => state, shallow);
  return <PatchModal {...detailState} />;
};

export default PatchConfigMapModal;
