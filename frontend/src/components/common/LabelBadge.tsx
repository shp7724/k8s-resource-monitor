import { FC } from "react";
import { themeColors } from "../../common/types";
interface LabelBadgeProps {
  name: string;
  value: string;
  color?: themeColors;
}

const getLabelColorClass = (color?: themeColors): string => {
  switch (color) {
    case "indigo":
      return "bg-indigo-100 divide-indigo-300 border-indigo-300 text-indigo-900";
    case "blue":
      return "bg-blue-100 divide-blue-300 border-blue-300 text-blue-900";
    case "amber":
      return "bg-amber-100 divide-amber-300 border-amber-300 text-amber-900";
    case "teal":
      return "bg-teal-100 divide-teal-300 border-teal-300 text-teal-900";
    case "pink":
      return "bg-pink-100 divide-pink-300 border-pink-300 text-pink-900";
    case "emerald":
      return "bg-emerald-100 divide-emerald-300 border-emerald-300 text-emerald-900";
    default:
      return "";
  }
};

const LabelBadge: FC<LabelBadgeProps> = (props): JSX.Element => {
  return (
    <div
      className={`group flex cursor-pointer items-center divide-x divide-solid rounded-full border text-sm transition-all hover:scale-105 ${getLabelColorClass(
        props.color
      )}`}
    >
      <div className="inline-block max-w-[5rem] truncate px-2 ">
        {props.name}
      </div>
      <div className="inline-block max-w-[8rem] truncate px-2">
        {props.value}
      </div>
    </div>
  );
};

export default LabelBadge;
