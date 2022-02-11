import { TerminalIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { ContainerChartDataProps } from "../../common/types";
import { usePodUsage, useTerminal } from "../../states/pods";
import UsageLineChart from "./UsageLineChart";

type UsageDisplayMode = "CPU" | "Memory";

interface PodUsageChartProps {
  podName: string;
  namespace: string;
}

const PodUsageChart: FC<PodUsageChartProps> = (props): JSX.Element => {
  const [chartData, setChartData] = useState<ContainerChartDataProps[]>([]);
  const usagesByPod = usePodUsage((state) => state.usagesByPod);
  const getChartDataOf = usePodUsage((state) => state.getChartDataOf);
  const [displayMode, setDisplayMode] = useState<UsageDisplayMode>("CPU");
  const openTerminal = useTerminal((state) => state.openTerminal);

  useEffect(() => {
    setChartData(getChartDataOf(props.podName));
  }, [usagesByPod]);

  return (
    <div>
      <hr className="my-3 -mx-5 border-blue-900/20" />
      <div className="my-2 flex justify-center">
        <div className="cursor-pointer select-none divide-x divide-blue-900/30 rounded border border-blue-900/30 text-sm">
          {(["CPU", "Memory"] as UsageDisplayMode[]).map((string, idx) => (
            <div
              key={idx}
              onClick={() => {
                setDisplayMode(string);
              }}
              className={classNames(
                "inline-block px-2 font-semibold leading-none",
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
          <div key={container.containerName} className="h-20 w-full">
            <UsageLineChart
              displayMode={displayMode}
              data={[
                displayMode === "Memory"
                  ? container.memoryChartData
                  : container.cpuChartData,
              ]}
            />
            <div className="flex justify-between px-1">
              <div className="text-sm">
                <span className="font-semibold text-blue-900">
                  {container.containerName}
                </span>
              </div>
              <TerminalIcon
                onClick={openTerminal({
                  podName: props.podName,
                  containerName: container.containerName,
                  namespace: props.namespace,
                })}
                className={classNames(
                  "h-5 w-5 cursor-pointer text-blue-900 hover:text-blue-600 active:text-blue-700",
                  {}
                )}
              />
            </div>
          </div>
        );
      })}
      <hr className="-mx-5 mb-3 mt-6 border-blue-900/20" />
    </div>
  );
};

export default PodUsageChart;
