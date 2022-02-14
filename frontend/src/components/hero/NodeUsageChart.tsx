import classNames from "classnames";
import { FC, Fragment, useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import { NodeChartDataProps } from "../../common/types";
import { useMetrics } from "../../states/metrics";
import { UsageDisplayMode } from "../pods/PodUsageChart";
import UsageLineChart from "../pods/UsageLineChart";

interface NodeUsageChartProps {
  nodeName: string;
}

const NodeUsageChart: FC<NodeUsageChartProps> = (props): JSX.Element => {
  const getNodeChartDataOf = useMetrics((state) => state.getNodeChartDataOf);
  const [chartData, setChartData] = useState<NodeChartDataProps | null>(null);
  const usagesByNode = useMetrics((state) => state.usagesByNode);
  const [displayMode, setDisplayMode] = useState<UsageDisplayMode>("CPU");

  useEffect(() => {
    setChartData(getNodeChartDataOf(props.nodeName));
  }, [usagesByNode]);

  return (
    <Fragment>
      <div className="my-2 flex justify-center">
        <div className="cursor-pointer select-none divide-x divide-gray-900/10 rounded border border-gray-900/10 text-sm">
          {(["CPU", "Memory"] as UsageDisplayMode[]).map((string, idx) => (
            <div
              key={idx}
              onClick={() => {
                setDisplayMode(string);
              }}
              className={classNames(
                "inline-block px-2 font-semibold leading-none",
                {
                  "text-gray-900/70": string === displayMode,
                  "text-gray-900/30 hover:text-gray-900/50":
                    string !== displayMode,
                }
              )}
            >
              {string}
            </div>
          ))}
        </div>
      </div>
      <div className="h-20 w-full">
        {chartData && (
          <UsageLineChart
            colors={[colors.gray[700]]}
            displayMode={displayMode}
            data={[
              displayMode === "Memory"
                ? chartData.memoryChartData
                : chartData.cpuChartData,
            ]}
          />
        )}
      </div>
    </Fragment>
  );
};

export default NodeUsageChart;
