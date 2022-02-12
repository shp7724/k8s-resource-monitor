import {
  PencilAltIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { FC } from "react";
import Moment from "react-moment";
import { DeploymentProps } from "../../common/types";
import { useDetailDeployment } from "../../states/deployments";
import DropdownMenus, { MenuItemProps } from "../common/DropdownMenus";
import LabelBadge from "../common/LabelBadge";
import Container from "./Container";
import Description from "../common/Description";
import Pod from "./Pod";
import Label from "../common/Label";

const DeploymentCard: FC<DeploymentProps> = (props): JSX.Element => {
  const deleteDeployment = useDetailDeployment((state) => state.delete);
  const restartDeployment = useDetailDeployment((state) => state.restart);
  const openModal = useDetailDeployment((state) => state.openModal);
  const menus = (props: DeploymentProps): MenuItemProps[] => {
    return [
      {
        text: "수정",
        onClick: () => {
          openModal(props.namespace, props.name);
        },
        Icon: PencilAltIcon,
      },
      {
        text: "재시작",
        onClick: () => {
          restartDeployment?.(props.namespace, props.name);
        },
        requireAuth: true,
        Icon: RefreshIcon,
      },
      {
        text: "삭제",
        onClick: () => {
          deleteDeployment(props.namespace, props.name);
        },
        requireAuth: true,
        Icon: TrashIcon,
        mode: "destructive",
      },
    ];
  };

  return (
    <div className="rounded-lg border border-indigo-500 bg-indigo-50 px-5 pb-5 shadow">
      <div className="mt-3 flex justify-between">
        <div className="mb-2 truncate text-xl font-semibold text-indigo-900">
          {props.name}
        </div>
        <DropdownMenus menus={menus(props)} iconClassName="text-indigo-600" />
      </div>
      <div>
        <Label text="네임스페이스" color="indigo" />
        <Description color="indigo">{props.namespace}</Description>
      </div>
      <div>
        <Label text="레플리카 수" color="indigo" />
        <Description color="indigo">
          현재 {props.status.available_replicas}개 / 목표{" "}
          {props.desired_replicas}개
        </Description>
      </div>
      <div>
        <Label text="생성" color="indigo" />
        <Description color="indigo">
          <Moment
            format="YYYY년 MM월 DD일 HH:MM"
            date={props.creation_timestamp}
          />
        </Description>
      </div>
      <div className="my-2">
        <div className="mb-1 text-sm font-semibold text-indigo-900/80">
          컨테이너 템플릿
        </div>
        <div className="flex flex-col gap-y-1.5">
          {props.containers.map((container, idx) => {
            return <Container key={idx} {...container} />;
          })}
        </div>
      </div>
      <div className="my-2">
        <div className="mb-1 text-sm font-semibold text-indigo-900/80">
          파드
        </div>
        <div className="flex flex-col gap-y-1.5">
          {props.pods.map((pod, idx) => {
            return <Pod key={idx} {...pod} />;
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
        {Object.entries(props.labels).map(([name, value], index) => {
          return (
            <LabelBadge key={index} name={name} value={value} color="indigo" />
          );
        })}
      </div>
    </div>
  );
};

export default DeploymentCard;
