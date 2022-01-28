import { FC } from "react";

interface DescriptionProps {
  children?: React.ReactNode;
}

const Description: FC<DescriptionProps> = ({ children }): JSX.Element => {
  return (
    <div className="text-sm font-medium text-indigo-900 inline">{children}</div>
  );
};

export default Description;
