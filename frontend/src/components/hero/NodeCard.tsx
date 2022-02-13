import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { FC } from "react";
import Moment from "react-moment";
import { NodeProps } from "../../common/types";
import Description from "../common/Description";
import Label from "../common/Label";
import NodeUsageChart from "./NodeUsageChart";

const NodeCard: FC<NodeProps> = (props): JSX.Element => {
  return (
    <div className="w-[25rem] rounded-2xl border border-gray-300/40 bg-gray-100/10 p-5 text-left shadow-2xl shadow-gray-900/10 backdrop-blur-xl">
      <div className="">
        <Label text="노드 이름" color="gray" />
        <Description color="gray">{props.name}</Description>
      </div>
      <div className="">
        <Label text="OS" color="gray" />
        <Description color="gray">{props.os_image}</Description>
      </div>
      <div>
        <Label text="생성일" color="gray" />
        <Description color="gray">
          <Moment
            format="YYYY년 MM월 DD일 HH:MM"
            date={props.creation_timestamp}
          />
        </Description>
      </div>
      <hr className="my-3 -mx-5 border-gray-900/10" />
      <NodeUsageChart nodeName={props.name} />
      <hr className="my-3 -mx-5 border-gray-900/10" />
      <div className="mt-2 flex flex-col gap-y-1.5">
        {props.conditions.map((condition, idx) => {
          return (
            <div
              key={idx}
              className="rounded-lg border border-gray-900/10 bg-gray-100/30 p-2"
            >
              <div className="flex items-center justify-between">
                <Description color="gray">{condition.type}</Description>
                {props.conditions.find((item) => item.type === "Ready")
                  ?.status ? (
                  <CheckCircleIcon className="inline-block h-5 w-5 pb-1 text-green-600" />
                ) : (
                  <ExclamationCircleIcon className="inline-block h-5 w-5 pb-1 text-red-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NodeCard;
