import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "neutral";
type DataStatus = "live" | "expanding" | "future";

export interface DiagramClusterItem {
  title: string;
  detail?: string;
  status?: DataStatus;
  tags?: readonly string[];
  metadata?: readonly {
    label: string;
    value: string;
  }[];
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

const toneHeadingClasses: Record<Tone, string> = {
  primary: "text-blue-800",
  accent: "text-red-700",
  neutral: "text-slate-700",
};

const tonePanelClasses: Record<Tone, string> = {
  primary: "border-blue-100 bg-blue-50/60",
  accent: "border-red-100 bg-red-50/60",
  neutral: "border-slate-100 bg-slate-50/60",
};

const statusBadgeClasses: Record<DataStatus, string> = {
  live: "border-blue-200 bg-blue-50 text-blue-900",
  expanding: "border-red-200 bg-red-50 text-red-900",
  future: "border-slate-200 bg-slate-100 text-slate-700",
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

        <Accordion
          type="multiple"
          defaultValue={clusters.length ? ["cluster-0"] : undefined}
          className="space-y-3"
        >
          {clusters.map((cluster, index) => {
            const tone = cluster.tone ?? "neutral";
            const value = `cluster-${index}`;

            return (
              <AccordionItem
                key={cluster.title}
                value={value}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
              >
                <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold text-slate-700 hover:no-underline">
                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex-1 text-left">
                      <p
                        className={cn(
                          "text-xs font-semibold uppercase tracking-[0.22em]",
                          toneHeadingClasses[tone],
                        )}
                      >
                        {cluster.title}
                      </p>
                      {cluster.caption ? (
                        <p className="mt-2 text-sm font-medium text-slate-600">
                          {cluster.caption}
                        </p>
                      ) : null}
                    </div>
                    <Badge className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-600">
                      {cluster.items.length} sources
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className={cn(
                      "space-y-3 rounded-xl border px-4 py-4",
                      tonePanelClasses[tone],
                    )}
                  >
                    {cluster.items.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-white/60 bg-white/90 p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">
                              {item.title}
                            </p>
                            {item.detail ? (
                              <p className="mt-1 text-sm text-slate-600">
                                {item.detail}
                              </p>
                            ) : null}
                            {item.metadata?.length ? (
                              <dl className="mt-3 space-y-2">
                                {item.metadata.map((meta) => (
                                  <div key={`${item.title}-${meta.label}`} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                                    <dt className="font-semibold uppercase tracking-[0.22em] text-slate-500">
                                      {meta.label}
                                    </dt>
                                    <dd className="text-slate-700">{meta.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            ) : null}
                            {item.tags?.length ? (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-700"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          <Badge
                            className={cn(
                              "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]",
                              statusBadgeClasses[item.status ?? "live"],
                            )}
                          >
                            {statusLabels[item.status ?? "live"]}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {footerNote ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-sm font-medium text-blue-900">
            {footerNote}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
