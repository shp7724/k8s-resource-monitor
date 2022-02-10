import { FC } from "react";
import { themeColors } from "../../common/types";
interface LabelBadgeProps {
  name: string;
  value: string;
  color?: themeColors;
}

const LabelBadge: FC<LabelBadgeProps> = (props): JSX.Element => {
  let colorClass = "";
  switch (props.color) {
    case "indigo":
      colorClass =
        "bg-indigo-100 divide-indigo-300 border-indigo-300 text-indigo-900";
      break;
    case "blue":
      colorClass = "bg-blue-100 divide-blue-300 border-blue-300 text-blue-900";
      break;
    case "amber":
      colorClass =
        "bg-amber-100 divide-amber-300 border-amber-300 text-amber-900";
      break;
    default:
      break;
  }
  return (
    <div
      className={`flex items-center rounded-full divide-x divide-solid border text-sm ${colorClass}`}
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
