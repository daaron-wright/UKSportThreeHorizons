import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { CostImpactPanel } from "@/components/dashboard/CostImpactPanel";
import { HorizonDiagram, type HorizonDiagramProps } from "@/components/dashboard/HorizonDiagram";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ImpactMetric = {
  label: string;
  value: string;
  indicator?: "up" | "steady" | "down";
};

export interface HorizonImpactPanelProps {
  horizonKey: string;
  description: string;
  metrics: ImpactMetric[];
  diagram: HorizonDiagramProps;
}

function IndicatorIcon({ indicator }: { indicator?: ImpactMetric["indicator"] }) {
  if (!indicator) {
    return null;
  }

  if (indicator === "up") {
    return <TrendingUp className="h-5 w-5 text-emerald-600" aria-hidden />;
  }

  if (indicator === "down") {
    return <TrendingDown className="h-5 w-5 text-emerald-600" aria-hidden />;
  }

  return <Minus className="h-5 w-5 text-slate-400" aria-hidden />;
}

export function HorizonImpactPanel({ horizonKey, description, metrics, diagram }: HorizonImpactPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="border-blue-100 bg-white/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Performance impact</CardTitle>
          <CardDescription className="text-sm text-slate-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">{metric.label}</p>
                <p className="mt-1 text-base font-semibold text-primary">{metric.value}</p>
              </div>
              {metric.indicator ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                  <IndicatorIcon indicator={metric.indicator} />
                </span>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <CostImpactPanel stage={horizonKey as "h1" | "h2" | "h3"} />

      <HorizonDiagram {...diagram} />
    </div>
  );
}
