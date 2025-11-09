import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HorizonDiagram } from "@/components/dashboard/HorizonDiagram";
import { cn } from "@/lib/utils";

type HorizonKey = keyof typeof HORIZON_DATA;

type TimelineTone = "primary" | "accent" | "neutral";

const timelineToneClasses: Record<TimelineTone, string> = {
  primary: "border-blue-200 bg-blue-50/75 text-blue-900",
  accent: "border-red-200 bg-red-50/75 text-red-900",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

const HORIZON_DATA = {
  h1: {
    label: "Horizon 1",
    short: "Core Foundation",
    summary:
      "Establish the secure foundations that make data trusted and actionable from day one.",
    diagram: {
      title: "Performance Hub · Launch configuration",
      caption:
        "Anchor the experience around accurate dashboards, explicit consent, and reliable data ingestion.",
      clusters: [
        {
          title: "Experience Layer",
          tone: "primary" as const,
          items: [
            { title: "Insight Dashboards" },
            { title: "Manual Data Upload" },
            { title: "Baseline Query Tools" },
          ],
        },
        {
          title: "Consent Core",
          tone: "accent" as const,
          items: [
            { title: "Athlete Consent" },
            { title: "Data Governance" },
            { title: "Audit Trail" },
          ],
        },
        {
          title: "Data Foundation",
          tone: "neutral" as const,
          items: [
            { title: "Athlete Records" },
            { title: "Internal Knowledge" },
            { title: "Competition Results" },
          ],
        },
      ],
      footerNote:
        "Connects to authoritative athlete profiles and essential third-party performance feeds.",
    },
    timeline: [
      {
        title: "H1: Now",
        description: "Secure logins, explicit consent capture, and trusted reporting dashboards.",
        tone: "primary" as TimelineTone,
      },
      {
        title: "Focus",
        description: "Stabilise core workflows and make data entry effortless for staff and athletes.",
        tone: "neutral" as TimelineTone,
      },
      {
        title: "Outcome",
        description: "Every decision is backed by a single source of truth for athlete status.",
        tone: "accent" as TimelineTone,
      },
    ],
  },
  h2: {
    label: "Horizon 2",
    short: "Expansion",
    summary:
      "Layer richer automation and retrieval-augmented intelligence on top of the trusted core.",
    diagram: {
      title: "Performance Hub · Scaling intelligence",
      caption:
        "Blend multi-modal data capture with responsive knowledge retrieval to improve coaching decisions.",
      clusters: [
        {
          title: "Experience Layer",
          tone: "primary" as const,
          items: [
            { title: "Dynamic Dashboards" },
            { title: "Scenario Planning" },
            { title: "On-demand Briefings" },
          ],
        },
        {
          title: "Intelligence Core",
          tone: "accent" as const,
          items: [
            { title: "RAG Retrieval" },
            { title: "Vector Store" },
            { title: "Knowledge Graph" },
          ],
        },
        {
          title: "Data Expansion",
          tone: "neutral" as const,
          items: [
            { title: "Wearables & Video" },
            { title: "Competition APIs" },
            { title: "Training Loads" },
          ],
        },
      ],
      footerNote:
        "Automated ingestion and retrieval pipelines unlock faster answers for coaches and practitioners.",
    },
    timeline: [
      {
        title: "H2: 6-12 Months",
        description: "Add automated RAG flows, improved data quality signals, and multi-modal capture.",
        tone: "primary" as TimelineTone,
      },
      {
        title: "Focus",
        description: "Shorten time-to-insight by surfacing relevant knowledge directly in workflows.",
        tone: "neutral" as TimelineTone,
      },
      {
        title: "Outcome",
        description: "Practitioners explore deeper insights with confidence in provenance and consent status.",
        tone: "accent" as TimelineTone,
      },
    ],
  },
  h3: {
    label: "Horizon 3",
    short: "Transformation",
    summary:
      "Orchestrate autonomous analysis, predictive intelligence, and continuous data ecosystems.",
    diagram: {
      title: "Performance Hub · Full ecosystem",
      caption:
        "Real-time orchestration keeps the consented athlete view current while AI agents propose actions.",
      clusters: [
        {
          title: "Experience Layer",
          tone: "primary" as const,
          items: [
            { title: "Adaptive Dashboards" },
            { title: "AI Coaching Copilot" },
            { title: "Instant Reporting" },
          ],
        },
        {
          title: "Autonomy Core",
          tone: "accent" as const,
          items: [
            { title: "Reasoning Agents" },
            { title: "Simulation Engine" },
            { title: "Proactive Alerts" },
          ],
        },
        {
          title: "Connected Data",
          tone: "neutral" as const,
          items: [
            { title: "Global Data Mesh" },
            { title: "Federated Sources" },
            { title: "Streaming Pipelines" },
          ],
        },
      ],
      footerNote:
        "Closed-loop integrations trigger playbooks automatically while maintaining compliance.",
    },
    timeline: [
      {
        title: "H3: 1+ Years",
        description: "AI-first operations with continuous data orchestration and predictive insights.",
        tone: "primary" as TimelineTone,
      },
      {
        title: "Focus",
        description: "Empower teams with autonomous recommendations and scenario testing.",
        tone: "neutral" as TimelineTone,
      },
      {
        title: "Outcome",
        description: "Performance Hub becomes a proactive partner driving medal-winning decisions.",
        tone: "accent" as TimelineTone,
      },
    ],
  },
} satisfies Record<string, {
  label: string;
  short: string;
  summary: string;
  diagram: Parameters<typeof HorizonDiagram>[0];
  timeline: { title: string; description: string; tone: TimelineTone }[];
}>;

export default function Index() {
  const [activeHorizon, setActiveHorizon] = useState<HorizonKey>("h1");
  const selected = HORIZON_DATA[activeHorizon];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
            UK Sport Framework
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Three Horizons Framework
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tab through the evolution of the Performance Hub and see how each horizon builds on the
            last with a simple, consent-centred box diagram.
          </p>
        </div>

        <Tabs
          value={activeHorizon}
          onValueChange={(value) => setActiveHorizon(value as HorizonKey)}
          className="mt-12"
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

                  <div className="mt-8">
                    <HorizonDiagram
                      title={horizon.diagram.title}
                      caption={horizon.diagram.caption}
                      clusters={horizon.diagram.clusters}
                      footerNote={horizon.diagram.footerNote}
                    />
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
  );
}
