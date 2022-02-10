import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { PersistentVolumeProps } from "../../common/types";
import { useDetailPV } from "../../states/pvs";
import Description from "../common/Description";
import DropdownMenus, { MenuItemProps } from "../common/DropdownMenus";
import Label from "../common/Label";
import LabelBadge from "../common/LabelBadge";

const PVCard: FC<PersistentVolumeProps> = (props): JSX.Element => {
  const openModal = useDetailPV((state) => state.openModal);
  const deleteIngress = useDetailPV((state) => state.delete);
  const menus = (props: PersistentVolumeProps): MenuItemProps[] => {
    return [
      {
        text: "수정",
        onClick: () => {
          openModal("any", props.name);
        },
        Icon: PencilAltIcon,
      },
      {
        text: "삭제",
        onClick: () => {
          deleteIngress("any", props.name);
        },
        Icon: TrashIcon,
        mode: "destructive",
      },
    ];
  };

  return (
    <div className="rounded-lg bg-emerald-50 border border-emerald-500 px-5 pb-5 shadow">
      <div className="flex justify-between mt-3">
        <div className="truncate">
          <Label text="이름" color="emerald" />
          <Description color="emerald">{props.name}</Description>
        </div>
        <DropdownMenus menus={menus(props)} iconClassName="text-emerald-600" />
      </div>
      <div>
        <Label text="용량" color="emerald" />
        <Description color="emerald">{props.capacity}</Description>
      </div>
      <div>
        <Label text="스토리지 클래스" color="emerald" />
        <Description color="emerald">{props.storage_class_name}</Description>
      </div>
      <div>
        <Label text="Claim UID" color="emerald" />
        <Description color="emerald">{props.claim_ref}</Description>
      </div>
      {props.labels && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
          {Object.entries(props.labels).map(([name, value], index) => {
            return (
              <LabelBadge
                key={index}
                name={name}
                value={value}
                color="emerald"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PVCard;
