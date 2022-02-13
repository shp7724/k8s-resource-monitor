import toast from "react-hot-toast";
import { themeColors } from "./types";

export const k8sConnectionErrorToast = (error: any) => {
  toast.error(
    error.response.status === 401
      ? "인증되지 않은 사용자입니다.\n로그인 후 다시 시도해주세요."
      : "K8s 클러스터와의 연결 상태가 불안정합니다.\n나중에 다시 시도해주세요.",
    {
      id: "k8s-error",
      duration: 5000,
    }
  );
};

export const textColorMap = (
  color?: themeColors,
  translucent?: boolean
): { [key: string]: boolean } => {
  return {
    "text-indigo-900": color === "indigo",
    "text-blue-900": color === "blue",
    "text-amber-900": color === "amber",
    "text-teal-900": color === "teal",
    "text-pink-900": color === "pink",
    "text-gray-800": color === "gray",
    "text-emerald-900": color === "emerald",
    "text-indigo-900/70": color === "indigo" && !!translucent,
    "text-blue-900/70": color === "blue" && !!translucent,
    "text-amber-900/70": color === "amber" && !!translucent,
    "text-teal-900/70": color === "teal" && !!translucent,
    "text-pink-900/70": color === "pink" && !!translucent,
    "text-emerald-900/70": color === "emerald" && !!translucent,
    "text-gray-800/70": color === "gray" && !!translucent,
  };
};
