import { TerminalIcon } from "@heroicons/react/outline";
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
  const usagesByPod = usePodUsage((state) => state.usagesByPod);
  const getChartDataOf = usePodUsage((state) => state.getChartDataOf);
  const [displayMode, setDisplayMode] = useState<UsageDisplayMode>("CPU");

  useEffect(() => {
    setChartData(getChartDataOf(podName));
  }, [usagesByPod]);

  return (
    <div>
      <hr className="border-blue-900/20 my-3 -mx-5" />
      <div className="flex justify-center my-2">
        <div className="text-sm divide-x divide-blue-900/30 border border-blue-900/30 rounded cursor-pointer select-none">
          {(["CPU", "Memory"] as UsageDisplayMode[]).map((string, idx) => (
            <div
              key={idx}
              onClick={() => {
                setDisplayMode(string);
              }}
              className={classNames(
                "inline-block px-2 leading-none font-semibold",
                {
                  "text-blue-900": string === displayMode,
                  "text-blue-900/50": string !== displayMode,
                }
              )}
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
              displayMode={displayMode}
              data={[
                displayMode === "Memory"
                  ? container.memoryChartData
                  : container.cpuChartData,
              ]}
            />
            <div className="flex justify-between">
              <div className="text-sm">
                <span className="text-blue-900 font-semibold">
                  {container.containerName}
                </span>
              </div>
              <TerminalIcon
                className={classNames(
                  "h-5 w-5 text-blue-900 hover:text-blue-600 active:text-blue-700 cursor-pointer",
                  {}
                )}
              />
            </div>
          </div>
        );
      })}
      <hr className="border-blue-900/20 mb-3 mt-6 -mx-5" />
    </div>
  );
};

export default PodUsageChart;