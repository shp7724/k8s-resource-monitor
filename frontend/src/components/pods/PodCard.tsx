import { FC } from "react";
import { PodProps } from "../../common/types";

const PodCard: FC<PodProps> = (props): JSX.Element => {
  return <div>{props.name}</div>;
};

export default PodCard;
