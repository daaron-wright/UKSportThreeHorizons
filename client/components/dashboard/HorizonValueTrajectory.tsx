import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

const seriesColor = "hsl(var(--primary))";

const chartData = [
  {
    horizon: "H1",
    label: "H1 · Centralize & Integrate",
    roi: 2.4,
    annotation: "H1 Access & Adoption",
  },
  {
    horizon: "H2",
    label: "H2 · Ingest",
    roi: 4.1,
    annotation: "H2 Capability & Productivity",
  },
  {
    horizon: "H3",
    label: "H3 · Orchestrate",
    roi: 8.6,
    annotation: "H3 System Strength & Prediction",
  },
];

const horizonNarrative: Record<string, string> = {
  "H1 · Centralize & Integrate":
    "Horizon 1 creates early value through access, adoption, and validating core functions.",
  "H2 · Ingest":
    "Horizon 2 accelerates value through stronger capability, connection, and productivity.",
  "H3 · Orchestrate":
    "Horizon 3 delivers the greatest return through system strength, cost avoidance, better prediction, and smarter investment.",
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="max-w-xs rounded-lg border border-blue-100 bg-white/95 px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-slate-700">{label}</p>
      <p className="mt-2 text-slate-600">{horizonNarrative[label ?? ""]}</p>
    </div>
  );
};

export function HorizonValueTrajectory({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-8", className)}>
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
          ROI compounding over time
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          The ROI Curve; A Non-Linear Compounding Return
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-slate-600">
          Overall: The value curve steepens over time as the entire system contributes and benefits together.
        </p>
      </div>

      <Card className="border-blue-100 bg-white/95 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-lg font-semibold text-primary">
            ROI trajectory across horizons
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
                <Line
                  type="monotone"
                  dataKey="roi"
                  name="ROI"
                  stroke={seriesColor}
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2, stroke: "white", fill: seriesColor }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: seriesColor }}
                />
                {chartData.map((point) => (
                  <ReferenceDot
                    key={point.horizon}
                    x={point.label}
                    y={point.roi + 0.6}
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
