import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "neutral";
type DataStatus = "live" | "expanding" | "future";

export interface DiagramClusterItem {
  title: string;
  detail?: string;
  status?: DataStatus;
}

export interface DiagramCluster {
  title: string;
  tone?: Tone;
  caption?: string;
  items: DiagramClusterItem[];
}

export interface DiagramAxes {
  horizontal: string;
  vertical: string;
  summary?: string;
}

export interface HorizonDiagramProps {
  title: string;
  caption: string;
  clusters: DiagramCluster[];
  footerNote?: string;
  axes?: DiagramAxes;
}

const toneClasses: Record<Tone, string> = {
  primary: "border-blue-200 bg-blue-50 text-blue-900",
  accent: "border-red-200 bg-red-50 text-red-900",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

const statusClasses: Record<DataStatus, string> = {
  live: "border-blue-200 bg-white text-blue-900",
  expanding: "border-red-200 bg-white text-red-900",
  future: "border-slate-200 bg-slate-50 text-slate-600",
};

const statusLabels: Record<DataStatus, string> = {
  live: "Live",
  expanding: "Rolling out",
  future: "Next horizon",
};

export function HorizonDiagram({
  title,
  caption,
  clusters,
  footerNote,
  axes,
}: HorizonDiagramProps) {
  return (
    <Card className="overflow-hidden border-blue-100 shadow-md">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="mt-1 text-sm text-primary-foreground/80">{caption}</p>
      </CardHeader>
      <CardContent className="space-y-6 bg-white py-6">
        {axes ? (
          <div className="flex flex-col items-start justify-between rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-700">
                Axes
              </p>
              <p className="mt-2 text-sm text-blue-900">
                {axes.horizontal} × {axes.vertical}
              </p>
              {axes.summary ? (
                <p className="mt-1 text-xs text-blue-800/80">{axes.summary}</p>
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
              <Badge className="bg-blue-600 text-white">Ease of use →</Badge>
              <Badge className="bg-red-500 text-white">Impact →</Badge>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-3">
          {clusters.map((cluster) => (
            <section key={cluster.title} className="space-y-3">
              <div
                className={cn(
                  "rounded-2xl border px-5 py-5 shadow-sm",
                  toneClasses[cluster.tone ?? "neutral"],
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  {cluster.title}
                </p>
                {cluster.caption ? (
                  <p className="mt-2 text-sm font-medium opacity-80">
                    {cluster.caption}
                  </p>
                ) : null}
                <div className="mt-4 space-y-2">
                  {cluster.items.map((item) => (
                    <div key={item.title} className="space-y-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          "w-full justify-between gap-3 border-2 px-3 py-2 text-left text-sm font-semibold",
                          statusClasses[item.status ?? "live"],
                        )}
                      >
                        <span className="flex-1 text-left">{item.title}</span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
                          {statusLabels[item.status ?? "live"]}
                        </span>
                      </Badge>
                      {item.detail ? (
                        <p className="pl-1 text-xs text-slate-600">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
        {footerNote ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-sm font-medium text-blue-900">
            {footerNote}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
