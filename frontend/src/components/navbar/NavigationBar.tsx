import { Disclosure } from "@headlessui/react";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-scroll";
import { useAuth, useAuthModal } from "../../states/auth";
import Logo from "../common/Logo";
import { navigationData } from "./navigationData";

const NavigationBar: FC = (): JSX.Element => {
  const openLoginModal = useAuthModal((state) => state.openModal);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const Icon = isAuthenticated ? LockClosedIcon : LockOpenIcon;
  return (
    <>
      <Disclosure
        as="nav"
        className="fixed inset-x-0 z-40 border-b border-gray-900/10 bg-gray-100/30 backdrop-blur"
      >
        {({ open }) => (
          <>
            <div className="container mx-auto px-5">
              <div className="flex h-16 items-center justify-between">
                <div className="shrink-0">
                  <Logo withText />
                </div>
                <div className="ml-5 hidden basis-2/3 overflow-hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    {navigationData.map((item) => (
                      <Link
                        key={item.title}
                        to={item.title}
                        spy={true}
                        offset={-300}
                        smooth={true}
                        duration={(px) => Math.abs(px) * 0.2}
                        activeClass="bg-gray-900/10"
                        className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-500/10"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden shrink-0 md:block">
                  <div className="flex items-center">
                    <button
                      disabled={isAuthenticated}
                      onClick={openLoginModal}
                      className={classNames(
                        "relative flex justify-center rounded-lg border border-transparent bg-indigo-600 py-2 pl-3 pr-4 text-sm font-medium text-white focus:outline-none",
                        {
                          "opacity-70": isAuthenticated,
                          "group hover:bg-indigo-700 ": !isAuthenticated,
                        }
                      )}
                    >
                      <span className="flex items-center">
                        <Icon
                          className="mr-2 h-5 w-5 text-indigo-300 group-hover:text-indigo-400"
                          aria-hidden="true"
                        />
                      </span>
                      로그인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default NavigationBar;
