import { Disclosure } from "@headlessui/react";
import { LockClosedIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { Link } from "react-scroll";
import { useAuthModal } from "../../states/auth";
import { navigationData } from "./navigationData";

const NavigationBar: FC = (): JSX.Element => {
  const openLoginModal = useAuthModal((state) => state.openModal);

  return (
    <>
      <Disclosure
        as="nav"
        className="backdrop-blur bg-gray-100/30 fixed inset-x-0 z-40 border-b border-gray-900/10"
      >
        {({ open }) => (
          <>
            <div className="container mx-auto px-5">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  {/* <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div> */}
                  <div className="hidden md:block">
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
                          className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-500/10"
                        >
                          {item.title}
                        </Link>
                        // <a
                        //   key={item.title}
                        //   className={classNames(
                        //     "px-3 py-2 rounded-md text-sm font-medium",
                        //     {
                        //       "bg-gray-500/10 text-gray-700": true,
                        //       "text-gray-300 hover:bg-gray-700 hover:text-white":
                        //         false,
                        //     }
                        //   )}
                        //   // aria-current={false ? "page" : undefined}
                        // >
                        //   {item.title}
                        // </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center">
                    <button
                      onClick={openLoginModal}
                      className="group relative flex justify-center py-2 pl-3 pr-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      <span className="flex items-center">
                        <LockClosedIcon
                          className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-2"
                          aria-hidden="true"
                        />
                      </span>
                      로그인
                    </button>

                    {/* Profile dropdown */}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800/10 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-700/10 focus:outline-none focus:ring-2 focus:ring-gray-800/10">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    </>
  );
};

export default NavigationBar;
