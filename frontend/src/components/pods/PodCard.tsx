import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { PodProps } from "../../common/types";
import LabelBadge from "../common/LabelBadge";
import Description from "../deployments/Description";
import Label from "../deployments/Label";
import PodUsageChart from "./PodUsageChart";

const PodCard: FC<PodProps> = (props): JSX.Element => {
  return (
    <div className="rounded-lg bg-blue-50 border border-blue-500 p-5 shadow">
      <div>
        <Label text="이름" color="blue" />
        <Description color="blue">{props.name}</Description>
      </div>
      <div>
        <Label text="Pod IP" color="blue" />
        <Description color="blue">{props.pod_ip}</Description>
      </div>
      <div>
        <Label text="상태" color="blue" />
        <Description color="blue">
          {props.status.find((item) => item.type === "Ready")?.status ? (
            <CheckCircleIcon className="w-5 h-5 inline-block pb-1" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 inline-block pb-1 text-red-600" />
          )}
        </Description>
      </div>
      <PodUsageChart podName={props.name} />
      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
        {Object.entries(props.labels).map(([name, value], index) => {
          return (
            <LabelBadge key={index} name={name} value={value} color="blue" />
          );
        })}
      </div>
    </div>
  );
};

export default PodCard;
