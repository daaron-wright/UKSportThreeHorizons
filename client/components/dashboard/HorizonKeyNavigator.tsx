import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  impactMetric?: { label: string; value: string };
}

export interface HorizonKeyNavigatorProps {
  items: HorizonKeyNavigatorItem[];
  activeHorizon: string;
  onSelectHorizon: (key: string) => void;
}

export function HorizonKeyNavigator({ items, activeHorizon, onSelectHorizon }: HorizonKeyNavigatorProps) {
  return (
    <section className="rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">{item.short}</p>
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
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{metric.label}</span>
                    <span className="text-base font-semibold text-primary">{metric.value}</span>
                  </div>
                ))}
                {item.impactMetric ? (
                  <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{item.impactMetric.label}</p>
                      <p className="text-base font-semibold">{item.impactMetric.value}</p>
                    </div>
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
