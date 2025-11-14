import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HorizonDetail } from "@/components/dashboard/HorizonDetail";
import { HorizonKeyNavigator } from "@/components/dashboard/HorizonKeyNavigator";
import { HorizonValueTrajectory } from "@/components/dashboard/HorizonValueTrajectory";
import type { HorizonDiagramProps } from "@/components/dashboard/HorizonDiagram";
import type { HorizonKeyNavigatorItem } from "@/components/dashboard/HorizonKeyNavigator";

type HorizonKey = keyof typeof HORIZON_DATA;

type TimelineTone = "primary" | "accent" | "neutral";

type Persona = {
  name: string;
  focus: string;
  needs: string;
};

type ValueTheme = {
  category: string;
  statement: string;
};

type OperatingModelRole = {
  title: string;
  detail: string;
  allocation?: string;
};

type PersonaTarget = {
  users: string;
  organizations: string;
  summary: string;
};

type TechnicalIntegrationRow = {
  functionalBlock: string;
  service: string;
  notes?: string;
  bom?: string[];
};

type TechnicalIntegrationTable = {
  title: string;
  rows: TechnicalIntegrationRow[];
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

type TechnicalEvolution = {
  title: string;
  description: string;
  pillars: { label: string; detail: string }[];
  diagram?: {
    src: string;
    alt: string;
  };
  integrationTable?: TechnicalIntegrationTable;
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

type OverviewMetric = {
  label: string;
  value?: string;
};

type ImpactMetric = {
  label: string;
  value?: string;
  indicator?: "up" | "steady" | "down";
};

type HorizonStage = {
  theme: "improve" | "transform" | "innovate";
  label: string;
  descriptor: string;
};

type HorizonTimelineEntry = {
  title: string;
  description: string;
  tone: TimelineTone;
};

type HorizonDataEntry = {
  label: string;
  short: string;
  summary: string;
  overview: {
    narrative: string;
    highlights: string[];
    metrics: OverviewMetric[];
  };
  valueThemes: ValueTheme[];
  impact: {
    description: string;
    metrics: ImpactMetric[];
  };
  stage: HorizonStage;
  personas: Persona[];
  personaTarget: PersonaTarget;
  operatingModel: OperatingModel;
  technicalEvolution: TechnicalEvolution;
  ui: UIEvolution;
  diagram: HorizonDiagramProps;
  timeline: HorizonTimelineEntry[];
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
    short: "Centralize & Integrate",
    summary:
      "Integrate the high-trust clinical and personal records already curated by UK Sport so the Performance Hub earns confidence from day one.",
    overview: {
      narrative:
        "Horizon 1 establishes a compliant, shared record of truth so teams can trust every dashboard and workflow from launch.",
      highlights: [
        "Consent lifecycle management across all sources.",
        "Clinical and personal records unified in the hub.",
        "Baseline dashboards mirror governed datasets.",
      ],
      metrics: [
        { label: "Manual workload drop" },
      ],
    },
    valueThemes: [
      {
        category: "Efficiency & Time Savings",
        statement: "Access, adoption, and reduced friction for frontline staff across priority squads.",
      },
      {
        category: "Productivity & Throughput",
        statement: "Minutes saved and faster turnaround as governance tasks become streamlined.",
      },
      {
        category: "Prediction & Optimisation",
        statement: "Lower admin cost and entry-level AI cues improve decision confidence.",
      },
    ],
    impact: {
      description:
        "Baseline integration trims manual effort and creates trusted data foundations for every sport and staff group.",
      metrics: [
        { label: "Ease of use", value: "High" },
        { label: "Impact", value: "Foundational" },
      ],
    },
    stage: {
      theme: "improve",
      label: "Improve",
      descriptor: "Incremental improvement",
    },
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
      diagram: {
        src: "https://cdn.builder.io/api/v1/image/assets%2F4f72be6c562a4212a4942d75695a634f%2F6d096e4be4054bbaa12f5331b27636bf?format=webp&width=1600",
        alt: "Horizon 1 operating model diagram detailing product owner, design, engineering, QA, and support roles with responsibilities.",
      },
      roles: [
        {
          title: "Product Owner",
          allocation: "Internal",
          detail:
            "Defines features, gathers feedback, tracks adoption KPIs, and manages technical resources.",
        },
        {
          title: "Product/Service Designer",
          allocation: "Project",
          detail:
            "Maps athlete, coach, and performance journeys; owns dashboards, UI flows, and visual language end to end.",
        },
        {
          title: "AI/ML Engineer",
          allocation: "Project ×2",
          detail: "Owns RAG logic and tunes prompts within the AI studio while evaluating responses.",
        },
        {
          title: "Full Stack Developer",
          allocation: "Internal ×2",
          detail: "Owns the app service and reporting layers, integrating the prompt flow endpoint.",
        },
        {
          title: "Data Engineer",
          allocation: "Project",
          detail: "Builds and maintains pipelines into SQL/blob stores; manages the data warehouse foundations.",
        },
        {
          title: "IT Support",
          allocation: "Project / Internal",
          detail: "Handles onboarding, offboarding, and level-one support during rollout and steady state.",
        },
        {
          title: "Change & Adoption",
          allocation: "Project ×2",
          detail:
            "Designs onboarding, communications, and training; tracks AR, FS, TTV; runs the Performance Hub street team.",
        },
        {
          title: "QA Engineer",
          allocation: "Project",
          detail: "Leads testing strategy, approach, and delivery for releases.",
        },
      ],
      enablers: [
        "Performance Hub governance committee",
        "Consent lifecycle management",
        "Secure medical data integration (PDMS, GMS)",
      ],
    },
    personaTarget: {
      users: "≈500 users",
      organizations: "2–3 sports organizations",
      summary:
        "Initial rollout for priority squads, performance medics, and governance leads to validate trusted collaboration patterns.",
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
    short: "Ingest",
    summary:
      "Blend richer monitoring sources—video, wellness, and training loads—with retrieval tooling to elevate impact while adoption stays manageable.",
    overview: {
      narrative:
        "Horizon 2 scales intelligence by layering video, wellness, and sensor data with retrieval so staff gain richer, faster context.",
      highlights: [
        "Video comparison strip embedded in the hub.",
        "Wellness heatmaps spotlight readiness trends.",
        "Retrieval prompts surface answers alongside each module.",
      ],
      metrics: [
        { label: "Adoption lift" },
      ],
    },
    valueThemes: [
      {
        category: "Efficiency & Time Savings",
        statement: "Workflow automation and connected systems remove handoffs between pods.",
      },
      {
        category: "Productivity & Throughput",
        statement: "Reduced rework and increased throughput as cross-discipline teams share live context.",
      },
      {
        category: "Prediction & Optimisation",
        statement: "Automation at scale delivers cross-system insight directly into coaching workflows.",
      },
    ],
    impact: {
      description:
        "Richer monitoring streams and retrieval intelligence raise campaign influence while keeping onboarding practical.",
      metrics: [
        { label: "Ease of use", value: "Managed" },
        { label: "Impact", value: "Elevating" },
      ],
    },
    stage: {
      theme: "transform",
      label: "Transform",
      descriptor: "Step-change transformation",
    },
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
    personaTarget: {
      users: "≈1,800 users",
      organizations: "10–15 sports organizations",
      summary:
        "Scaled adoption across priority Olympic and Paralympic programmes with embedded analysts and wellbeing leads.",
    },
    technicalEvolution: {
      title: "Expansion technical runway",
      description:
        "Layer tacit knowledge capture and retrieval-augmented intelligence across richer media and sensor sources.",
      diagram: {
        src: "https://cdn.builder.io/api/v1/image/assets%2F4f72be6c562a4212a4942d75695a634f%2F96e75da4396e4647a4b066d6ee08c485?format=webp&width=1200",
        alt: "System diagram illustrating Horizon 2 technical architecture, showing authentication, consent, RAG components, and data flows.",
      },
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
      integrationTable: {
        title: "Functional integration · Azure platform services",
        rows: [
          {
            functionalBlock: "UI/UX · Reporting",
            service: "Azure App Service + Power BI",
            bom: [
              "Multi-modal data input console",
              "Data quality and qualifications",
              "Interview interaction",
              "Feature / insight detail view (training monotony, readiness score, plan adherence)",
              "Athlete timeline (individual and sport)",
              "Admin insight (expanded adoption tracking)",
              "Coach workflow view (weekly review, pre-competition check)",
            ],
          },
          {
            functionalBlock: "Multi-modal Data Input",
            service: "Azure Data Factory + Azure Blob Storage",
          },
          {
            functionalBlock: "Athlete Data / Internal Knowledge",
            service: "Azure SQL Database + Blob Storage + SharePoint",
          },
          {
            functionalBlock: "RAG Retrieval",
            service: "Azure AI Search",
          },
          {
            functionalBlock: "LLM/SLM Powered Query",
            service: "Azure OpenAI Service",
          },
          {
            functionalBlock: "Orchestration",
            service: "Azure AI Studio",
          },
          {
            functionalBlock: "Model / Prompt Registry / Guardrails",
            service: "Azure AI Studio + Azure AI Content Safety",
          },
          {
            functionalBlock: "Streaming Ingestion (wearables etc.)",
            service: "Azure Event Hubs + Azure Stream Analytics",
          },
          {
            functionalBlock: "Multi-modal: Video / Interview",
            service: "Azure AI Vision + Azure AI Speech",
          },
          {
            functionalBlock: "Consent Module",
            service: "Microsoft Entra role-based access + app permissions",
          },
          {
            functionalBlock: "RAG Ingestion",
            service: "Azure Databricks",
          },
          {
            functionalBlock: "Vector Store",
            service: "Azure AI Search / Azure Cosmos DB",
          },
          {
            functionalBlock: "Graph DB",
            service: "Azure Cosmos DB / Neo4j",
          },
          {
            functionalBlock: "Integration · Data product APIs",
            service: "Azure API Management (APIM)",
          },
        ],
      },
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
    short: "Orchestrate",
    summary:
      "Orchestrate high-impact external intelligence and autonomous analysis so the Performance Hub becomes a proactive partner.",
    overview: {
      narrative:
        "Horizon 3 turns the hub into an orchestration layer combining AI agents, automation, and external intelligence for proactive support.",
      highlights: [
        "AI command bar recommends interventions with confidence tags.",
        "Automation playbooks route approvals and actions automatically.",
        "Strategic council aligns research, telemetry, and investment decisions.",
      ],
      metrics: [
        { label: "Automation coverage" },
      ],
    },
    valueThemes: [
      {
        category: "Efficiency & Time Savings",
        statement: "System-level optimisation and cost avoidance through autonomous orchestration.",
      },
      {
        category: "Productivity & Throughput",
        statement: "Avoided failures and improved forecasts thanks to proactive intelligence.",
      },
      {
        category: "Prediction & Optimisation",
        statement: "Enterprise-wide resilience and margin gains driven by predictive automation.",
      },
    ],
    impact: {
      description:
        "Autonomous orchestration and external insight deliver breakthrough efficiency and medal upside across the system.",
      metrics: [
        { label: "Ease of use", value: "Adaptive" },
        { label: "Impact", value: "Breakthrough" },
      ],
    },
    stage: {
      theme: "innovate",
      label: "Innovate",
      descriptor: "Radical innovation",
    },
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
    personaTarget: {
      users: "≈3,000 users",
      organizations: "40 sports organizations",
      summary:
        "Full-system adoption across national governing bodies, institutes, and pathway partners with advanced automation stewards.",
    },
    technicalEvolution: {
      title: "Full orchestration architecture",
      description:
        "Evolve the hub into an autonomous platform that orchestrates external intelligence, simulations, and proactive interventions.",
      diagram: {
        src: "https://cdn.builder.io/api/v1/image/assets%2F4f72be6c562a4212a4942d75695a634f%2F525e61c0e2dd42b6a7f3d972bf5b6852?format=webp&width=1200",
        alt: "Diagram of the Horizon 3 performance hub ecosystem highlighting authentication, orchestration, vector store, graph DB, and data product APIs.",
      },
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
      title: "Orchestration UI snapshot",
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
      layout: {
        type: "architecture",
        headerBands: [
          { label: "UX/UI · Reporting", tone: "primary" },
          { label: "Cross-sport benchmarking", tone: "primary" },
        ],
        capabilityStack: [
          {
            title: "Multi-modal data input · Streaming ingestion",
            detail: "Pipelines normalise video, telemetry, and research feeds",
            tone: "info",
          },
          { title: "Interview capability", detail: "Capture qualitative insight alongside data", tone: "muted" },
          {
            title: "Model / prompt registry & guardrails",
            detail: "Versioned prompts with compliance controls",
            tone: "muted",
          },
          { title: "LLM / SLM powered query", detail: "Natural language across the curated store", tone: "muted" },
        ],
        core: {
          badge: "Consent module",
          title: "Intelligence orchestration core",
          subtitle: "Data acquisition → Data attribution · matched cohorts",
          rows: [
            [
              {
                title: "Athlete data",
                detail: "Profiles, telemetry, readiness history",
                tone: "accent",
              },
              {
                title: "RAG retrieval",
                detail: "Surface contextual answers inside experiences",
                tone: "accent",
              },
              {
                title: "Graph DB",
                detail: "Connected relationships & governance trail",
                tone: "primary",
              },
            ],
            [
              {
                title: "Internal knowledge",
                detail: "Programmes, staff insight, best practice",
                tone: "accent",
              },
              {
                title: "RAG ingestion",
                detail: "Adapters harmonise multi-modal feeds",
                tone: "accent",
              },
              {
                title: "Vector store",
                detail: "Multi-modal embeddings & recall",
                tone: "primary",
              },
            ],
          ],
          callouts: [
            {
              title: "Adoption criteria",
              detail: "Feeds KPI store & executive guardrails",
              position: "top-left",
            },
            {
              title: "Permissioning",
              detail: "Writing privileges mediated via governance",
              position: "top-right",
            },
          ],
        },
        rightRail: {
          title: "R&D module",
          detail: "Partner experimentation, synthetic sandboxes, emerging models",
          items: [
            { title: "Bespoke trials" },
            { title: "Guarded feedback loops" },
          ],
        },
        integration: {
          label: "Integration · Data product APIs (read-only)",
          description: "Expose curated insight to downstream systems & partners",
          tone: "dark",
        },
        dataSources: {
          label: "3rd-party data sources · Publications, research, competition feeds",
          description: "Internal datasets & manual uploads augment the curated store",
          tone: "info",
          chips: ["Internal datasets", "Manual uploads", "Competition results"],
        },
        sideNotes: [
          {
            position: "left-top",
            title: "Authentication module",
            detail: "Purpose-based access with audit trail & step-up controls",
          },
          {
            position: "left-bottom",
            title: "Adapted procedures",
            detail: "Policies for each data source & stewardship workflows",
          },
          {
            position: "right-top",
            title: "Partnerships & alliances",
            detail: "Partner sandbox with anonymised synthetic data, policy-enforced",
          },
          {
            position: "right-bottom",
            title: "Graduated learning",
            detail: "Validated insight feeds the curated data store",
          },
        ],
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
} satisfies Record<string, HorizonDataEntry>;

export default function Index() {
  const [activeHorizon, setActiveHorizon] = useState<HorizonKey>("h1");

  const horizonKeys = Object.keys(HORIZON_DATA) as HorizonKey[];

  const navigatorItems: HorizonKeyNavigatorItem[] = horizonKeys.map((key) => {
    const horizon = HORIZON_DATA[key] as HorizonDataEntry;
    const impactMetric =
      horizon.impact.metrics.find((metric) => metric.indicator) ?? horizon.impact.metrics[0];

    return {
      key,
      label: horizon.label,
      short: horizon.short,
      summary: horizon.summary,
      stage: horizon.stage,
      overviewMetrics: horizon.overview.metrics.slice(0, 2),
      impactMetric,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Performance Hub Design Development
          </h1>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-blue-600">
            Three Horizons of Data Curation
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Tab through the horizons to see how UK Sport incrementally integrates new data sources—moving from high ease-of-use records to high-impact intelligence.
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
          <HorizonKeyNavigator
            items={navigatorItems}
            activeHorizon={activeHorizon}
            onSelectHorizon={(key) => setActiveHorizon(key as HorizonKey)}
          />
        </div>

        <div className="mt-10">
          <Tabs
            value={activeHorizon}
            onValueChange={(value) => setActiveHorizon(value as HorizonKey)}
            className="h-full"
          >
            <div className="space-y-8">
              <TabsList className="grid w-full gap-2 rounded-3xl border border-blue-100 bg-white/60 p-1 shadow-sm sm:grid-cols-3">
                {horizonKeys.map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="rounded-full border border-transparent px-6 py-2 text-sm font-semibold text-slate-600 transition data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    {HORIZON_DATA[key].label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="lg:flex-1">
                {horizonKeys.map((key) => {
                  const horizon = HORIZON_DATA[key] as HorizonDataEntry;
                  return (
                    <TabsContent key={key} value={key} className="lg:flex-1">
                      <HorizonDetail horizonKey={key} horizon={horizon} />
                    </TabsContent>
                  );
                })}
              </div>
            </div>
          </Tabs>
        </div>

        <div className="mt-16">
          <HorizonValueTrajectory />
        </div>
      </div>
    </div>
  );
}
