import classNames from "classnames";
import { FC } from "react";
import { themeColors } from "../../common/types";

interface LabelProps {
  text: string;
  color?: themeColors;
}

const Label: FC<LabelProps> = ({ text, color }): JSX.Element => {
  return (
    <div
      className={classNames("text-sm inline mr-2", {
        "text-indigo-900/70": color === "indigo",
        "text-blue-900/70": color === "blue",
        "text-amber-900/70": color === "amber",
      })}
    >
      {text}
    </div>
  );
};

export default Label;
