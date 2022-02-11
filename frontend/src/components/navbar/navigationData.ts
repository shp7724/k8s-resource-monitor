import { FC, ReactNode } from "react";
import ConfigMaps from "../configmaps/ConfigMaps";
import Deployments from "../deployments/Deployments";
import Ingresses from "../ingresses/Ingresses";
import Pods from "../pods/Pods";
import PVCs from "../pvcs/PVCs";
import PVs from "../pvs/PVs";
import Services from "../services/Services";

interface NavigationItemProps {
  title: string;
  titleClass: string;
  item: FC;
}

export const navigationData: NavigationItemProps[] = [
  { title: "Deployments", titleClass: "text-indigo-900", item: Deployments },
  { title: "Pods", titleClass: "text-blue-900", item: Pods },
  { title: "Services", titleClass: "text-pink-900", item: Services },
  { title: "Ingresses", titleClass: "text-teal-900", item: Ingresses },
  { title: "ConfigMaps", titleClass: "text-amber-900", item: ConfigMaps },
  {
    title: "PersistentVolumeClaim",
    titleClass: "text-emerald-900",
    item: PVCs,
  },
  { title: "PersistentVolume", titleClass: "text-emerald-900", item: PVs },
];
