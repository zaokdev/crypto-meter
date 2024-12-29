import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../chart";
import { Label, Pie, PieChart } from "recharts";

const CryptoDonutChart = ({ csupply, msupply }: any) => {
  const chartConfig = {
    title: {
      label: "Max. Supply",
    },
    c_supply: {
      label: "Non-circulating Supply",
      color: "hsl(var(--chart-3))",
    },
    m_supply: {
      label: "Circulating Supply",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      supply: csupply,
      term: "c_supply",
      fill: "hsl(var(--chart-3))",
    },
    {
      supply: msupply,
      term: "m_supply",
      fill: "hsl(var(--chart-4))",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="supply"
          nameKey="term"
          innerRadius={60}
          strokeWidth={10}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-lg"
                    >
                      {msupply}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Circulating Supply
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default CryptoDonutChart;
