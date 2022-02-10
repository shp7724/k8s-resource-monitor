import { FC } from "react";
import { ContainerProps } from "../../common/types";
import Description from "./Description";
import Label from "./Label";

const Container: FC<ContainerProps> = (props): JSX.Element => {
  return (
    <div className="py-2 px-3 bg-indigo-100 rounded-md border-dashed border border-indigo-300">
      <div>
        <Label text="이름" color="indigo" />
        <Description color="indigo">{props.name}</Description>
      </div>
      <div>
        <Label text="이미지" color="indigo" />
        <Description color="indigo">{props.image}</Description>
      </div>
      <div>
        <Label text="Pull Policy" color="indigo" />
        <Description color="indigo">{props.image_pull_policy}</Description>
      </div>
    </div>
  );
};

export default Container;
