import { LockClosedIcon } from "@heroicons/react/outline";
import { FC } from "react";
import shallow from "zustand/shallow";
import { LoginDataProps, useAuth, useAuthModal } from "../../states/auth";
import BaseModal from "../common/BaseModal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginModal: FC = (): JSX.Element => {
  const requestToken = useAuth((state) => state.requestToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDataProps>();

  const { isOpen, closeModal } = useAuthModal(
    (state) => ({
      isOpen: state.isOpen,
      closeModal: state.closeModal,
    }),
    shallow
  );

  const onSubmit = (data: LoginDataProps) => {
    const promise = requestToken(data);
    toast.promise(promise, {
      loading: "로그인 중...",
      success: "로그인 완료!",
      error: (err) => err.response.data.detail,
    });
    closeModal();
    reset();
  };

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                관리자 계정으로 로그인
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                쿠버네티스 리소스를 수정/삭제하려면 관리자 권한이 필요합니다.
              </p>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label className="sr-only">Username</label>
                <input
                  {...register("username", { required: true })}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border
                  border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
                  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="아이디"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  autoComplete="password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border 
                border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
                focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="비밀번호"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border
              border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
