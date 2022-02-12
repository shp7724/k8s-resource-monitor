import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC, Fragment } from "react";
import { HeroIcon } from "../../common/types";
import { useAuth } from "../../states/auth";

export interface MenuItemProps {
  text: string;
  onClick: () => void;
  Icon: HeroIcon;
  mode?: "normal" | "destructive";
  requireAuth?: boolean;
}

interface DropdownMenusProps {
  menus: MenuItemProps[];
  iconClassName?: string;
}

const DropdownMenus: FC<DropdownMenusProps> = ({
  menus,
  iconClassName,
}): JSX.Element => {
  const isLoggedIn = useAuth((state) => state.isAuthenticated);
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="z-0">
        <DotsHorizontalIcon
          className={classNames("h-5 w-5", {
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {menus.map((menu, idx) => {
              return (
                <Menu.Item key={idx} disabled={menu.requireAuth && !isLoggedIn}>
                  {({ active, disabled }) => (
                    <button
                      onClick={menu.onClick}
                      className={classNames(
                        "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                        {
                          "bg-indigo-500 text-white": active,
                          "text-red-600":
                            !active && !disabled && menu.mode === "destructive",
                          "text-gray-900":
                            !active && !disabled && menu.mode !== "destructive",
                          "cursor-default text-gray-400": disabled,
                        }
                      )}
                    >
                      <menu.Icon className="mr-2 h-5 w-5" />
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
