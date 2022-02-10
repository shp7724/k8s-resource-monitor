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
    default:
      return "";
  }
};

const LabelBadge: FC<LabelBadgeProps> = (props): JSX.Element => {
  return (
    <div
      className={`flex items-center rounded-full divide-x divide-solid border text-sm ${getLabelColorClass(
        props.color
      )}`}
    >
      <div className="inline-block px-2 max-w-[5rem] truncate">
        {props.name}
      </div>
      <div className="inline-block px-2 max-w-[8rem] truncate">
        {props.value}
      </div>
    </div>
  );
};

export default LabelBadge;
