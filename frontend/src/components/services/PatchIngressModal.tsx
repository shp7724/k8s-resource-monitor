import { FC } from "react";
import shallow from "zustand/shallow";
import { useDetailService } from "../../states/services";
import PatchModal from "../common/PatchModal";

const PatchServiceModal: FC = (): JSX.Element => {
  const detailState = useDetailService((state) => state, shallow);
  return <PatchModal {...detailState} />;
};

export default PatchServiceModal;
