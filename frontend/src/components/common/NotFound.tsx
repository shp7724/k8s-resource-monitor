import { InboxIcon } from "@heroicons/react/outline";
import { FC } from "react";

const NotFound: FC = (): JSX.Element => {
  return (
    <div className="text-center h-48 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
      <div className="flex justify-center">
        <InboxIcon className="h-20 w-20 text-gray-300" />
      </div>
      <div className="text-gray-400 mt-3 font-semibold ">아무것도 없네요.</div>
    </div>
  );
};

export default NotFound;
