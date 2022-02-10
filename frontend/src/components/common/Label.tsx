import classNames from "classnames";
import { FC } from "react";
import { themeColors } from "../../common/types";

interface LabelProps {
  text: string;
  color?: themeColors;
}

export const textColorMap = (
  color?: themeColors,
  translucent?: boolean
): { [key: string]: boolean } => {
  return {
    "text-indigo-900": color === "indigo",
    "text-blue-900": color === "blue",
    "text-amber-900": color === "amber",
    "text-teal-900": color === "teal",
    "text-indigo-900/70": color === "indigo" && !!translucent,
    "text-blue-900/70": color === "blue" && !!translucent,
    "text-amber-900/70": color === "amber" && !!translucent,
    "text-teal-900/70": color === "teal" && !!translucent,
  };
};

const Label: FC<LabelProps> = ({ text, color }): JSX.Element => {
  return (
    <div className={classNames("text-sm inline mr-2", textColorMap(color, true))}>
      {text}
    </div>
  );
};

export default Label;
