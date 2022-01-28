import { FC } from "react";
interface LabelBadgeProps {
  name: string;
  value: string;
}

const LabelBadge: FC<LabelBadgeProps> = (props): JSX.Element => {
  return (
    <div className="rounded-full bg-indigo-100 divide-x divide-solid divide-indigo-300 inline-block border-indigo-300 border text-sm text-indigo-900">
      <div className="inline px-2">{props.name}</div>
      <div className="inline px-2">{props.value}</div>
    </div>
  );
};

export default LabelBadge;
