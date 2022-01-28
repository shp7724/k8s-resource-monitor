import { FC } from "react";

interface LabelProps {
  text: string;
}

const Label: FC<LabelProps> = ({ text }): JSX.Element => {
  return <div className="text-sm text-indigo-900/70 inline mr-2">{text}</div>;
};


export default Label