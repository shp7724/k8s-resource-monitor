import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { FC, Fragment, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { useTerminal } from "../../states/pods";
import Terminal from "./Terminal";

interface DotButtonProps {
  className?: string;
  onClick?: () => void;
}

const DotButton: FC<DotButtonProps> = ({ className, onClick }): JSX.Element => {
  return (
    <div
      className={classNames("h-3 w-3 rounded-full", className)}
      onClick={onClick}
    ></div>
  );
};

const TerminalDialog: FC = (): JSX.Element => {
  const { isOpen, closeTerminal } = useTerminal((state) => state, shallow);

  const [isReallyOpen, setIsReallyOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsReallyOpen(isOpen);
      },
      isOpen ? 1 : 500
    ); // workaround
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeTerminal}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600/30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-3xl my-8 align-middle transition-all transform shadow-xl rounded-2xl bg-gray-900 overflow-hidden">
              <div className="flex justify-start gap-2 ml-5 mt-5">
                <DotButton
                  className="bg-red-500 hover:bg-red-400"
                  onClick={closeTerminal}
                />
                <DotButton
                  className="bg-amber-500 hover:bg-amber-400"
                  onClick={closeTerminal}
                />
                <DotButton className="bg-green-500 hover:bg-green-400" />
              </div>
              <div className="p-0">{isReallyOpen && <Terminal />}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TerminalDialog;
