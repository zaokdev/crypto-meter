import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../chart";
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

type Props = {
  percent_change_1h: any;
  percent_change_24h: any;
  percent_change_7d: any;
};
const CryptoLinebarChart = ({
  percent_change_1h,
  percent_change_24h,
  percent_change_7d,
}: Props) => {
  console.log(percent_change_1h, percent_change_24h, percent_change_7d);
  const chartData: any = [
    { time: "1h", percent: percent_change_1h },
    { time: "24h", percent: percent_change_24h },
    { time: "7d", percent: percent_change_7d },
  ];
  const chartConfig: any = {
    percent: {
      label: "Change %",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full h-full p-4">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel hideIndicator />}
        />
        <Bar dataKey="percent">
          <LabelList position="top" dataKey="time" fillOpacity={1} />
          {chartData.map((item: any) => (
            <Cell
              key={item.month}
              fill={item.percent > 0 ? "hsl(var(--chart-1))" : "red"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default CryptoLinebarChart;
