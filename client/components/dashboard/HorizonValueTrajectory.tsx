import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  efficiency: {
    label: "Efficiency & Time Savings",
    color: "hsl(var(--chart-1))",
  },
  productivity: {
    label: "Productivity & Throughput",
    color: "hsl(var(--chart-2))",
  },
  prediction: {
    label: "Prediction & Optimisation",
    color: "hsl(var(--chart-3))",
  },
} as const;

const chartData = [
  {
    horizon: "H1",
    label: "H1 · Centralize & Integrate",
    efficiency: 3,
    productivity: 2.4,
    prediction: 1.6,
    annotation: "H1 Access & Adoption",
  },
  {
    horizon: "H2",
    label: "H2 · Ingest",
    efficiency: 5.8,
    productivity: 6.2,
    prediction: 5.4,
    annotation: "H2 Capability & Productivity",
  },
  {
    horizon: "H3",
    label: "H3 · Orchestrate",
    efficiency: 8.9,
    productivity: 8.7,
    prediction: 9.4,
    annotation: "H3 System Strength & Prediction",
  },
];

export function HorizonValueTrajectory({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-8", className)}>
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
          Compounding value across horizons
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          ROI trajectory over the three-horizon roadmap
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-slate-600">
          Efficiency, productivity, and predictive insight compound as adoption scales from Horizon 1 foundations to
          Horizon 3 orchestration. Each line shows the relative maturity of a value theme as the Performance Hub grows.
        </p>
      </div>

      <Card className="border-blue-100 bg-white/95 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-lg font-semibold text-primary">
            Value development by horizon
          </CardTitle>
          <p className="text-sm text-slate-600">
            Horizon 1 validates core access, Horizon 2 accelerates capability through connected workflows, and Horizon 3
            unlocks system-wide strength and prediction.
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[380px] w-full">
            <LineChart data={chartData} margin={{ top: 32, right: 16, left: 16, bottom: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground)/0.35)" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground)/0.8)", fontSize: 12 }}
                interval={0}
                angle={-10}
                height={60}
              />
              <YAxis
                domain={[0, 10]}
                tickLine={false}
                axisLine={false}
                ticks={[0, 2, 4, 6, 8, 10]}
                tick={{ fill: "hsl(var(--muted-foreground)/0.8)", fontSize: 12 }}
                label={{ value: "Relative ROI", angle: -90, position: "insideLeft", offset: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip cursor={{ stroke: "hsl(var(--muted-foreground)/0.4)", strokeDasharray: "4 4" }}>
                <ChartTooltipContent indicator="line" />
              </ChartTooltip>
              <ChartLegend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 24 }}
                content={<ChartLegendContent className="justify-end" />}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke={chartConfig.efficiency.color}
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke={chartConfig.productivity.color}
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="prediction"
                stroke={chartConfig.prediction.color}
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 7 }}
              />
              {chartData.map((point) => (
                <ReferenceDot
                  key={point.horizon}
                x={point.horizon}
                isFront
                r={0}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
}
