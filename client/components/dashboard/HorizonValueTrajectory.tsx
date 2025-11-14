import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

const seriesColors = {
  efficiency: "hsl(var(--chart-1))",
  productivity: "hsl(var(--chart-2))",
  prediction: "hsl(var(--chart-3))",
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

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-blue-100 bg-white/95 px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-slate-700">{label}</p>
      <div className="mt-2 grid gap-1">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-4 text-slate-600">
            <span className="flex items-center gap-2">
              <span
                className="inline-flex h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color ?? "hsl(var(--primary))" }}
              />
              {item.name}
            </span>
            <span className="font-mono text-slate-800">{Number(item.value).toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
          <div className="h-[380px] w-full">
            <ResponsiveContainer>
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
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--muted-foreground)/0.4)", strokeDasharray: "4 4" }} />
                <Legend wrapperStyle={{ paddingBottom: 24 }} formatter={(value) => legendLabelMap[value as keyof typeof seriesColors]} />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  name="Efficiency & Time Savings"
                  stroke={seriesColors.efficiency}
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  name="Productivity & Throughput"
                  stroke={seriesColors.productivity}
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="prediction"
                  name="Prediction & Optimisation"
                  stroke={seriesColors.prediction}
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 7 }}
                />
                {chartData.map((point) => (
                  <ReferenceDot
                    key={point.horizon}
                    x={point.label}
                    y={Math.max(point.efficiency, point.productivity, point.prediction) + 0.6}
                    r={0}
                    isFront
                    label={{
                      value: point.annotation,
                      position: "top",
                      fill: "hsl(var(--primary))",
                      fontSize: 12,
                    }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

const legendLabelMap: Record<keyof typeof seriesColors, string> = {
  efficiency: "Efficiency & Time Savings",
  productivity: "Productivity & Throughput",
  prediction: "Prediction & Optimisation",
};
