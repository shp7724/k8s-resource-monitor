import toast from "react-hot-toast";

export const k8sConnectionErrorToast = () => {
  toast.error(
    "K8s 클러스터와의 연결 상태가 불안정합니다.\n나중에 다시 시도해주세요.",
    {
      id: "k8s-error",
      duration: 5000,
    }
  );
};
