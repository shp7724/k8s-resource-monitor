import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { PodProps } from "../../common/types";
import Description from "../common/Description";
import Label from "../common/Label";
import { Link } from "react-scroll";

const Pod: FC<PodProps> = (props): JSX.Element => {
  

  return (
    <Link to={props.name} offset={-100} smooth>
      <div className="cursor-pointer rounded-md border border-indigo-300 bg-indigo-100 py-2 px-3 transition-all duration-300 ease-out hover:scale-105">
        <div className="truncate">
          <Label text="이름" color="indigo" />
          <Description color="indigo">{props.name}</Description>
        </div>
        <div>
          <Label text="Pod IP" color="indigo" />
          <Description color="indigo">{props.pod_ip}</Description>
        </div>
        <div>
          <Label text="상태" color="indigo" />
          <Description color="indigo">
            {props.conditions.find((item) => item.type === "Ready")?.status ? (
              <CheckCircleIcon className="inline-block h-5 w-5 pb-1" />
            ) : (
              <ExclamationCircleIcon className="inline-block h-5 w-5 pb-1 text-red-600" />
            )}
          </Description>
        </div>
      </div>
    </Link>
  );
};

export default Pod;
