import { FC } from "react";
import classNames from "classnames";

interface TitleProps {
  text: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ text, className }): JSX.Element => {
  return (
    <div
      className={classNames("text-4xl my-4 font-bold", {
        [className ?? ""]: !!className,
      })}
    >
      {text}
    </div>
  );
};

export default Title;
