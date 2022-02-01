import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { usePodUsage } from "../../common/states";
import { ContainerChartDataProps } from "../../common/types";
import UsageLineChart from "./UsageLineChart";

interface PodUsageChart {
  podName: string;
}

type UsageDisplayMode = "CPU" | "Memory";

const PodUsageChart: FC<PodUsageChart> = ({ podName }): JSX.Element => {
  const [chartData, setChartData] = useState<ContainerChartDataProps[]>([]);
  const getChartDataOf = usePodUsage((state) => state.getChartDataOf);
  const [displayMode, setDisplayMode] = useState<UsageDisplayMode>("CPU");

  useEffect(() => {
    const timerId = setInterval(() => {
      setChartData(getChartDataOf(podName));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <hr className="border-blue-900/20 my-3 -mx-5" />
      <div className="flex justify-center my-2">
        <div className="text-sm divide-x divide-blue-900/30 border border-blue-900/30 rounded cursor-pointer">
          {(["CPU", "Memory"] as UsageDisplayMode[]).map((string, idx) => (
            <div
              key={idx}
              onClick={() => {
                setDisplayMode(string);
              }}
              className={classNames("inline-block px-2 leading-none", {
                "text-blue-900": string === displayMode,
                "text-blue-900/70": string !== displayMode,
              })}
            >
              {string}
            </div>
          ))}
        </div>
      </div>
      {chartData.map((container) => {
        return (
          <div key={container.containerName} className="w-full h-20">
            <UsageLineChart
              data={[
                displayMode === "Memory"
                  ? container.memoryChartData
                  : container.cpuChartData,
              ]}
            />
          </div>
        );
      })}
      <hr className="border-blue-900/20 my-3 -mx-5" />
    </div>
  );
};

export default PodUsageChart;
