import { PlusIcon } from "@heroicons/react/outline";
import { FC } from "react";

interface CreateFloatingButtonProps {
  onClick?: () => void;
}

const CreateFloatingButton: FC<CreateFloatingButtonProps> = ({ onClick }): JSX.Element => {
  return (
    <div className="fixed right-10 bottom-10">
      <div
        className="bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition-colors border border-blue-400"
        onClick={onClick}
      >
        <div className="p-3">
          <PlusIcon className="w-8 h-8 text-blue-100" />
        </div>
      </div>
    </div>
  );
};

export default CreateFloatingButton;
