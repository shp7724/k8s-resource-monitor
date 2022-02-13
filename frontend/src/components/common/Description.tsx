import classNames from "classnames";
import { FC } from "react";
import { themeColors } from "../../common/types";
import { textColorMap } from "../../common/utils";

interface DescriptionProps {
  children?: React.ReactNode;
  color?: themeColors;
  className?: string;
}

const Description: FC<DescriptionProps> = ({
  children,
  className,
  color,
}): JSX.Element => {
  return (
    <div
      className={classNames(
        "inline text-sm font-medium",
        className,
        textColorMap(color)
      )}
    >
      {children}
    </div>
  );
};

export default Description;
