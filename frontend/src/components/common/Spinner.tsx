import classNames from "classnames";
import { FC } from "react";
interface SpinnerProps {
  wrapperClassName?: string;
  className?: string;
  strokeClassName?: string;
}

const Spinner: FC<SpinnerProps> = ({
  wrapperClassName,
  className,
  strokeClassName,
}): JSX.Element => {
  return (
    <div
      className={classNames(
        "flex justify-center items-center w-full",
        wrapperClassName
      )}
    >
      <svg
        className={classNames("spinner", {
          [className || ""]: !!className,
          "h-10 w-10": !className,
        })}
        viewBox="0 0 50 50"
      >
        <circle
          className={classNames("spinner-path", {
            [strokeClassName || ""]: !!strokeClassName,
            " stroke-indigo-600": !strokeClassName,
          })}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;
