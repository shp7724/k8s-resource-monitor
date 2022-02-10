import { FC } from "react";
import shallow from "zustand/shallow";
import { useDetailPV } from "../../states/pvs";
import PatchModal from "../common/PatchModal";

const PatchPVModal: FC = (): JSX.Element => {
  const detailState = useDetailPV((state) => state, shallow);
  return <PatchModal {...detailState} />;
};

export default PatchPVModal;
