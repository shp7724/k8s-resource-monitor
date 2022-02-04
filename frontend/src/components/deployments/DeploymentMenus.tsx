import { Menu, Transition } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { FC, Fragment } from "react";
import { useDeployment } from "../../common/states";

interface DeploymentMenusProps {
  name: string;
  namespace: string;
}

const DeploymentMenus: FC<DeploymentMenusProps> = ({
  name,
  namespace,
}): JSX.Element => {
  const deleteDeployment = useDeployment((state) => state.delete);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="z-0">
        <DotsHorizontalIcon className="w-5 h-5 text-indigo-900" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <PencilAltIcon className="h-5 w-5 mr-2" />
                  수정
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => deleteDeployment(namespace, name)}
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-red-600"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <TrashIcon className="h-5 w-5 mr-2" />
                  삭제
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DeploymentMenus;
