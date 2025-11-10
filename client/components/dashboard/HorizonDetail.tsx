import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs as SectionTabs,
  TabsContent as SectionTabsContent,
  TabsList as SectionTabsList,
  TabsTrigger as SectionTabsTrigger,
} from "@/components/ui/tabs";
const SECTION_CONFIG = [
  { value: "overview", label: "Overview" },
  { value: "personas", label: "Personas" },
  { value: "operating", label: "Operating model" },
  { value: "technical", label: "Technical evolution" },
  { value: "experience", label: "Experience design" },
] as const;

type SectionValue = (typeof SECTION_CONFIG)[number]["value"];

export type HorizonSectionValue = SectionValue;

type Persona = {
  name: string;
  focus: string;
  needs: string;
};

type OperatingModel = {
  name: string;
  summary: string;
  enablers: string[];
};

type TechnicalEvolution = {
  title: string;
  description: string;
  pillars: { label: string; detail: string }[];
};

type UIEvolution = {
  title: string;
  description: string;
  highlights: string[];
  palette: {
    background: string;
    accent: string;
    grid: string;
  };
};

type HorizonTimelineItem = {
  title: string;
  description: string;
  tone: string;
};

type HorizonDetailProps = {
  horizonKey: string;
  horizon: {
    label: string;
    short: string;
    summary: string;
    overview: {
      narrative: string;
      highlights: string[];
      metrics: { label: string; value: string }[];
    };
    impact: {
      description: string;
      metrics: { label: string; value: string; indicator?: "up" | "steady" | "down" }[];
    };
    personas: Persona[];
    operatingModel: OperatingModel;
    technicalEvolution: TechnicalEvolution;
    ui: UIEvolution;
    diagram: {
      title: string;
      caption: string;
      clusters: DiagramCluster[];
      footerNote?: string;
      axes?: DiagramAxes;
    };
    timeline: HorizonTimelineItem[];
  };
  timelineToneClasses: Record<string, string>;
  activeSection?: HorizonSectionValue;
  onSectionChange?: (section: HorizonSectionValue) => void;
};

export function HorizonDetail({
  horizonKey,
  horizon,
  timelineToneClasses,
  activeSection: controlledSection,
  onSectionChange,
}: HorizonDetailProps) {
  const [internalSection, setInternalSection] = useState<SectionValue>("overview");

  const isControlled = controlledSection !== undefined;
  const currentSection = (isControlled ? controlledSection : internalSection) ?? "overview";

  useEffect(() => {
    if (!isControlled) {
      setInternalSection("overview");
    }
  }, [horizonKey, isControlled]);

  const handleSectionChange = (value: SectionValue) => {
    if (!isControlled) {
      setInternalSection(value);
    }
    onSectionChange?.(value);
  };

  const renderIndicator = (indicator?: "up" | "steady" | "down") => {
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
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-sm">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            {horizon.short}
          </Badge>
          <Badge variant="secondary" className="border border-blue-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            {horizon.personas.length} personas
          </Badge>
          <Badge variant="secondary" className="border border-blue-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            {horizon.operatingModel.enablers.length} enablers
          </Badge>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">
            {horizon.label}: {horizon.short}
          </h2>
          <p className="text-base text-slate-600">{horizon.summary}</p>
        </div>
      </header>

      <SectionTabs
        value={currentSection}
        onValueChange={(value) => handleSectionChange(value as SectionValue)}
        className="space-y-6"
      >
        <SectionTabsList className="flex w-full gap-2 overflow-x-auto rounded-full border border-blue-100 bg-white/80 p-1 text-sm font-semibold text-slate-600 shadow-sm">
          {SECTION_CONFIG.map((section) => (
            <SectionTabsTrigger
              key={section.value}
              value={section.value}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {section.label}
            </SectionTabsTrigger>
          ))}
        </SectionTabsList>

        <SectionTabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-slate-600">
                {horizon.overview.narrative}
              </p>
              <div className="grid gap-3">
                {horizon.overview.highlights.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-blue-100/80 bg-blue-50/60 px-4 py-3 text-sm text-blue-900"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-blue-100/80 bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">Snapshot</p>
              <div className="mt-4 grid gap-3">
                {horizon.overview.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                      {metric.label}
                    </span>
                    <span className="text-base font-semibold text-primary">{metric.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-2 border-t border-blue-100 pt-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">Personas in scope</span>
                  <span>{horizon.personas.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">Platform enablers</span>
                  <span>{horizon.operatingModel.enablers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </SectionTabsContent>

        <SectionTabsContent value="personas" className="space-y-6">
          {horizon.personas.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {horizon.personas.map((persona) => (
                <article
                  key={persona.name}
                  className="flex h-full flex-col justify-between rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm"
                >
                  <div>
                    <h3 className="text-base font-semibold text-primary">{persona.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{persona.focus}</p>
                  </div>
                  <div className="mt-4 rounded-xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900">
                    <p className="font-semibold uppercase tracking-[0.22em] text-blue-700">Key needs</p>
                    <p className="mt-2 text-sm text-blue-900/90">{persona.needs}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">No personas captured for this horizon yet.</p>
          )}
        </SectionTabsContent>

        <SectionTabsContent value="operating" className="space-y-6">
          <div className="space-y-4">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                  Target operating model
                </p>
                <h3 className="mt-1 text-xl font-semibold text-primary">{horizon.operatingModel.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{horizon.operatingModel.summary}</p>
              </div>
              <Badge className="h-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                Operating model
              </Badge>
            </header>
            <div className="grid gap-3 sm:grid-cols-3">
              {horizon.operatingModel.enablers.map((enabler) => (
                <div
                  key={enabler}
                  className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900"
                >
                  {enabler}
                </div>
              ))}
            </div>
          </div>
        </SectionTabsContent>

        <SectionTabsContent value="technical" className="space-y-6">
          <section className="space-y-4">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Technical evolution</p>
                <h3 className="mt-1 text-xl font-semibold text-primary">{horizon.technicalEvolution.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{horizon.technicalEvolution.description}</p>
              </div>
              <Badge className="h-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                Platform stack
              </Badge>
            </header>
            <div className="grid gap-4 sm:grid-cols-3">
              {horizon.technicalEvolution.pillars.map((pillar) => (
                <article
                  key={pillar.label}
                  className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{pillar.label}</h4>
                  <p className="mt-2 text-sm text-blue-900/90">{pillar.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </SectionTabsContent>

        <SectionTabsContent value="experience" className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl border border-blue-100/80 bg-gradient-to-br from-white via-blue-50/60 to-white p-8 shadow-lg">
            <div
              aria-hidden
              className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -left-20 -top-10 h-52 w-52 rounded-full bg-red-200/20 blur-3xl"
            />
            <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground">
                    {horizon.label}
                  </Badge>
                  <Badge className="rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                    UI evolution
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold text-primary">{horizon.ui.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{horizon.ui.description}</p>
                <div className="grid gap-3">
                  {horizon.ui.highlights.map((point, index) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-blue-100/80 bg-white/90 p-4 shadow-sm"
                    >
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm text-slate-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-6 shadow-xl"
                style={{ background: horizon.ui.palette.background }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <span className="inline-flex h-1 w-12 rounded-full bg-blue-500/80" />
                  Interface preview
                </div>
                <div className="mt-5 space-y-4">
                  <div
                    className="rounded-xl border border-white/60 bg-white/90 p-4 shadow-sm"
                    style={{ borderColor: horizon.ui.palette.grid }}
                  >
                    <p className="text-sm font-semibold text-primary">Primary workspace</p>
                    <p className="mt-2 text-xs text-slate-600">
                      Layout rebalances to spotlight the data and tools unlocked in this horizon.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {horizon.ui.highlights.slice(0, 2).map((point) => (
                      <div
                        key={point}
                        className="rounded-lg border border-white/60 bg-white/90 p-3 text-xs font-medium text-slate-600 shadow-sm"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="border border-blue-200 bg-white text-xs">
                      Adaptive UI
                    </Badge>
                    <Badge variant="secondary" className="border border-red-200 bg-white text-xs">
                      Data aware
                    </Badge>
                    <Badge variant="secondary" className="border border-slate-200 bg-white text-xs">
                      Consent aligned
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionTabsContent>
      </SectionTabs>
    </div>
  );
}
