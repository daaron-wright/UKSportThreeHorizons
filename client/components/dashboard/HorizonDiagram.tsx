import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "neutral";
type DataStatus = "live" | "expanding" | "future";

type ArchitectureTone =
  | "primary"
  | "accent"
  | "neutral"
  | "muted"
  | "dark"
  | "info";

type ArchitectureBand = {
  label: string;
  description?: string;
  tone?: ArchitectureTone;
};

type ArchitectureModule = {
  title: string;
  detail?: string;
  tone?: ArchitectureTone;
};

type ArchitectureSideNote = {
  title: string;
  detail?: string;
  position: "left-top" | "left-bottom" | "right-top" | "right-bottom";
};

type ArchitectureCallout = {
  title: string;
  detail?: string;
  position?: "top-left" | "top-right";
};

type ArchitectureLayout = {
  type: "architecture";
  headerBands?: ArchitectureBand[];
  capabilityStack?: ArchitectureModule[];
  core: {
    badge?: string;
    title?: string;
    subtitle?: string;
    rows: ArchitectureModule[][];
    callouts?: ArchitectureCallout[];
  };
  rightRail?: {
    title: string;
    detail?: string;
    items?: ArchitectureModule[];
  };
  integration: ArchitectureBand;
  dataSources: ArchitectureBand & { chips?: string[] };
  sideNotes?: ArchitectureSideNote[];
};

export interface DiagramClusterItem {
  title: string;
  detail?: string;
  status?: DataStatus;
  tags?: readonly string[];
  impactLevel?: "high" | "low";
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
  clusters?: DiagramCluster[];
  footerNote?: string;
  axes?: DiagramAxes;
  layout?: ArchitectureLayout;
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

const impactBadgeClasses: Record<NonNullable<DiagramClusterItem["impactLevel"]>, string> = {
  high: "border-emerald-200 bg-emerald-100 text-emerald-900",
  low: "border-slate-200 bg-slate-100 text-slate-700",
};

const impactBadgeLabels: Record<NonNullable<DiagramClusterItem["impactLevel"]>, string> = {
  high: "High impact",
  low: "Lower impact",
};

export function HorizonDiagram({
  title,
  caption,
  clusters,
  footerNote,
  axes,
  layout,
}: HorizonDiagramProps) {
  const isArchitecture = layout?.type === "architecture";

  return (
    <Card className="overflow-hidden border-blue-100 shadow-md">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="mt-1 text-sm text-primary-foreground/80">{caption}</p>
      </CardHeader>
      <CardContent
        className={cn(
          "space-y-6 bg-white py-6",
          isArchitecture && "bg-gradient-to-br from-white via-blue-50/35 to-white",
        )}
      >
        {isArchitecture && layout ? (
          <ArchitectureDiagram layout={layout} axes={axes} footerNote={footerNote} />
        ) : (
          <DefaultDiagram clusters={clusters ?? []} axes={axes} footerNote={footerNote} />
        )}
      </CardContent>
    </Card>
  );
}

function DefaultDiagram({
  clusters,
  axes,
  footerNote,
}: {
  clusters: DiagramCluster[];
  axes?: DiagramAxes;
  footerNote?: string;
}) {
  return (
    <div className="space-y-6">
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
                      <p className="mt-2 text-sm font-medium text-slate-600">{cluster.caption}</p>
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
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            {item.impactLevel ? (
                              <Badge
                                variant="outline"
                                className={cn(
                                  "rounded-full px-3 py-1 text-[11px] font-semibold",
                                  impactBadgeClasses[item.impactLevel],
                                )}
                              >
                                {impactBadgeLabels[item.impactLevel]}
                              </Badge>
                            ) : null}
                          </div>
                          {item.detail ? (
                            <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                          ) : null}
                          {item.metadata?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.metadata.map((meta) => (
                                <Badge
                                  key={`${item.title}-${meta.label}`}
                                  variant="outline"
                                  className="rounded-xl border-blue-200 bg-blue-50/90 px-3 py-1.5 text-xs font-medium text-blue-900 shadow-sm"
                                >
                                  <span className="mr-2 uppercase tracking-[0.18em] text-blue-700">
                                    {meta.label}
                                  </span>
                                  <span className="text-blue-900">{meta.value}</span>
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
    </div>
  );
}

function ArchitectureDiagram({
  layout,
  axes,
  footerNote,
}: {
  layout: ArchitectureLayout;
  axes?: DiagramAxes;
  footerNote?: string;
}) {
  const leftNotes = layout.sideNotes?.filter((note) => note.position.startsWith("left")) ?? [];
  const rightNotes = layout.sideNotes?.filter((note) => note.position.startsWith("right")) ?? [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,220px)]">
        <ArchitectureSideColumn alignment="left" notes={leftNotes} />
        <div className="order-1 space-y-5 lg:order-2">
          {axes ? (
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/70 p-4 text-sm text-blue-900 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">Axes</p>
              <p className="mt-2 text-sm font-semibold text-blue-900">
                {axes.horizontal} × {axes.vertical}
              </p>
              {axes.summary ? (
                <p className="mt-1 text-xs text-blue-900/80">{axes.summary}</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-4 rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-xl">
            {layout.headerBands?.length ? (
              <div className="grid gap-2">
                {layout.headerBands.map((band) => (
                  <div
                    key={band.label}
                    className={cn(
                      "rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em]",
                      getBandToneClasses(band.tone ?? "primary"),
                    )}
                  >
                    <span>{band.label}</span>
                    {band.description ? (
                      <span className="ml-2 text-xs font-normal normal-case tracking-normal text-white/90">
                        {band.description}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {layout.capabilityStack?.length ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {layout.capabilityStack.map((module) => (
                  <div
                    key={module.title}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium shadow-sm",
                      getModuleToneClasses(module.tone ?? "muted"),
                    )}
                  >
                    <p className="font-semibold uppercase tracking-[0.18em]">{module.title}</p>
                    {module.detail ? (
                      <p className="mt-2 text-xs text-slate-600">{module.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)]">
              <div className="relative space-y-4 rounded-3xl border border-red-200 bg-red-50/80 p-6 shadow-inner">
                {layout.core.badge ? (
                  <span className="inline-flex w-fit rounded-full border border-red-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">
                    {layout.core.badge}
                  </span>
                ) : null}
                {layout.core.title ? (
                  <h3 className="text-lg font-semibold text-red-800">{layout.core.title}</h3>
                ) : null}
                {layout.core.subtitle ? (
                  <p className="text-sm text-red-700/90">{layout.core.subtitle}</p>
                ) : null}

                {layout.core.callouts?.map((callout, index) => (
                  <div
                    key={`${callout.title}-${callout.position ?? index}`}
                    className={cn(
                      "absolute w-48 max-w-[12rem] rounded-xl border border-blue-200 bg-blue-50/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-lg",
                      callout.position === "top-right" ? "right-6" : "left-6",
                    )}
                    style={{ top: `${index * 64 + 16}px` }}
                  >
                    <p>{callout.title}</p>
                    {callout.detail ? (
                      <p className="mt-2 text-[11px] font-medium normal-case tracking-normal text-blue-900">
                        {callout.detail}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="space-y-3">
                  {layout.core.rows.map((row, rowIndex) => (
                    <div
                      key={`core-row-${rowIndex}`}
                      className={cn("grid gap-3", getResponsiveColsClass(row.length))}
                    >
                      {row.map((module) => (
                        <div
                          key={module.title}
                          className={cn(
                            "rounded-2xl border bg-white/95 p-4 shadow-sm",
                            getCoreModuleToneClasses(module.tone),
                          )}
                        >
                          <p className="text-sm font-semibold">{module.title}</p>
                          {module.detail ? (
                            <p className="mt-2 text-xs text-slate-600">{module.detail}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {layout.rightRail ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-inner">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-700">
                    {layout.rightRail.title}
                  </p>
                  {layout.rightRail.detail ? (
                    <p className="mt-2 text-sm text-slate-600">{layout.rightRail.detail}</p>
                  ) : null}
                  {layout.rightRail.items?.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {layout.rightRail.items.map((item) => (
                        <li
                          key={item.title}
                          className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 shadow-sm"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              <div
                className={cn(
                  "rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em]",
                  getBandToneClasses(layout.integration.tone ?? "dark"),
                )}
              >
                <div>{layout.integration.label}</div>
                {layout.integration.description ? (
                  <p className="mt-2 text-xs font-medium normal-case tracking-normal">
                    {layout.integration.description}
                  </p>
                ) : null}
              </div>
              <div
                className={cn(
                  "rounded-2xl border px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em]",
                  getBandToneClasses(layout.dataSources.tone ?? "muted"),
                )}
              >
                <div>{layout.dataSources.label}</div>
                {layout.dataSources.description ? (
                  <p className="mt-2 text-xs font-medium normal-case tracking-normal text-blue-900/80">
                    {layout.dataSources.description}
                  </p>
                ) : null}
                {layout.dataSources.chips?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {layout.dataSources.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-blue-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ArchitectureSideColumn alignment="right" notes={rightNotes} />
      </div>
      {footerNote ? (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-sm font-medium text-blue-900">
          {footerNote}
        </div>
      ) : null}
    </div>
  );
}

function ArchitectureSideColumn({
  alignment,
  notes,
}: {
  alignment: "left" | "right";
  notes?: ArchitectureSideNote[];
}) {
  const baseOrder = alignment === "left" ? "order-2 lg:order-1" : "order-3 lg:order-3";

  if (!notes?.length) {
    return <div className={cn("hidden lg:block", baseOrder)} />;
  }

  return (
    <div className={cn("flex flex-col gap-4", baseOrder)}>
      {notes.map((note) => (
        <div
          key={`${note.position}-${note.title}`}
          className="rounded-2xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-sm font-medium text-blue-900 shadow-sm"
        >
          <p className="uppercase tracking-[0.22em]">{note.title}</p>
          {note.detail ? (
            <p className="mt-2 text-xs font-medium normal-case tracking-normal text-blue-900/80">
              {note.detail}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function getResponsiveColsClass(count: number) {
  if (count <= 1) {
    return "grid-cols-1";
  }
  if (count === 2) {
    return "grid-cols-1 sm:grid-cols-2";
  }
  if (count === 3) {
    return "grid-cols-1 sm:grid-cols-3";
  }
  return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
}

function getBandToneClasses(tone: ArchitectureTone) {
  switch (tone) {
    case "primary":
      return "bg-emerald-500 text-emerald-50 shadow-sm";
    case "accent":
      return "bg-blue-600 text-white shadow-sm";
    case "neutral":
      return "bg-slate-600 text-white shadow-sm";
    case "dark":
      return "bg-slate-900 text-white shadow-sm";
    case "info":
      return "border border-blue-200 bg-blue-50 text-blue-900";
    case "muted":
    default:
      return "border border-slate-200 bg-slate-50 text-slate-700";
  }
}

function getModuleToneClasses(tone: ArchitectureTone) {
  switch (tone) {
    case "primary":
      return "border-blue-200 bg-blue-50 text-blue-900";
    case "accent":
      return "border-red-200 bg-red-50 text-red-900";
    case "neutral":
      return "border-slate-300 bg-slate-100 text-slate-700";
    case "dark":
      return "border-slate-800 bg-slate-900 text-white";
    case "info":
      return "border-blue-200 bg-blue-50 text-blue-900";
    case "muted":
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

function getCoreModuleToneClasses(tone?: ArchitectureTone) {
  switch (tone) {
    case "primary":
      return "border-blue-200 text-blue-800";
    case "accent":
      return "border-red-300 text-red-800";
    case "neutral":
      return "border-slate-200 text-slate-700";
    case "info":
      return "border-blue-200 text-blue-800";
    case "dark":
      return "border-slate-800 text-slate-900";
    case "muted":
    default:
      return "border-red-200/70 text-red-800";
  }
}

export type { ArchitectureLayout };
