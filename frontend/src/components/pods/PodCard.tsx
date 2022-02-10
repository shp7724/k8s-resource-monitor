import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { FC } from "react";
import { PodProps } from "../../common/types";
import { useDetailPod } from "../../states/pods";
import DropdownMenus, { MenuItemProps } from "../common/DropdownMenus";
import LabelBadge from "../common/LabelBadge";
import Description from "../common/Description";
import Label from "../common/Label";
import PodUsageChart from "./PodUsageChart";

const PodCard: FC<PodProps> = (props): JSX.Element => {
  const deletePod = useDetailPod((state) => state.delete);
  const menus = (props: PodProps): MenuItemProps[] => {
    return [
      {
        text: "삭제",
        mode: "destructive",
        Icon: TrashIcon,
        onClick: () => {
          deletePod(props.namespace, props.name);
        },
      },
    ];
  };

  return (
    <div className="rounded-lg bg-blue-50 border border-blue-500 px-5 pb-5 shadow">
      <div className="flex justify-between mt-3">
        <div className="truncate">
          <Label text="이름" color="blue" />
          <Description color="blue">{props.name}</Description>
        </div>
        <DropdownMenus menus={menus(props)} iconClassName="text-blue-600" />
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
      <PodUsageChart podName={props.name} namespace={props.namespace} />
      {props.labels && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
          {Object.entries(props.labels).map(([name, value], index) => {
            return (
              <LabelBadge key={index} name={name} value={value} color="blue" />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PodCard;
