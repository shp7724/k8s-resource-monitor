import classNames from "classnames";
import { FC } from "react";
import { themeColors } from "../../common/types";

interface DescriptionProps {
  children?: React.ReactNode;
  color?: themeColors;
}

const Description: FC<DescriptionProps> = ({
  children,
  color,
}): JSX.Element => {
  return (
    <div
      className={classNames("text-sm font-medium inline", {
        "text-indigo-900": color !== "blue",
        "text-blue-900": color === "blue",
      })}
    >
      {children}
    </div>
  );
};

export default Description;
