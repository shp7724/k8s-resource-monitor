import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import { usePodUsage } from "../../common/states";
import { ContainerChartDataProps, PodProps } from "../../common/types";
import LabelBadge from "../common/LabelBadge";
import Description from "../deployments/Description";
import Label from "../deployments/Label";
import MyResponsiveLine, { data } from "./SampleChart";

const PodCard: FC<PodProps> = (props): JSX.Element => {
  const [chartData, setChartData] = useState<ContainerChartDataProps[]>([]);
  const getChartDataOf = usePodUsage((state) => state.getChartDataOf);

  useEffect(() => {
    const timerId = setInterval(() => {
      setChartData(getChartDataOf(props.name));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <div className="rounded-lg bg-blue-50 border border-blue-500 p-5 shadow">
      <div>
        <Label text="이름" color="blue" />
        <Description color="blue">{props.name}</Description>
      </div>
      <div>
        <Label text="Pod IP" color="blue" />
        <Description color="blue">{props.pod_ip}</Description>
      </div>
      <div>
        <Label text="상태" color="blue" />
        <Description color="blue">
          {props.status.find((item) => item.type === "Ready")?.status ? (
            <CheckCircleIcon className="w-5 h-5 inline-block pb-1" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 inline-block pb-1 text-red-600" />
          )}
        </Description>
      </div>
      {chartData.map((container) => {
        return (
          <div key={container.containerName} className="w-full h-28">
            <MyResponsiveLine data={container.chartData} />
          </div>
        );
      })}
      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
        {Object.entries(props.labels).map(([name, value], index) => {
          return (
            <LabelBadge key={index} name={name} value={value} color="blue" />
          );
        })}
      </div>
    </div>
  );
};

export default PodCard;
