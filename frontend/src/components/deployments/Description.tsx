import classNames from "classnames";
import { FC } from "react";
import { themeColors } from "../../common/types";
import { textColorMap } from "./Label";

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
      className={classNames("text-sm font-medium inline", textColorMap(color))}
    >
      {children}
    </div>
  );
};

export default Description;
