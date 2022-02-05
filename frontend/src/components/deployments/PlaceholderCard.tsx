import { PlusIcon } from "@heroicons/react/outline";
import { FC } from "react";

interface PlaceholderCardProps {
  title?: string;
  onClick?: () => void;
}

const PlaceholderCard: FC<PlaceholderCardProps> = ({
  title,
  onClick,
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="text-gray-500">
        <PlusIcon className="w-14 h-14" />
        <div className="text-center text-lg">{title}</div>
      </div>
    </div>
  );
};

export default PlaceholderCard;
