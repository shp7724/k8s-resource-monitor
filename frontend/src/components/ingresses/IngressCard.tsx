import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { IngressProps } from "../../common/types";
import { useDetailIngress } from "../../states/ingresses";
import DropdownMenus, { MenuItemProps } from "../common/DropdownMenus";
import LabelBadge from "../common/LabelBadge";
import Description from "../common/Description";
import Label from "../common/Label";

const IngressCard: FC<IngressProps> = (props): JSX.Element => {
  const openModal = useDetailIngress((state) => state.openModal);
  const deleteIngress = useDetailIngress((state) => state.delete);
  const menus = (props: IngressProps): MenuItemProps[] => {
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
          deleteIngress(props.namespace, props.name);
        },
        Icon: TrashIcon,
        requireAuth: true,
        mode: "destructive",
      },
    ];
  };

  return (
    <div className="rounded-lg border border-teal-500 bg-teal-50 px-5 pb-5 shadow">
      <div className="mt-3 flex justify-between">
        <div className="truncate">
          <Label text="이름" color="teal" />
          <Description color="teal">{props.name}</Description>
        </div>
        <DropdownMenus menus={menus(props)} iconClassName="text-teal-600" />
      </div>
      <div>
        <Label text="네임스페이스" color="teal" />
        <Description color="teal">{props.namespace}</Description>
      </div>
      {props.labels && (
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
          {Object.entries(props.labels).map(([name, value], index) => {
            return (
              <LabelBadge key={index} name={name} value={value} color="teal" />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IngressCard;
