import classNames from "classnames";
import { FC } from "react";
import { themeColors } from "../../common/types";
import { textColorMap } from "../../common/utils";

interface LabelProps {
  text: string;
  color?: themeColors;
}

const Label: FC<LabelProps> = ({ text, color }): JSX.Element => {
  return (
    <div
      className={classNames("text-sm inline mr-2", textColorMap(color, true))}
    >
      {text}
    </div>
  );
};

export default Label;
