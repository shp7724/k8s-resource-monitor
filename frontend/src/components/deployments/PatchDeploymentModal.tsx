import React, { FC } from "react";
import shallow from "zustand/shallow";
import { useDetailDeployment } from "../../states/deployments";
import PatchModal from "../common/PatchModal";

const PatchDeploymentModal: FC = (): JSX.Element => {
  const detailState = useDetailDeployment((state) => state, shallow);

  return <PatchModal {...detailState} />;
};

export default PatchDeploymentModal;
