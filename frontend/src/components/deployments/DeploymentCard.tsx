import { FC } from "react";
import { DeploymentProps } from "../../common/types";

const DeploymentCard: FC<DeploymentProps> = (props): JSX.Element => {
  return <div>{props.name}</div>;
};

export default DeploymentCard;
