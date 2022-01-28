import { FC } from "react";
import { ContainerProps } from "../../common/types";

const Container: FC<ContainerProps> = (props): JSX.Element => {
  return (
    <div className="p-4 bg-indigo-100 rounded-md border-dashed border border-indigo-300">
      <div>
        <div className="inline mr-2 text-indigo-900/70 text-sm">이미지</div>
        <div className="inline text-indigo-900 text-sm font-medium">
          {props.image}
        </div>
      </div>
      <div>
        <div className="inline mr-2 text-indigo-900/70 text-sm">
          Pull Policy
        </div>
        <div className="inline text-indigo-900 text-sm font-medium">
          {props.image_pull_policy}
        </div>
      </div>
    </div>
  );
};

export default Container;
