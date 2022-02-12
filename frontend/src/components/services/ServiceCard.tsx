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
        requireAuth: true,
      },
    ];
  };

  return (
    <div className="rounded-lg border border-pink-500 bg-pink-50 px-5 pb-5 shadow">
      <div className="mt-3 flex justify-between">
        <div className="truncate">
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
      <div className="mt-2 flex flex-col gap-y-1.5">
        {props.ports.map((port, idx) => (
          <div
            key={idx}
            className="rounded-md border border-pink-300 bg-pink-100 p-2"
          >
            <div>
              <Label text="포트" color="pink" />
              <Description color="pink">{port.port}</Description>
            </div>
            <div>
              <Label text="타겟 포트" color="pink" />
              <Description color="pink">{port.targetPort}</Description>
            </div>
            {port.nodePort && (
              <div>
                <Label text="노드 포트" color="pink" />
                <Description color="pink">{port.nodePort}</Description>
              </div>
            )}
            <div>
              <Label text="프로토콜" color="pink" />
              <Description color="pink">{port.protocol}</Description>
            </div>
          </div>
        ))}
      </div>
      {props.labels && (
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
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
