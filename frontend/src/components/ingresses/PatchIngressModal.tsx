import { FC } from "react";
import shallow from "zustand/shallow";
import { useDetailIngress } from "../../states/ingresses";
import PatchModal from "../common/PatchModal";

const PatchIngressModal: FC = (): JSX.Element => {
  const detailState = useDetailIngress((state) => state, shallow);
  return <PatchModal {...detailState} />;
};

export default PatchIngressModal;
