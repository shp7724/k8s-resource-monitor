import { FC } from "react";
import classNames from "classnames";

interface TitleProps {
  text: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ text, className }): JSX.Element => {
  return (
    <div
      className={classNames(
        "mt-12 mb-4 truncate text-2xl font-bold  sm:text-4xl",
        {
          [className ?? ""]: !!className,
        }
      )}
    >
      {text}
    </div>
  );
};

export default Title;
