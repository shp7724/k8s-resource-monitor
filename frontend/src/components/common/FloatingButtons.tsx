import { PlusIcon, RefreshIcon } from "@heroicons/react/outline";
import { FC } from "react";
import toast from "react-hot-toast";
import { HeroIcon } from "../../common/types";
import { useCreateResourceModal } from "../../states/common";
import { useListConfigMap } from "../../states/configmaps";
import { useListDeployment } from "../../states/deployments";
import { useListIngress } from "../../states/ingresses";
import { useListNamespace } from "../../states/namespaces";
import { useListPod } from "../../states/pods";
import { useListService } from "../../states/services";

interface FloatingButtonProps {
  onClick?: () => void;
  Icon: HeroIcon;
}

const FloatingButton: FC<FloatingButtonProps> = (props): JSX.Element => {
  return (
    <div
      className="bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/70 cursor-pointer hover:bg-blue-600 transition-colors"
      onClick={props.onClick}
    >
      <div className="p-2">
        <props.Icon className="w-5 h-5 text-blue-100" />
      </div>
    </div>
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

  const refreshAll = () => {
    const mergedPromises = Promise.all([
      refreshDeployments(currentNamespace, false),
      refreshPods(currentNamespace, false),
      refreshConfigMaps(currentNamespace, false),
      refreshIngress(currentNamespace, false),
      refreshService(currentNamespace, false),
    ]);
    toast.promise(mergedPromises, {
      loading: "새로고침 중...",
      success: "새로고침 완료",
      error: () => {
        return "연결 상태가 불안정합니다. 나중에 다시 시도해주세요.";
      },
    });
  };

  return (
    <div className="fixed right-8 bottom-8">
      <div className="flex flex-col gap-2">
        <FloatingButton onClick={refreshAll} Icon={RefreshIcon} />
        <FloatingButton onClick={openCreateModal} Icon={PlusIcon} />
      </div>
    </div>
  );
};

export default FloatingButtons;
