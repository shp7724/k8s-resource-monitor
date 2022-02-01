/* eslint-disable react/prop-types */
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const data = [
  {
    id: "germany",
    color: "hsl(206, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 55,
      },
      {
        x: "helicopter",
        y: 55,
      },
      {
        x: "boat",
        y: 46,
      },
      {
        x: "train",
        y: 118,
      },
      {
        x: "subway",
        y: 25,
      },
      {
        x: "bus",
        y: 91,
      },
      {
        x: "car",
        y: 173,
      },
      {
        x: "moto",
        y: 127,
      },
      {
        x: "bicycle",
        y: 79,
      },
      {
        x: "horse",
        y: 110,
      },
      {
        x: "skateboard",
        y: 114,
      },
      {
        x: "others",
        y: 154,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(110, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 181,
      },
      {
        x: "helicopter",
        y: 282,
      },
      {
        x: "boat",
        y: 100,
      },
      {
        x: "train",
        y: 150,
      },
      {
        x: "subway",
        y: 169,
      },
      {
        x: "bus",
        y: 246,
      },
      {
        x: "car",
        y: 167,
      },
      {
        x: "moto",
        y: 187,
      },
      {
        x: "bicycle",
        y: 31,
      },
      {
        x: "horse",
        y: 292,
      },
      {
        x: "skateboard",
        y: 82,
      },
      {
        x: "others",
        y: 224,
      },
    ],
  },
];
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.5f"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    pointSize={2}
    pointColor={{ theme: "background" }}
    pointBorderWidth={4}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
  />
);
export default MyResponsiveLine;
