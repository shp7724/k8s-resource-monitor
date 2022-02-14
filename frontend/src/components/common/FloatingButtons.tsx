import { PlusIcon, RefreshIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC } from "react";
import toast from "react-hot-toast";
import { HeroIcon } from "../../common/types";
import { useAuth } from "../../states/auth";
import { useCreateResourceModal } from "../../states/common";
import { useListConfigMap } from "../../states/configmaps";
import { useListDeployment } from "../../states/deployments";
import { useListIngress } from "../../states/ingresses";
import { useListNamespace } from "../../states/namespaces";
import { useListPod } from "../../states/pods";
import { useListPVC } from "../../states/pvcs";
import { useListPV } from "../../states/pvs";
import { useListService } from "../../states/services";

interface FloatingButtonProps {
  onClick?: () => void;
  Icon: HeroIcon;
  requireAuth?: boolean;
  isAuthenticated?: boolean;
}

const FloatingButton: FC<FloatingButtonProps> = (props): JSX.Element => {
  const disabled = props.requireAuth && !props.isAuthenticated;
  return (
    <button
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center rounded-full shadow-lg transition-all duration-150 ease-out hover:scale-110",
        {
          "bg-indigo-500 hover:bg-indigo-600": !disabled,
          "bg-gray-300 shadow-gray-300/80 hover:bg-gray-400": disabled,
        }
      )}
      onClick={props.onClick}
    >
      <div className="p-2">
        <props.Icon
          className={classNames("h-5 w-5", {
            "text-blue-100": !disabled,
            "text-gray-500": disabled,
          })}
        />
      </div>
    </button>
  );
};

const FloatingButtons: FC = (): JSX.Element => {
  const openCreateModal = useCreateResourceModal((state) => state.openModal);

  const currentNamespace = useListNamespace((state) => state.selected);
  const refreshDeployments = useListDeployment((state) => state.list);
  const refreshPods = useListPod((state) => state.list);
  const refreshConfigMaps = useListConfigMap((state) => state.list);
  const refreshIngress = useListIngress((state) => state.list);
  const refreshService = useListService((state) => state.list);
  const refreshPVC = useListPVC((state) => state.list);
  const refreshPV = useListPV((state) => state.list);

  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const refreshAll = () => {
    const mergedPromises = Promise.all([
      refreshDeployments(currentNamespace, false),
      refreshPods(currentNamespace, false),
      refreshConfigMaps(currentNamespace, false),
      refreshIngress(currentNamespace, false),
      refreshService(currentNamespace, false),
      refreshPVC(currentNamespace, false),
      refreshPV(currentNamespace, false),
    ]);
    toast.promise(mergedPromises, {
      loading: "새로고침 중...",
      success: "새로고침 완료!",
      error: () => {
        return "연결 상태가 불안정합니다. 나중에 다시 시도해주세요.";
      },
    });
  };

  return (
    <div className="fixed right-8 bottom-8">
      <div className="flex flex-col gap-2">
        <FloatingButton onClick={refreshAll} Icon={RefreshIcon} />
        <FloatingButton
          onClick={openCreateModal}
          Icon={PlusIcon}
          requireAuth={true}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
};

export default FloatingButtons;
