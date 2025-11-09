import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function CostImpactPanel() {
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
              className="h-60 w-full"
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

              {/* Relationships */}
              <line
                x1="70"
                y1="180"
                x2="250"
                y2="80"
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <line x1="70" y1="180" x2="210" y2="130" stroke="#1d4ed8" strokeWidth="3" />
              <line x1="210" y1="130" x2="250" y2="80" stroke="#16a34a" strokeWidth="3" />

              {/* Improvement arrow */}
              <line
                x1="210"
                y1="130"
                x2="210"
                y2="90"
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
              <circle cx="70" cy="180" r="8" fill="#cf142b" />
              <text x="60" y="200" fontSize="12" fill="#0f172a">
                Today
              </text>

              <path
                d="M248 74 L262 74 L262 88 L248 88 Z"
                fill="#0f766e"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
              <text x="230" y="70" fontSize="12" fill="#0f172a">
                Manual future
              </text>

              <line
                x1="204"
                y1="124"
                x2="216"
                y2="136"
                stroke="#1d4ed8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="204"
                y1="136"
                x2="216"
                y2="124"
                stroke="#1d4ed8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text x="170" y="118" fontSize="12" fill="#0f172a">
                Performance Hub
              </text>

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

              <text x="220" y="150" fontSize="11" fill="#1d4ed8">
                Improvement in cost per medal
              </text>
              <text x="114" y="90" fontSize="11" fill="#16a34a">
                Current relationship
              </text>
            </svg>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#cf142b]" />
                Today baseline
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-sm border border-teal-900 bg-[#0f766e]" />
                Manual future
              </div>
              <div className="flex items-center gap-2">
                <span className="relative h-3 w-3">
                  <span className="absolute inset-0 rotate-45 border-b-2 border-l-2 border-blue-600" />
                  <span className="absolute inset-0 -rotate-45 border-b-2 border-l-2 border-blue-600" />
                </span>
                Performance Hub
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
