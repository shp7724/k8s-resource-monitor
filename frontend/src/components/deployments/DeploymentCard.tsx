import { FC } from "react";
import { DeploymentProps, themeColors } from "../../common/types";
import LabelBadge from "../common/LabelBadge";
import Moment from "react-moment";
import Label from "./Label";
import Description from "./Description";
import Container from "./Container";
import Pod from "./Pod";

const DeploymentCard: FC<DeploymentProps> = (props): JSX.Element => {
  return (
    <div className="rounded-lg bg-indigo-50 border border-indigo-500 p-5 shadow">
      <div className="text-indigo-900 text-xl font-semibold truncate mb-2">
        {props.name}
      </div>
      <div>
        <Label text="네임스페이스" />
        <Description>{props.namespace}</Description>
      </div>
      <div>
        <Label text="레플리카 수" />
        <Description>
          현재 {props.status.available_replicas}개 / 목표{" "}
          {props.desired_replicas}개
        </Description>
      </div>
      <div>
        <Label text="생성" />
        <Description>
          <Moment
            format="YYYY년 MM월 DD일 HH:MM"
            date={props.creation_timestamp}
          />
        </Description>
      </div>
      <div className="my-2">
        <div className="text-sm text-indigo-900/80 font-semibold mb-1">
          컨테이너 템플릿
        </div>
        <div className="flex flex-col gap-y-1.5">
          {props.containers.map((container, idx) => {
            return <Container key={idx} {...container} />;
          })}
        </div>
      </div>
      <div className="my-2">
        <div className="text-sm text-indigo-900/80 font-semibold mb-1">
          파드
        </div>
        <div className="flex flex-col gap-y-1.5">
          {props.pods.map((pod, idx) => {
            return <Pod key={idx} {...pod} />;
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
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
