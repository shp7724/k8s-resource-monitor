import { ResponsiveLine } from "@nivo/line";
import colors from "tailwindcss/colors";

// eslint-disable-next-line react/prop-types
const UsageLineChart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    xScale={{ format: "%Y-%m-%dT%H:%M:%SZ", type: "time" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    // yFormat=" >-.5f"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    curve="linear"
    colors={[colors.blue[900]]}
    pointSize={2}
    pointColor={{ from: "color", modifiers: [] }}
    pointBorderWidth={4}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
  />
);
export default UsageLineChart;
