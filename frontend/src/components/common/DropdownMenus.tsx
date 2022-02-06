import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC, Fragment } from "react";
import { HeroIcon } from "../../common/types";

export interface MenuItemProps {
  text: string;
  onClick: () => void;
  Icon: HeroIcon;
  mode?: "normal" | "destructive";
}

interface DropdownMenusProps {
  menus: MenuItemProps[];
  iconClassName?: string;
}

const DropdownMenus: FC<DropdownMenusProps> = ({
  menus,
  iconClassName,
}): JSX.Element => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="z-0">
        <DotsHorizontalIcon
          className={classNames("w-5 h-5", {
            [iconClassName || ""]: !!iconClassName,
          })}
        />
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
            {menus.map((menu, idx) => {
              return (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={menu.onClick}
                      className={`${
                        active
                          ? "bg-indigo-500 text-white"
                          : menu.mode === "destructive"
                          ? "text-red-600"
                          : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <menu.Icon className="h-5 w-5 mr-2" />
                      {menu.text}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenus;
