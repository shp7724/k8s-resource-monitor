import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { ServiceProps } from "../../common/types";
import { useDetailService } from "../../states/services";
import Description from "../common/Description";
import DropdownMenus, { MenuItemProps } from "../common/DropdownMenus";
import Label from "../common/Label";
import LabelBadge from "../common/LabelBadge";

const ServiceCard: FC<ServiceProps> = (props): JSX.Element => {
  const openModal = useDetailService((state) => state.openModal);
  const deleteService = useDetailService((state) => state.delete);
  const menus = (props: ServiceProps): MenuItemProps[] => {
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
          deleteService(props.namespace, props.name);
        },
        Icon: TrashIcon,
        mode: "destructive",
      },
    ];
  };

  return (
    <div className="rounded-lg bg-pink-50 border border-pink-500 px-5 pb-5 shadow">
      <div className="flex justify-between mt-3">
        <div>
          <Label text="이름" color="pink" />
          <Description color="pink">{props.name}</Description>
        </div>
        <DropdownMenus menus={menus(props)} iconClassName="text-pink-600" />
      </div>
      <div>
        <Label text="네임스페이스" color="pink" />
        <Description color="pink">{props.namespace}</Description>
      </div>
      <div>
        <Label text="타입" color="pink" />
        <Description color="pink">{props.type}</Description>
      </div>
      {props.labels && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
          {Object.entries(props.labels).map(([name, value], index) => {
            return (
              <LabelBadge key={index} name={name} value={value} color="pink" />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;