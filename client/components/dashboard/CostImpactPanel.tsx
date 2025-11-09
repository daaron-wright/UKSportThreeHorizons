import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const STAGE_META = {
  h1: {
    label: "Horizon 1",
    copy: "Baseline integration trims manual effort and begins lowering the cost curve.",
    color: "#1d4ed8",
    point: { x: 120, y: 165 },
  },
  h2: {
    label: "Horizon 2",
    copy: "Mid-term expansion adds wellness, video, and retrieval intelligence for a sharper return.",
    color: "#0f766e",
    point: { x: 165, y: 145 },
  },
  h3: {
    label: "Horizon 3",
    copy: "Full orchestration and external insight deliver the steepest efficiency gain.",
    color: "#16a34a",
    point: { x: 210, y: 130 },
  },
} satisfies Record<string, {
  label: string;
  copy: string;
  color: string;
  point: { x: number; y: number };
}>;

type StageKey = keyof typeof STAGE_META;

const BASE_POINT = { x: 70, y: 180 };
const FUTURE_POINT = { x: 210, y: 130 };
const MANUAL_POINT = { x: 250, y: 80 };

export interface CostImpactPanelProps {
  stage: StageKey;
}

export function CostImpactPanel({ stage }: CostImpactPanelProps) {
  const meta = STAGE_META[stage];

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 bg-white/95 shadow-sm">
        <CardHeader>
          <Badge className="w-fit rounded-full bg-blue-600 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
            Cost per Medal
          </Badge>
          <CardTitle className="mt-4 text-xl text-primary">
            Integration lowers the cost curve
          </CardTitle>
          <CardDescription className="mt-3 text-sm text-slate-600">
            Tiering data by value and complexity keeps implementation focused on
            the biggest impact. As additional sources join the Performance Hub,
            the ratio of cost to medal improves dramatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4 text-sm text-slate-600">
            <div>
              <dt className="font-semibold text-primary">Ease of use</dt>
              <dd className="mt-1">
                New inputs may require fresh capture methods. Starting with
                trusted datasets keeps onboarding light before layering richer
                streams.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-primary">Impact</dt>
              <dd className="mt-1">
                Each horizon adds sources with greater influence on medal
                expectancy, letting teams target effort where it matters.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-primary">Cost per medal</dt>
              <dd className="mt-1">
                Baseline costs shrink as automation, external insight, and
                telemetry combine, creating a step-change versus a manual
                future.
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Cost vs impact projection</CardTitle>
          <CardDescription className="text-sm text-slate-600">
            The Performance Hub flattens the cost curve while accelerating medal
            outcomes across the horizons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-red-50 p-4">
            <svg
              viewBox="0 0 320 240"
              className="h-64 w-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              {/* Axes */}
              <line x1="40" y1="200" x2="40" y2="20" stroke="#0f172a" strokeWidth="2" />
              <polygon points="40,14 36,24 44,24" fill="#0f172a" />
              <line x1="40" y1="200" x2="290" y2="200" stroke="#0f172a" strokeWidth="2" />
              <polygon points="296,200 286,196 286,204" fill="#0f172a" />

              {/* Guide grid */}
              <line
                x1="40"
                y1="120"
                x2="290"
                y2="120"
                stroke="#cbd5f5"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="130"
                y1="200"
                x2="130"
                y2="40"
                stroke="#cbd5f5"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Manual relationship */}
              <line
                x1={BASE_POINT.x}
                y1={BASE_POINT.y}
                x2={MANUAL_POINT.x}
                y2={MANUAL_POINT.y}
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeDasharray="6 6"
              />

              {/* Performance Hub progression */}
              <line
                x1={BASE_POINT.x}
                y1={BASE_POINT.y}
                x2={meta.point.x}
                y2={meta.point.y}
                stroke={meta.color}
                strokeWidth="4"
              />
              <line
                x1={meta.point.x}
                y1={meta.point.y}
                x2={FUTURE_POINT.x}
                y2={FUTURE_POINT.y}
                stroke="#94a3b8"
                strokeWidth="3"
                strokeDasharray="5 5"
              />

              {/* Improvement arrow */}
              <line
                x1={FUTURE_POINT.x}
                y1={FUTURE_POINT.y}
                x2={FUTURE_POINT.x}
                y2={90}
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#arrowhead)"
              />

              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 6 3, 0 6" fill="#0f172a" />
                </marker>
              </defs>

              {/* Points */}
              <circle cx={BASE_POINT.x} cy={BASE_POINT.y} r="8" fill="#cf142b" />
              <text x="60" y="200" fontSize="12" fill="#0f172a">
                Today
              </text>

              <rect
                x={MANUAL_POINT.x - 6}
                y={MANUAL_POINT.y - 6}
                width="12"
                height="12"
                fill="#0f766e"
                stroke="#0f172a"
                strokeWidth="1.5"
                rx="2"
              />
              <text x="214" y="70" fontSize="12" fill="#0f172a">
                Manual future
              </text>

              <g>
                <circle
                  cx={meta.point.x}
                  cy={meta.point.y}
                  r="9"
                  fill="white"
                  stroke={meta.color}
                  strokeWidth="3"
                />
                <circle
                  cx={meta.point.x}
                  cy={meta.point.y}
                  r="4"
                  fill={meta.color}
                />
                <text x={meta.point.x - 30} y={meta.point.y - 14} fontSize="12" fill={meta.color}>
                  {meta.label}
                </text>
              </g>

              {/* Labels */}
              <text x="160" y="220" fontSize="12" fill="#0f172a">
                No. medals →
              </text>
              <text
                x="-60"
                y="16"
                fontSize="12"
                fill="#0f172a"
                transform="rotate(-90, -60, 16)"
              >
                Cost ↑
              </text>

              <text x="130" y="95" fontSize="11" fill="#94a3b8">
                Remaining improvement
              </text>
              <text x="114" y="82" fontSize="11" fill="#a3a3a3">
                Current relationship
              </text>
            </svg>
            <div className="mt-4 space-y-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#cf142b]" />
                Today baseline
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-sm border border-teal-900 bg-[#0f766e]" />
                Manual future
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                {meta.label}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100 bg-white/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Active horizon insight</CardTitle>
          <CardDescription className="text-sm text-slate-600">
            {meta.copy}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
