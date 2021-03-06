import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { ConfigMapProps } from "../../common/types";
import { useDetailConfigMap } from "../../states/configmaps";
import DropdownMenus, { MenuItemProps } from "../common/DropdownMenus";
import LabelBadge from "../common/LabelBadge";
import Description from "../common/Description";
import Label from "../common/Label";

const ConfigMapCard: FC<ConfigMapProps> = (props): JSX.Element => {
  const openModal = useDetailConfigMap((state) => state.openModal);
  const deleteConfigMap = useDetailConfigMap((state) => state.delete);
  const menus = (props: ConfigMapProps): MenuItemProps[] => {
    return [
      {
        text: "수정",
        onClick: () => {
          openModal(props.namespace, props.name);
        },
        Icon: PencilAltIcon,
      },
      {
        text: "삭제",
        onClick: () => {
          deleteConfigMap(props.namespace, props.name);
        },
        Icon: TrashIcon,
        requireAuth: true,
        mode: "destructive",
      },
    ];
  };

  return (
    <div className="rounded-lg border border-amber-500 bg-amber-50 px-5 pb-5 shadow">
      <div className="mt-3 flex justify-between">
        <div className="truncate">
          <Label text="이름" color="amber" />
          <Description color="amber">{props.name}</Description>
        </div>
        <DropdownMenus menus={menus(props)} iconClassName="text-amber-600" />
      </div>
      <div>
        <Label text="네임스페이스" color="amber" />
        <Description color="amber">{props.namespace}</Description>
      </div>
      {props.labels && (
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
          {Object.entries(props.labels).map(([name, value], index) => {
            return (
              <LabelBadge key={index} name={name} value={value} color="amber" />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConfigMapCard;
