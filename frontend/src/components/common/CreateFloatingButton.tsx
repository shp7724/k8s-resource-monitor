import { PlusIcon } from "@heroicons/react/outline";
import { FC } from "react";

const CreateFloatingButton: FC = (): JSX.Element => {
  return (
    <div className="fixed right-10 bottom-10">
      <div className="bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition-colors">
        <div className="p-3">
          <PlusIcon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default CreateFloatingButton;
