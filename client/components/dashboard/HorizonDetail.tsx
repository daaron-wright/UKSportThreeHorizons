import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

type Persona = {
  name: string;
  focus: string;
  needs: string;
};

type OperatingModelRole = {
  title: string;
  detail: string;
  allocation?: string;
};

type OperatingModel = {
  name: string;
  summary: string;
  enablers: string[];
  diagram?: {
    src: string;
    alt: string;
  };
  roles?: OperatingModelRole[];
};

type PersonaTarget = {
  users: string;
  organizations: string;
  summary: string;
};

type TechnicalEvolutionIntegrationRow = {
  functionalBlock: string;
  service: string;
  notes?: string;
  bom?: string[];
};

type TechnicalEvolutionIntegrationTable = {
  title: string;
  rows: TechnicalEvolutionIntegrationRow[];
};

type TechnicalEvolution = {
  title: string;
  description: string;
  pillars: { label: string; detail: string }[];
  diagram?: {
    src: string;
    alt: string;
  };
  integrationTable?: TechnicalEvolutionIntegrationTable;
};

type ValueTheme = {
  category: string;
  statement: string;
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

type HorizonDetailProps = {
  horizonKey: string;
  horizon: {
    label: string;
    short: string;
    summary: string;
    overview: {
      narrative: string;
      highlights: string[];
      metrics: { label: string; value?: string; details?: string[] }[];
    };
    valueThemes: ValueTheme[];
    personas: Persona[];
    operatingModel: OperatingModel;
    personaTarget: PersonaTarget;
    technicalEvolution: TechnicalEvolution;
    ui: UIEvolution;
  };
};

export function HorizonDetail({ horizonKey, horizon }: HorizonDetailProps) {
  const [activeSection, setActiveSection] = useState<SectionValue>("overview");
  const [integrationExpanded, setIntegrationExpanded] = useState(false);

  useEffect(() => {
    setActiveSection("overview");
    setIntegrationExpanded(false);
  }, [horizonKey]);

  const overviewHighlights = horizon.overview?.highlights ?? [];
  const overviewMetrics = horizon.overview?.metrics ?? [];
  const valueThemes = horizon.valueThemes ?? [];
  const personaList = horizon.personas ?? [];
  const operatingRoles = horizon.operatingModel.roles ?? [];
  const operatingEnablers = horizon.operatingModel.enablers ?? [];
  const technicalPillars = horizon.technicalEvolution.pillars ?? [];
  const integrationTable = horizon.technicalEvolution.integrationTable;
  const integrationRows = integrationTable?.rows ?? [];

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-sm">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            {horizon.short}
          </Badge>
          <Badge variant="secondary" className="border border-blue-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            {personaList.length} personas
          </Badge>
          {operatingEnablers.length ? (
            <Badge variant="secondary" className="border border-blue-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
              {operatingEnablers.length} enablers
            </Badge>
          ) : null}
          {operatingRoles.length ? (
            <Badge variant="secondary" className="border border-blue-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
              {operatingRoles.length} roles
            </Badge>
          ) : null}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">
            {horizon.label}: {horizon.short}
          </h2>
          <p className="text-base text-slate-600">{horizon.summary}</p>
        </div>
      </header>

      <SectionTabs
        value={activeSection}
        onValueChange={(value) => setActiveSection(value as SectionValue)}
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
          <div className="space-y-6">
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-slate-600">{horizon.overview.narrative}</p>
              <div className="grid gap-3">
                {overviewHighlights.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-blue-100/80 bg-blue-50/60 px-4 py-3 text-sm text-blue-900"
                  >
                    {point}
                  </div>
                ))}
              </div>
              {valueThemes.length ? (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
                    ROI focus areas
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {valueThemes.map((theme) => (
                      <div
                        key={`${theme.category}-${theme.statement}`}
                        className="rounded-2xl border border-blue-100/80 bg-white/90 p-4 text-sm text-slate-700 shadow-sm"
                      >
                        <p className="font-semibold uppercase tracking-[0.18em] text-blue-700">
                          {theme.category}
                        </p>
                        <p className="mt-2 leading-relaxed text-slate-600">{theme.statement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="rounded-2xl border border-blue-100/80 bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">Areas of focus</p>
              <div className="mt-4 flex flex-col gap-3">
                {overviewMetrics.map((metric, index) => {
                  if (metric.details?.length) {
                    return (
                      <div
                        key={`${metric.label}-${index}`}
                        className="overflow-hidden rounded-xl border border-blue-100 bg-blue-50/60"
                      >
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={`metric-${index}`} className="border-none">
                            <AccordionTrigger className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 hover:no-underline">
                              {metric.label}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-left text-sm font-medium tracking-normal text-slate-600">
                              <ul className="space-y-2">
                                {metric.details.map((detail) => (
                                  <li key={detail} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-blue-400" aria-hidden="true" />
                                    <span className="leading-snug text-slate-600">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`${metric.label}-${index}`}
                      className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700"
                    >
                      {metric.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionTabsContent>

        <SectionTabsContent value="personas" className="space-y-6">
          {horizon.personaTarget ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">Target users</p>
                <p className="mt-2 text-base font-semibold text-primary">{horizon.personaTarget.users}</p>
              </div>
              <div className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">Sports organizations</p>
                <p className="mt-2 text-base font-semibold text-primary">{horizon.personaTarget.organizations}</p>
              </div>
              <div className="rounded-2xl border border-blue-100/80 bg-white/90 p-4 text-sm text-slate-700 sm:col-span-3 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">Rollout focus</p>
                <p className="mt-2 leading-relaxed">{horizon.personaTarget.summary}</p>
              </div>
            </div>
          ) : null}
          {personaList.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {personaList.map((persona) => (
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
            {operatingRoles.length ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
                  Delivery roles & ownership
                </p>
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  {operatingRoles.map((role) => (
                    <article
                      key={role.title}
                      className="rounded-2xl border border-blue-100 bg-white/95 p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base font-semibold text-primary">{role.title}</h4>
                        {role.allocation ? (
                          <Badge variant="secondary" className="whitespace-nowrap border border-blue-200 bg-white px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
                            {role.allocation}
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{role.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
            {horizon.operatingModel.diagram ? (
              <div className="overflow-hidden rounded-2xl border border-blue-100/80 bg-white/90 p-4 shadow-sm">
                <img
                  src={horizon.operatingModel.diagram.src}
                  alt={horizon.operatingModel.diagram.alt}
                  className="h-auto w-full rounded-xl border border-blue-100 object-cover"
                />
              </div>
            ) : null}
            {operatingEnablers.length ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {operatingEnablers.map((enabler) => (
                  <div
                    key={enabler}
                    className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900"
                  >
                    {enabler}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </SectionTabsContent>

        <SectionTabsContent value="technical" className="space-y-6">
          <section className="space-y-4">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                  Technical evolution
                </p>
                <h3 className="mt-1 text-xl font-semibold text-primary">{horizon.technicalEvolution.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{horizon.technicalEvolution.description}</p>
              </div>
              <Badge className="h-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                Platform stack
              </Badge>
            </header>
            {horizon.technicalEvolution.diagram ? (
              <div className="overflow-hidden rounded-2xl border border-blue-100/80 bg-white/90 p-4 shadow-sm">
                <img
                  src={horizon.technicalEvolution.diagram.src}
                  alt={horizon.technicalEvolution.diagram.alt}
                  className="h-auto w-full rounded-xl border border-blue-100 object-cover"
                />
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-3">
              {technicalPillars.map((pillar) => (
                <article
                  key={pillar.label}
                  className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{pillar.label}</h4>
                  <p className="mt-2 text-sm text-blue-900/90">{pillar.detail}</p>
                </article>
              ))}
            </div>
            {integrationTable ? (
              <div className="space-y-4 rounded-2xl border border-blue-100/80 bg-white/95 p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
                      {integrationTable.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Drill into the {horizon.label} stack across functional blocks, preferred services, and delivery notes.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIntegrationExpanded((prev) => !prev)}
                    aria-expanded={integrationExpanded}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary transition hover:bg-primary/20"
                  >
                    {integrationExpanded ? "Hide stack details" : "View stack details"}
                    <span className="text-base">{integrationExpanded ? "−" : "+"}</span>
                  </button>
                </div>
                {integrationExpanded ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm text-slate-700">
                      <thead>
                        <tr className="text-xs uppercase tracking-[0.18em] text-blue-600">
                          <th className="rounded-l-xl bg-blue-50/80 px-4 py-3 font-semibold">Functional block</th>
                          <th className="bg-blue-50/80 px-4 py-3 font-semibold">Potential service</th>
                          <th className="bg-blue-50/80 px-4 py-3 font-semibold">Notes</th>
                          <th className="rounded-r-xl bg-blue-50/80 px-4 py-3 font-semibold">Bill of materials</th>
                        </tr>
                      </thead>
                      <tbody>
                        {integrationRows.map((row) => (
                          <tr key={`${row.functionalBlock}-${row.service}`} className="align-top">
                            <td className="rounded-l-xl bg-white px-4 py-3 font-semibold text-slate-900">
                              {row.functionalBlock}
                            </td>
                            <td className="bg-white px-4 py-3 text-slate-700">{row.service}</td>
                            <td className="bg-white px-4 py-3 text-slate-600">{row.notes ?? "—"}</td>
                            <td className="rounded-r-xl bg-white px-4 py-3 text-slate-700">
                              {row.bom?.length ? (
                                <ul className="list-disc space-y-1 pl-4 text-xs text-slate-600">
                                  {row.bom.map((item) => (
                                    <li key={`${row.functionalBlock}-${item}`}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                "—"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ) : null}
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
