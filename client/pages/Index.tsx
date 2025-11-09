import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HorizonDiagram } from "@/components/dashboard/HorizonDiagram";
import { CostImpactPanel } from "@/components/dashboard/CostImpactPanel";
import { cn } from "@/lib/utils";

type HorizonKey = keyof typeof HORIZON_DATA;

type TimelineTone = "primary" | "accent" | "neutral";

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

const timelineToneClasses: Record<TimelineTone, string> = {
  primary: "border-blue-200 bg-blue-50/75 text-blue-900",
  accent: "border-red-200 bg-red-50/75 text-red-900",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

const QUADRANT_TAGS = {
  highEaseHighImpact: [
    "Quadrant: High ease ↗ High impact",
    "High ease of use",
    "High performance impact",
  ],
  highEaseEmergingImpact: [
    "Quadrant: High ease ↗ Emerging impact",
    "High ease of use",
    "Emerging performance impact",
  ],
  emergingEaseHighImpact: [
    "Quadrant: Emerging ease ↗ High impact",
    "Emerging ease of use",
    "High performance impact",
  ],
  emergingEaseEmergingImpact: [
    "Quadrant: Emerging ease ↗ Emerging impact",
    "Emerging ease of use",
    "Emerging performance impact",
  ],
} as const;

type MetadataConfig = {
  product?: string;
  system?: string;
  access?: string;
  ownership?: string;
};

function createMetadata({ product, system, access, ownership }: MetadataConfig) {
  const entries = [
    product ? { label: "Product", value: product } : null,
    system ? { label: "System", value: system } : null,
    access ? { label: "Access", value: access } : null,
    ownership ? { label: "Ownership", value: ownership } : null,
  ].filter((entry): entry is { label: string; value: string } => Boolean(entry));

  return entries;
}

const HORIZON_DATA = {
  h1: {
    label: "Horizon 1",
    short: "Core foundation",
    summary:
      "Integrate the high-trust clinical and personal records already curated by UK Sport so the Performance Hub earns confidence from day one.",
    ui: {
      title: "Launch UI snapshot",
      description:
        "A calm, card-driven dashboard that surfaces consent status and quick links to trusted medical records.",
      highlights: [
        "Hero banner shows consent badge and alerts for expiring approvals.",
        "Navigation prioritises athlete profile, medical notes, and policy library.",
        "Manual data upload tiles guide staff through streamlined forms.",
      ],
      palette: {
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        accent: "rgba(0, 36, 125, 0.18)",
        grid: "rgba(15, 76, 129, 0.12)",
      },
    },
    diagram: {
      title: "Performance Hub · Launch configuration",
      caption:
        "Bring the easiest, most trusted sources into a single, permissioned home to unlock immediate insight.",
      axes: {
        horizontal: "Impact",
        vertical: "Ease of use",
        summary:
          "Start with datasets that are already governed, digitised, and owned by UK Sport staff.",
      },
      clusters: [
        {
          title: "Clinical & personal records",
          tone: "primary" as const,
          caption: "High ease-of-use data already maintained inside UK Sport.",
          items: [
            {
              title: "Medical records",
              detail: "Clinical case notes and diagnostic history managed in PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Personal details",
              detail: "Identity, eligibility, and safeguarding managed through GMS/PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              metadata: createMetadata({
                product: "Membership",
                system: "GMS / PDMS (Entra ID roadmap)",
                access: "Internal",
                ownership: "UKS / UKSI",
              }),
            },
            {
              title: "Psychology consultations",
              detail: "Session notes captured by the psychology team in PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Nutrition consultations",
              detail: "Dietary planning and consultation notes tracked within PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Performance lifestyle consultations",
              detail: "Lifestyle and wellbeing discussions stored alongside athlete records.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Injury & illness surveillance",
              detail: "Athlete Health Intelligence tracking of injuries and illnesses via PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Pathology results",
              detail: "Lab feeds supplied by iChor and Randox partners.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Health",
                system: "iChor / Randox",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Head injury assessments",
              detail: "Head injury and concussion checks recorded through CSx.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Health",
                system: "CSx",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Athlete screening surveys",
              detail: "Medical screening forms captured through CheckMarket and SurveyMonkey.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Health",
                system: "CheckMarket / SurveyMonkey / Excel",
                access: "Internal",
                ownership: "NGB / UKSI",
              }),
            },
          ],
        },
        {
          title: "Training administration",
          tone: "neutral" as const,
          caption: "Structured documents that capture daily plans and reporting.",
          items: [
            {
              title: "Training plans",
              detail: "Planned sessions and workload targets authored in TeamBuildr.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Training",
                system: "TeamBuildr",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Activity physiology snapshots",
              detail: "Load and physiology metrics synced from wearables and AMPLIFY.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Training",
                system: "Wearables / AMPLIFY",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Anthropometry",
              detail: "Baseline measurements managed across PDMS and Excel trackers.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Training",
                system: "PDMS / Excel",
                access: "Internal",
                ownership: "NGB / UKSI",
              }),
            },
            {
              title: "Athlete profiling",
              detail: "Discipline, stage, and KPI sheets curated by coaches.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Health",
                system: "Excel",
                access: "Internal",
                ownership: "NGB",
              }),
            },
            {
              title: "Bespoke sport sensors & DBs",
              detail: "Discipline-specific feeds such as Nemo, track data, and Bounce.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Training",
                system: "Sport-specific systems",
                access: "Internal",
                ownership: "NGB",
              }),
            },
            {
              title: "Goals & performance plans",
              detail: "Coaching plans, gaps, and targets tracked across shared templates.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Training",
                system: "Multiple / Excel / Coaches",
                access: "Internal",
                ownership: "NGB",
              }),
            },
          ],
        },
        {
          title: "Consent & governance",
          tone: "accent" as const,
          caption: "Ensure every record is traceable and permissioned.",
          items: [
            {
              title: "Consent register",
              detail: "Consent? module with renewals and scope",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
            },
            {
              title: "Audit trail",
              detail: "Staff access, edits, and hand-offs",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
            },
            {
              title: "Policy repository",
              detail: "Policies and procedures for all sources",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
            },
          ],
        },
      ],
      footerNote:
        "This horizon establishes a compliant, single source of truth that underpins every dashboard and report.",
    },
    timeline: [
      {
        title: "H1: Now",
        description:
          "Onboard medical records, personal details, and policy libraries under a unified consent register.",
        tone: "primary" as TimelineTone,
      },
      {
        title: "Focus",
        description:
          "Streamline governance and data-entry workflows so staff can trust outputs immediately.",
        tone: "neutral" as TimelineTone,
      },
      {
        title: "Outcome",
        description:
          "Baseline dashboards mirror the best-available records with full auditability.",
        tone: "accent" as TimelineTone,
      },
    ],
  },
  h2: {
    label: "Horizon 2",
    short: "Expansion",
    summary:
      "Blend richer monitoring sources—video, wellness, and training loads—with retrieval tooling to elevate impact while adoption stays manageable.",
    ui: {
      title: "Growth UI snapshot",
      description:
        "The dashboard evolves with interactive media panels, wellness heatmaps, and inline retrieval prompts.",
      highlights: [
        "Video strip and comparison view anchor the top of the workspace.",
        "Wellness heatmap cards flag readiness trends with drill-down filters.",
        "Contextual RAG prompts let staff ask questions alongside each module.",
      ],
      palette: {
        background: "linear-gradient(135deg, #ffe8ef 0%, #dbeafe 100%)",
        accent: "rgba(207, 20, 43, 0.14)",
        grid: "rgba(0, 36, 125, 0.12)",
      },
    },
    diagram: {
      title: "Performance Hub · Scaling intelligence",
      caption:
        "Move into higher-impact performance monitoring streams and connect them to responsive knowledge retrieval.",
      axes: {
        horizontal: "Impact",
        vertical: "Ease of use",
        summary:
          "Invest effort in onboarding mixed-media and sensor data to unlock coaching advantage.",
      },
      clusters: [
        {
          title: "Performance monitoring",
          tone: "primary" as const,
          caption: "Data that boosts insight with manageable onboarding.",
          items: [
            {
              title: "Athlete wellness",
              detail: "Daily questionnaires and readiness signals collected in PDMS.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Testing monitoring",
              detail: "Gas consumption and physiology labs drawn from Vald Hub and AMPLIFY.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              metadata: createMetadata({
                product: "Training",
                system: "Vald Hub / AMPLIFY",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Training monitoring",
              detail: "Actual versus planned session execution across mixed sensor feeds.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              metadata: createMetadata({
                product: "Training",
                system: "Multiple / sensors",
                access: "Internal / External",
                ownership: "NGB",
              }),
            },
          ],
        },
        {
          title: "Session & media intelligence",
          tone: "neutral" as const,
          caption: "Higher impact formats requiring new tooling.",
          items: [
            {
              title: "Video library",
              detail: "Performance versus plan clips from federation and event providers.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              metadata: createMetadata({
                product: "Competition",
                system: "Federation websites & event capture",
                access: "External",
                ownership: "NGB",
              }),
            },
            {
              title: "Competition insights",
              detail: "Live competition results enriched for coaching context.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              metadata: createMetadata({
                product: "Competition",
                system: "ENetPulse",
                access: "Internal",
                ownership: "UK Sport",
              }),
            },
            {
              title: "Performance analytics",
              detail: "Visual comparison dashboards highlighting performance versus potential.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              metadata: createMetadata({
                product: "Training",
                system: "UKS",
                access: "Internal",
                ownership: "UKS",
              }),
            },
          ],
        },
        {
          title: "Intelligence core",
          tone: "accent" as const,
          caption: "Connect retrieval and knowledge layers.",
          items: [
            {
              title: "RAG retrieval",
              detail: "Surface consented knowledge instantly",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
            {
              title: "Vector store",
              detail: "Index multi-modal content for queries",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
            },
            {
              title: "Knowledge graph",
              detail: "Link athletes, staff, and competitions",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
          ],
        },
      ],
      footerNote:
        "Coaches gain context-rich insight without leaving the hub, supported by consistent consent governance.",
    },
    timeline: [
      {
        title: "H2: 6-12 Months",
        description:
          "Integrate wellness, testing, video, and competition feeds with richer analytics.",
        tone: "primary" as TimelineTone,
      },
      {
        title: "Focus",
        description:
          "Build ingestion pipelines and QA for mixed media and sensor data.",
        tone: "neutral" as TimelineTone,
      },
      {
        title: "Outcome",
        description:
          "Coaching teams receive context and recommendations in a single workspace.",
        tone: "accent" as TimelineTone,
      },
    ],
  },
  h3: {
    label: "Horizon 3",
    short: "Transformation",
    summary:
      "Orchestrate high-impact external intelligence and autonomous analysis so the Performance Hub becomes a proactive partner.",
    ui: {
      title: "Transformation UI snapshot",
      description:
        "Adaptive layouts showcase AI recommendations, live telemetry, and automation playbooks in real time.",
      highlights: [
        "AI command bar surfaces suggested actions and confidence tags.",
        "Live widgets stream telemetry alongside competition feeds.",
        "Automation panel previews queued playbooks for staff approval.",
      ],
      palette: {
        background: "linear-gradient(135deg, #c4d7ff 0%, #ffe4ec 100%)",
        accent: "rgba(207, 20, 43, 0.18)",
        grid: "rgba(0, 36, 125, 0.16)",
      },
    },
    diagram: {
      title: "Performance Hub · Full ecosystem",
      caption:
        "Fuse external SSSM insight, research projects, and real-time telemetry with AI-driven orchestration.",
      axes: {
        horizontal: "Impact",
        vertical: "Ease of use",
        summary:
          "Lean into higher-complexity integrations that deliver outsized competitive advantage.",
      },
      clusters: [
        {
          title: "External SSSM & research",
          tone: "neutral" as const,
          caption: "High impact but complex to acquire and govern.",
          items: [
            {
              title: "External SSSM insight",
              detail: "Partner institutes & third-party labs",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
            {
              title: "Bespoke research feeds",
              detail: "Academic collaborations and trials",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
            },
            {
              title: "Performance data lab",
              detail: "Longitudinal benchmarking datasets",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
          ],
        },
        {
          title: "Autonomous intelligence",
          tone: "accent" as const,
          caption: "Automate recommendations across the hub.",
          items: [
            {
              title: "Reasoning agents",
              detail: "LLM/SLM coaching copilots",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
            {
              title: "Simulation modelling",
              detail: "Scenario testing and medal projections",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
            {
              title: "Proactive alerts",
              detail: "Automated readiness and risk flags",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
          ],
        },
        {
          title: "Real-time ecosystem",
          tone: "primary" as const,
          caption: "Continuously updating streams that demand orchestration.",
          items: [
            {
              title: "Live competition feeds",
              detail: "Streaming and API integrations",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
            {
              title: "Wearables & IoT telemetry",
              detail: "Real-time biometrics within consent controls",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
            },
            {
              title: "Automation playbooks",
              detail: "Trigger workflows and staff support tasks",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
            },
          ],
        },
      ],
      footerNote:
        "Closed-loop orchestration means the hub can recommend and, where appropriate, trigger action automatically.",
    },
    timeline: [
      {
        title: "H3: 1+ Years",
        description:
          "Fuse external SSSM intel, research data, and real-time telemetry into the hub.",
        tone: "primary" as TimelineTone,
      },
      {
        title: "Focus",
        description:
          "Automate analysis with reasoning agents, simulations, and proactive alerting.",
        tone: "neutral" as TimelineTone,
      },
      {
        title: "Outcome",
        description:
          "The hub orchestrates proactive support and data-driven actions across the system.",
        tone: "accent" as TimelineTone,
      },
    ],
  },
} satisfies Record<string, {
  label: string;
  short: string;
  summary: string;
  diagram: Parameters<typeof HorizonDiagram>[0];
  ui: UIEvolution;
  timeline: { title: string; description: string; tone: TimelineTone }[];
}>;

export default function Index() {
  const [activeHorizon, setActiveHorizon] = useState<HorizonKey>("h1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
            UK Sport Framework
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Three Horizons Data Integration
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tab through the horizons to see how UK Sport incrementally integrates new data sources—
            moving from high ease-of-use records to high-impact intelligence.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <Tabs
            value={activeHorizon}
            onValueChange={(value) => setActiveHorizon(value as HorizonKey)}
            className="h-full"
          >
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-xl grid-cols-3 gap-1 rounded-full border border-blue-100 bg-white/80 p-1 shadow-sm">
                {(Object.keys(HORIZON_DATA) as HorizonKey[]).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="rounded-full px-6 py-2 text-sm font-semibold text-slate-600 transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {HORIZON_DATA[key].label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {(Object.keys(HORIZON_DATA) as HorizonKey[]).map((key) => {
              const horizon = HORIZON_DATA[key];
              return (
                <TabsContent key={key} value={key} className="mt-10 space-y-10">
                  <section className="rounded-3xl border border-blue-100 bg-white/90 p-10 shadow-sm">
                    <header className="max-w-3xl">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                        {horizon.short}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-primary">
                        {horizon.label}: {horizon.short}
                      </h2>
                      <p className="mt-3 text-base text-slate-600">{horizon.summary}</p>
                    </header>

                    <div className="mt-8 space-y-10">
                      <section className="relative overflow-hidden rounded-3xl border border-blue-100/80 bg-gradient-to-br from-white via-blue-50/60 to-white p-8 shadow-lg">
                        <div
                          aria-hidden
                          className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                        />
                        <div
                          aria-hidden
                          className="absolute -left-20 -top-10 h-52 w-52 rounded-full bg-red-200/20 blur-3xl"
                        />
                        <div className="relative grid items-start gap-8">
                          <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge className="rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground">
                                {horizon.label}
                              </Badge>
                              <Badge className="rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                                UI Evolution
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-semibold text-primary">
                              {horizon.ui.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                              {horizon.ui.description}
                            </p>
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

                      <div className="grid gap-8 lg:grid-cols-2">
                        <CostImpactPanel stage={key} />
                        <HorizonDiagram
                          title={horizon.diagram.title}
                          caption={horizon.diagram.caption}
                          clusters={horizon.diagram.clusters}
                          footerNote={horizon.diagram.footerNote}
                          axes={horizon.diagram.axes}
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {horizon.timeline.map((item) => (
                        <Card
                          key={item.title}
                          className={cn(
                            "h-full border-2 transition hover:-translate-y-1 hover:shadow-md",
                            timelineToneClasses[item.tone],
                          )}
                        >
                          <CardHeader>
                            <CardTitle className="text-base font-semibold">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-current/80">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </section>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
