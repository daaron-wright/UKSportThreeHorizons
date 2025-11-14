import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Area,
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
const seriesGlow = "hsl(var(--primary)/0.16)";
const gridColor = "hsl(var(--primary)/0.12)";
const axisColor = "hsl(var(--muted-foreground)/0.75)";
const tooltipBorderColor = "hsl(var(--primary)/0.2)";

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
    <div
      className="max-w-xs rounded-lg border bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur"
      style={{ borderColor: tooltipBorderColor, boxShadow: "0 16px 32px -12px hsl(var(--primary)/0.2)" }}
    >
      <p className="font-semibold text-primary">{label}</p>
      <p className="mt-2 text-muted-foreground">{horizonNarrative[label ?? ""]}</p>
    </div>
  );
};

export function HorizonValueTrajectory({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-8", className)}>
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
          ROI compounding over time
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          The ROI Curve; A Non-Linear Compounding Return
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-muted-foreground">
          The value curve steepens over time as the entire system contributes and benefits together.
        </p>
      </div>

      <Card className="border border-primary/15 bg-white/95 shadow-[0_20px_40px_-24px_hsl(var(--primary)/0.55)]">
        <CardHeader className="border-b border-primary/10 pb-6">
          <CardTitle className="text-lg font-semibold text-primary">
            ROI trajectory across horizons
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Horizon 1</span> validates core access,
            <span className="font-semibold text-primary"> Horizon 2</span> accelerates capability through connected
            workflows, and <span className="font-semibold text-primary">Horizon 3</span> unlocks system-wide strength and
            prediction.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[380px] w-full">
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 72, right: 16, left: 16, bottom: 24 }}>
                <defs>
                  <linearGradient id="roiFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary)/0.25)" />
                    <stop offset="100%" stopColor="hsl(var(--primary)/0.05)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: axisColor, fontSize: 12 }}
                  interval={0}
                  angle={-10}
                  height={60}
                />
                <YAxis
                  domain={[0, 10]}
                  tickLine={false}
                  axisLine={false}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{ fill: axisColor, fontSize: 12 }}
                  label={{ value: "Relative ROI", angle: -90, position: "insideLeft", offset: 12, fill: axisColor }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: seriesGlow, strokeWidth: 2, strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="roi" stroke="none" fill="url(#roiFill)" fillOpacity={1} />
                <Line
                  type="monotone"
                  dataKey="roi"
                  name="ROI"
                  stroke={seriesColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dot={{ r: 6, strokeWidth: 3, stroke: "hsl(var(--primary)/0.35)", fill: "white" }}
                  activeDot={{ r: 9, strokeWidth: 3, stroke: "white", fill: seriesColor }}
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
                      fill: seriesColor,
                      fontWeight: 600,
                      fontSize: 12,
                      dy: -6,
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
