import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HorizonDiagram } from "@/components/dashboard/HorizonDiagram";
import { CostImpactPanel } from "@/components/dashboard/CostImpactPanel";
import { cn } from "@/lib/utils";

type HorizonKey = keyof typeof HORIZON_DATA;

type TimelineTone = "primary" | "accent" | "neutral";

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
    personas: [
      {
        name: "Performance Medical Lead",
        focus: "Orchestrates athlete health records and ensures duty of care across squads.",
        needs: "Unified consented view of medical history, incidents, and clearance notes.",
      },
      {
        name: "Performance Operations Manager",
        focus: "Coordinates onboarding, eligibility, and logistics for athletes and staff.",
        needs: "Reliable profiles, safeguarding flags, and document governance in one workspace.",
      },
      {
        name: "Data Governance Officer",
        focus: "Maintains compliance posture and access controls for sensitive datasets.",
        needs: "Transparent audit trails, policy references, and consent renewals tied to each record.",
      },
    ] as Persona[],
    operatingModel: {
      name: "Integrated clinical assurance",
      summary:
        "Centralise clinical records and compliance processes so frontline staff operate from a single trusted source.",
      enablers: [
        "Performance Hub governance committee",
        "Consent lifecycle management",
        "Secure medical data integration (PDMS, GMS)",
      ],
    },
    technicalEvolution: {
      title: "Launch platform stack",
      description:
        "Codify a resilient core hub with proven patterns for clinical oversight, governance, and reporting.",
      pillars: [
        {
          label: "UI/UX shell",
          detail: "Responsive athlete console with consent-aware banner states and quick task rails.",
        },
        {
          label: "Integration services",
          detail: "Secure adapters for PDMS, GMS, and manual intake with audit logging and validation flows.",
        },
        {
          label: "Reporting baseline",
          detail: "Operational dashboards and cost-per-medal tracking powered by existing data marts.",
        },
      ],
    },
    ui: {
      title: "Launch UI snapshot",
      description:
        "State-of-the-art clinical console built around clarity, reassurance, and rapid navigation of trusted records.",
      highlights: [
        "Responsive hero surface blends athlete portrait, consent signals, and critical alerts in a single adaptive band.",
        "Modular side navigation anchors universal patterns—clinic, profile, compliance—while opening detail panes in-place.",
        "Context-aware action shelf pairs primary workflows (admit, log incident) with microcopy and validation feedback.",
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
              impactLevel: "low",
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
              impactLevel: "low",
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
              title: "Injury/illness surveillance (Athlete Health Intelligence)",
              detail: "Athlete Health Intelligence tracking of injuries and illnesses via PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              impactLevel: "high",
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
              impactLevel: "low",
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
              impactLevel: "low",
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
              title: "Training plans and actuals - systemised",
              detail: "Planned sessions and workload targets authored in TeamBuildr.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "TeamBuildr",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Training plans & actuals (shared)",
              detail: "Coach-submitted plans and actuals collated via shared templates.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Training",
                system: "Multiple / Excel / Coaches",
                access: "Internal / External",
                ownership: "NGB",
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
          ],
        },
        {
          title: "Performance insight",
          tone: "accent" as const,
          caption: "Campaign metrics that influence early decision-making.",
          items: [
            {
              title: "Medal Expectancy",
              detail: "UK Sport projections modelling medal likelihood across campaigns.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.highEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Competition",
                system: "UKS",
                access: "Internal",
                ownership: "UKS",
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
            {
              title: "Staff personal details",
              detail: "Performance staff identity records governed in Entra ID.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Membership",
                system: "Entra ID (planned)",
                access: "Internal",
                ownership: "UKS",
              }),
            },
            {
              title: "Roles & permissions",
              detail: "Access rights for staff managed across GMS and PDMS.",
              status: "live" as const,
              tags: QUADRANT_TAGS.highEaseEmergingImpact,
              metadata: createMetadata({
                product: "Membership",
                system: "GMS / PDMS (Entra ID roadmap)",
                access: "Internal",
                ownership: "UKS / UKSI",
              }),
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
    personas: [
      {
        name: "National Squad Coach",
        focus: "Makes daily selection and session adjustments from evolving performance signals.",
        needs: "Side-by-side view of training loads, wellness flags, and competition context.",
      },
      {
        name: "Performance Analyst",
        focus: "Translates video, sensor, and results feeds into actionable insights for staff.",
        needs: "Searchable media, benchmarking dashboards, and retrieval tooling within the hub.",
      },
      {
        name: "Wellbeing & Lifestyle Lead",
        focus: "Supports athlete readiness and welfare through holistic monitoring.",
        needs: "Timely surveys, alerts on risk trends, and contextual notes shared with coaches.",
      },
    ] as Persona[],
    operatingModel: {
      name: "Performance intelligence pod",
      summary:
        "Blend coaching, analysis, and wellbeing functions into cross-disciplinary pods that share live insight.",
      enablers: [
        "Daily readiness stand-up",
        "Video & sensor ops rota",
        "Centralised insights backlog",
      ],
    },
    technicalEvolution: {
      title: "Expansion technical runway",
      description:
        "Layer tacit knowledge capture and retrieval-augmented intelligence across richer media and sensor sources.",
      pillars: [
        {
          label: "Knowledge capture",
          detail: "Structured coach notes, wellness logs, and tacit insights flow into shared knowledge workspaces.",
        },
        {
          label: "RAG services",
          detail: "Retrieval-augmented generation surfaces cross-source answers inside video, session, and wellness modules.",
        },
        {
          label: "Connector mesh",
          detail: "Hardened APIs for Vald, TeamBuildr, ENetPulse, and video ecosystems with monitoring & retries.",
        },
      ],
    },
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
              impactLevel: "high",
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Testing and monitoring",
              detail: "Gas consumption and physiology labs drawn from Vald Hub and AMPLIFY.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "Vald Hub / AMPLIFY",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Activity and physiology",
              detail: "Real-time load and physiology metrics streamed from wearables and AMPLIFY.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "Wearables / AMPLIFY",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Training plans and actuals - manual",
              detail: "Coach-entered plans and actuals consolidated from shared templates and spreadsheets.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "Multiple / Excel / Coaches",
                access: "Internal / External",
                ownership: "NGB",
              }),
            },
            {
              title: "Athlete screening surveys (medical, SMHAT, etc.)",
              detail: "Questionnaires capturing medical and wellbeing screenings from CheckMarket and SurveyMonkey.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
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
          title: "Session & media intelligence",
          tone: "neutral" as const,
          caption: "Higher impact formats requiring new tooling.",
          items: [
            {
              title: "Video",
              detail: "Performance versus plan clips from federation and event providers.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Competition",
                system: "Federation websites & event capture",
                access: "External",
                ownership: "NGB",
              }),
            },
            {
              title: "GB Competition results",
              detail: "Central results feed processed through ENetPulse for Team GB analysis.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Competition",
                system: "ENetPulse",
                access: "Internal",
                ownership: "UK Sport",
              }),
            },
            {
              title: "Performance vs Potential",
              detail: "Dashboards comparing performance to potential targets via UKS modelling.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "UKS",
                access: "Internal",
                ownership: "UKS",
              }),
            },
            {
              title: "Athlete profiling",
              detail: "Profiling data blended with campaign analytics to tailor coaching decisions.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Health",
                system: "Excel",
                access: "Internal",
                ownership: "NGB",
              }),
            },
          ],
        },
        {
          title: "Support services",
          tone: "neutral" as const,
          caption: "Wellbeing sources that add useful context with lighter impact.",
          items: [
            {
              title: "Psychology consultations",
              detail: "Session notes captured by the psychology team in PDMS.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
              impactLevel: "low",
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Performance Lifestyle consultations",
              detail: "Lifestyle and wellbeing discussions stored alongside athlete records.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
              impactLevel: "low",
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
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
              impactLevel: "low",
              metadata: createMetadata({
                product: "Health",
                system: "PDMS",
                access: "Internal",
                ownership: "UKSI",
              }),
            },
            {
              title: "Anthropometry",
              detail: "Baseline measurements managed across PDMS and Excel trackers.",
              status: "expanding" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
              impactLevel: "low",
              metadata: createMetadata({
                product: "Training",
                system: "PDMS / Excel",
                access: "Internal",
                ownership: "NGB / UKSI",
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
    personas: [
      {
        name: "Performance Director",
        focus: "Aligns long-term investment and campaign strategy across the Olympic cycle.",
        needs: "Forward-looking scenarios combining competitive intel, pathway depth, and AI forecasts.",
      },
      {
        name: "Research & Innovation Lead",
        focus: "Brokers partnerships with institutes and oversees applied research programmes.",
        needs: "Pipelines for external SSSM insight, bespoke studies, and knowledge capture in one place.",
      },
      {
        name: "AI Product Owner",
        focus: "Operationalises autonomous agents and orchestration workflows across the hub.",
        needs: "Telemetry feeds, governance approvals, and automation playbooks tied to measurable outcomes.",
      },
    ] as Persona[],
    operatingModel: {
      name: "Autonomous performance orchestration",
      summary:
        "Align leadership, research, and AI teams around proactive scenario planning and automation.",
      enablers: [
        "Strategic intelligence council",
        "Research translation pipeline",
        "Automation & agent governance board",
      ],
    },
    technicalEvolution: {
      title: "Full orchestration architecture",
      description:
        "Evolve the hub into an autonomous platform that orchestrates external intelligence, simulations, and proactive interventions.",
      pillars: [
        {
          label: "Orchestration fabric",
          detail: "Event-driven automation bus triggering cross-disciplinary playbooks and approvals.",
        },
        {
          label: "External intelligence",
          detail: "Competitive landscape, research feeds, and partner labs streamed into harmonised knowledge stores.",
        },
        {
          label: "AI reasoning",
          detail: "Agents, simulations, and predictive services recommending interventions with confidence scoring.",
        },
      ],
    },
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
              impactLevel: "high",
              metadata: createMetadata({
                product: "Research",
                system: "Partner institutes & laboratories",
                access: "External",
                ownership: "UKSI",
              }),
            },
            {
              title: "Competitive landscape analysis",
              detail: "Benchmark global competitors to steer campaign planning and investment.",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Competition",
                system: "Global competition analytics",
                access: "External",
                ownership: "UKS",
              }),
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
              title: "Bespoke sport sensors and DBs",
              detail: "Discipline-specific telemetry such as Nemo, track, and Bounce datasets.",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "Sport-specific systems",
                access: "Internal",
                ownership: "NGB",
              }),
            },
            {
              title: "Automation playbooks",
              detail: "Trigger workflows and staff support tasks",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseEmergingImpact,
            },
          ],
        },
        {
          title: "Performance planning orchestration",
          tone: "accent" as const,
          caption: "High-impact planning insight once orchestration is in place.",
          items: [
            {
              title: "Goals, performance requirements, gaps, plans",
              detail: "Campaign planning artefacts unified across staff to drive proactive intervention.",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Training",
                system: "Multiple / Excel / Coaches",
                access: "Internal",
                ownership: "NGB",
              }),
            },
            {
              title: "Staff health and performance knowledge",
              detail: "Unified view of staff expertise, workloads, and availability.",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Knowledge",
                system: "Staff files / shared knowledge",
                access: "Internal",
                ownership: "NGB / UKSI / UKS",
              }),
            },
          ],
        },
        {
          title: "Pathway intelligence",
          tone: "primary" as const,
          caption: "End-to-end pathway signals drive strategic decisions.",
          items: [
            {
              title: "Pathway: Basic - name, stage, results",
              detail: "Baseline pathway roster synchronised across events and competition systems.",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Athlete pathway",
                system: "Events & competitions",
                access: "Internal / External",
                ownership: "NGB",
              }),
            },
            {
              title: "Pathway: Key mental, physical and health characteristics",
              detail: "Holistic profile stitched from pathway platforms, medical notes, and staff knowledge.",
              status: "future" as const,
              tags: QUADRANT_TAGS.emergingEaseHighImpact,
              impactLevel: "high",
              metadata: createMetadata({
                product: "Athlete pathway",
                system: "Multiple pathway systems",
                access: "Internal / External",
                ownership: "Multiple",
              }),
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
  personas: Persona[];
  operatingModel: OperatingModel;
  technicalEvolution: TechnicalEvolution;
  diagram: Parameters<typeof HorizonDiagram>[0];
  ui: UIEvolution;
  timeline: { title: string; description: string; tone: TimelineTone }[];
}>;

export default function Index() {
  const [activeHorizon, setActiveHorizon] = useState<HorizonKey>("h1");
  const [navOpen, setNavOpen] = useState(false);

  const horizonKeys = Object.keys(HORIZON_DATA) as HorizonKey[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
            UKSport 2025
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Athlete Hub Design Development
          </h1>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-blue-600">
            Three Horizons Data Integration
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Tab through the horizons to see how UK Sport incrementally integrates new data sources—
            moving from high ease-of-use records to high-impact intelligence.
          </p>
          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
            <span className="sr-only">UK Sport collaborating with Kyndryl</span>
            <div className="flex items-center gap-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F4f72be6c562a4212a4942d75695a634f%2F2db63ce22751490b8ed796320fca4e46?format=webp&width=400"
                alt="UK Sport logo"
                className="h-10 w-auto"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F4f72be6c562a4212a4942d75695a634f%2F47312d90edaa41d287352749b78535de?format=webp&width=400"
                alt="Kyndryl logo"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs
            value={activeHorizon}
            onValueChange={(value) => setActiveHorizon(value as HorizonKey)}
            className="h-full"
          >
            <div
              className={cn(
                "lg:grid lg:items-start lg:gap-10",
                navOpen ? "lg:grid-cols-[minmax(0,16rem)_1fr]" : "lg:grid-cols-[minmax(0,6rem)_1fr]",
              )}
            >
              <div className="flex justify-center lg:block lg:sticky lg:top-24">
                <div className="w-full max-w-xs lg:max-w-none">
                  <button
                    type="button"
                    onClick={() => setNavOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-3xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200"
                    aria-expanded={navOpen}
                    aria-controls="horizon-nav"
                  >
                    <span>Horizons</span>
                    <span
                      aria-hidden
                      className={cn("ml-3 text-xs transition-transform", navOpen ? "rotate-180" : "rotate-0")}
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    id="horizon-nav"
                    className={cn(
                      "grid gap-1 overflow-hidden transition-[margin,max-height,opacity] duration-300",
                      navOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <TabsList
                      className={cn(
                        "grid gap-2 rounded-3xl border border-blue-100 bg-white/90 p-2 shadow-sm sm:grid-cols-3 lg:grid-cols-1",
                        navOpen ? "pointer-events-auto" : "pointer-events-none",
                      )}
                    >
                      {(Object.keys(HORIZON_DATA) as HorizonKey[]).map((key) => (
                        <TabsTrigger
                          key={key}
                          value={key}
                          className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-600 transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground lg:w-full lg:text-base"
                        >
                          {HORIZON_DATA[key].label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-10 lg:mt-0">
                {(Object.keys(HORIZON_DATA) as HorizonKey[]).map((key) => {
                  const horizon = HORIZON_DATA[key];
                  return (
                    <TabsContent key={key} value={key} className="space-y-10">
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
                      {horizon.personas.length ? (
                        <section className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-sm">
                          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                                Core users in focus
                              </p>
                              <h3 className="mt-1 text-xl font-semibold text-primary">
                                Personas guiding research & platform design
                              </h3>
                            </div>
                            <Badge className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                              Horizon personas
                            </Badge>
                          </header>
                          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {horizon.personas.map((persona) => (
                              <article
                                key={persona.name}
                                className="flex h-full flex-col justify-between rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm"
                              >
                                <div>
                                  <h4 className="text-base font-semibold text-primary">{persona.name}</h4>
                                  <p className="mt-2 text-sm text-slate-600">{persona.focus}</p>
                                </div>
                                <div className="mt-4 rounded-xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900">
                                  <p className="font-semibold uppercase tracking-[0.22em] text-blue-700">
                                    Key needs
                                  </p>
                                  <p className="mt-2 text-sm text-blue-900/90">{persona.needs}</p>
                                </div>
                              </article>
                            ))}
                          </div>
                        </section>
                      ) : null}

                      <section className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-sm">
                        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                              Target operating model
                            </p>
                            <h3 className="mt-1 text-xl font-semibold text-primary">
                              {horizon.operatingModel.name}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                              {horizon.operatingModel.summary}
                            </p>
                          </div>
                          <Badge className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                            Operating model
                          </Badge>
                        </header>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {horizon.operatingModel.enablers.map((enabler) => (
                            <div
                              key={enabler}
                              className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4 text-sm text-blue-900"
                            >
                              {enabler}
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-sm">
                        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                              Technical evolution
                            </p>
                            <h3 className="mt-1 text-xl font-semibold text-primary">
                              {horizon.technicalEvolution.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                              {horizon.technicalEvolution.description}
                            </p>
                          </div>
                          <Badge className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                            Platform stack
                          </Badge>
                        </header>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                          {horizon.technicalEvolution.pillars.map((pillar) => (
                            <article
                              key={pillar.label}
                              className="rounded-2xl border border-blue-100/80 bg-blue-50/60 p-4"
                            >
                              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                                {pillar.label}
                              </h4>
                              <p className="mt-2 text-sm text-blue-900/90">{pillar.detail}</p>
                            </article>
                          ))}
                        </div>
                      </section>

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
            </div>
          </div>
        </Tabs>
        </div>
      </div>
    </div>
  );
}
