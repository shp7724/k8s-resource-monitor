import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { PodProps } from "../../common/types";
import LabelBadge from "../common/LabelBadge";
import MyResponsiveLine, { data } from "../pods/SampleChart";
import Description from "./Description";
import Label from "./Label";

const Pod: FC<PodProps> = (props): JSX.Element => {
  return (
    <div className="py-2 px-3 bg-indigo-100 rounded-md border-indigo-300 border">
      <div className="truncate">
        <Label text="이름" />
        <Description>{props.name}</Description>
      </div>
      <div>
        <Label text="Pod IP" />
        <Description>{props.pod_ip}</Description>
      </div>
      <div>
        <Label text="상태" />
        <Description>
          {props.status.find((item) => item.type === "Ready")?.status ? (
            <CheckCircleIcon className="w-5 h-5 inline-block pb-1" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 inline-block pb-1 text-red-600" />
          )}
        </Description>
      </div>
    </div>
  );
};

export default Pod;
