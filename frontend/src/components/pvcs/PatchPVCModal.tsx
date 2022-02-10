import { FC } from "react";
import shallow from "zustand/shallow";
import { useDetailPVC } from "../../states/pvcs";
import PatchModal from "../common/PatchModal";

const PatchPVCModal: FC = (): JSX.Element => {
  const detailState = useDetailPVC((state) => state, shallow);
  return <PatchModal {...detailState} />;
};

export default PatchPVCModal;
