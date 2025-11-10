import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { HorizonSectionValue } from "./HorizonDetail";

const SECTION_SHORTCUTS: { label: string; value: HorizonSectionValue }[] = [
  { label: "Overview", value: "overview" },
  { label: "Personas", value: "personas" },
  { label: "Operating model", value: "operating" },
  { label: "Technical", value: "technical" },
  { label: "Experience", value: "experience" },
];

const STAGE_THEME_CLASS: Record<string, string> = {
  improve: "border-sky-200 bg-sky-50 text-sky-700",
  transform: "border-emerald-200 bg-emerald-50 text-emerald-700",
  innovate: "border-purple-200 bg-purple-50 text-purple-700",
};

export interface HorizonKeyNavigatorItem {
  key: string;
  label: string;
  short: string;
  summary: string;
  stage: {
    theme: string;
    label: string;
    descriptor: string;
  };
  overviewMetrics: { label: string; value: string }[];
  impactMetric?: { label: string; value: string; indicator?: "up" | "steady" | "down" };
}

export interface HorizonKeyNavigatorProps {
  items: HorizonKeyNavigatorItem[];
  activeHorizon: string;
  activeSection: HorizonSectionValue;
  onSelectHorizon: (key: string) => void;
  onSelectSection: (section: HorizonSectionValue) => void;
}

function IndicatorIcon({ indicator }: { indicator?: "up" | "steady" | "down" }) {
  if (!indicator) {
    return null;
  }

  if (indicator === "up") {
    return <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden />;
  }

  if (indicator === "down") {
    return <TrendingDown className="h-4 w-4 text-emerald-600" aria-hidden />;
  }

  return <Minus className="h-4 w-4 text-slate-400" aria-hidden />;
}

export function HorizonKeyNavigator({
  items,
  activeHorizon,
  activeSection,
  onSelectHorizon,
  onSelectSection,
}: HorizonKeyNavigatorProps) {
  return (
    <section className="rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
            Horizon matrix
          </p>
          <h2 className="text-xl font-semibold text-primary">Navigate horizons & focus areas</h2>
          <p className="text-sm text-slate-600">
            Select a horizon to load its roadmap, then jump straight to the view you want to inspect.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SECTION_SHORTCUTS.map((section) => (
            <button
              key={section.value}
              type="button"
              onClick={() => onSelectSection(section.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                activeSection === section.value
                  ? "border-primary bg-primary text-primary-foreground shadow"
                  : "border-blue-100 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50",
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const isActive = item.key === activeHorizon;
          const stageTone = STAGE_THEME_CLASS[item.stage.theme] ?? "border-blue-200 bg-blue-50 text-blue-700";

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectHorizon(item.key)}
              className={cn(
                "flex h-full flex-col justify-between rounded-3xl border px-5 py-6 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                isActive
                  ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/60"
                  : "border-blue-100 bg-white/90 hover:-translate-y-1 hover:border-blue-200 hover:shadow",
              )}
              aria-pressed={isActive}
            >
              <div className="space-y-4">
                <Badge className={cn("w-fit text-[11px] font-semibold uppercase tracking-[0.28em]", stageTone)}>
                  {item.stage.label}
                </Badge>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                    {item.short}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-primary">{item.label}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.stage.descriptor}</p>
                </div>
                <p className="text-sm text-slate-600">{item.summary}</p>
              </div>
              <div className="mt-5 grid gap-3">
                {item.overviewMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-2 text-sm text-blue-900"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                      {metric.label}
                    </span>
                    <span className="text-base font-semibold text-primary">{metric.value}</span>
                  </div>
                ))}
                {item.impactMetric ? (
                  <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                        {item.impactMetric.label}
                      </p>
                      <p className="text-base font-semibold">{item.impactMetric.value}</p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
                      <IndicatorIcon indicator={item.impactMetric.indicator} />
                    </span>
                  </div>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
