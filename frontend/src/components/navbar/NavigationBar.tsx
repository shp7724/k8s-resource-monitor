import { Disclosure } from "@headlessui/react";
import { LockClosedIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { Link } from "react-scroll";
import { useAuthModal } from "../../states/auth";
import { navigationData } from "./navigationData";
import Logo from "../common/Logo";

const NavigationBar: FC = (): JSX.Element => {
  const openLoginModal = useAuthModal((state) => state.openModal);

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
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Logo withText />
                  </div>
                  <div className="ml-5 hidden md:block">
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
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center">
                    <button
                      onClick={openLoginModal}
                      className="group relative flex justify-center rounded-lg border border-transparent bg-indigo-600 py-2 pl-3 pr-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                    >
                      <span className="flex items-center">
                        <LockClosedIcon
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
