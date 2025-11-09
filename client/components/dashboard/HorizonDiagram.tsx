import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "neutral";

export interface DiagramCluster {
  title: string;
  tone?: Tone;
  caption?: string;
  items: { title: string; detail?: string }[];
}

export interface HorizonDiagramProps {
  title: string;
  caption: string;
  clusters: DiagramCluster[];
  footerNote?: string;
}

const toneClasses: Record<Tone, string> = {
  primary: "border-blue-200 bg-blue-50 text-blue-900",
  accent: "border-red-200 bg-red-50 text-red-900",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function HorizonDiagram({
  title,
  caption,
  clusters,
  footerNote,
}: HorizonDiagramProps) {
  return (
    <Card className="overflow-hidden border-blue-100 shadow-md">
      <CardHeader className="bg-primary/95 text-primary-foreground">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="mt-1 text-sm text-primary-foreground/80">{caption}</p>
      </CardHeader>
      <CardContent className="space-y-6 bg-white py-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {clusters.map((cluster) => (
            <div key={cluster.title} className="space-y-3">
              <div
                className={cn(
                  "rounded-2xl border px-5 py-4",
                  toneClasses[cluster.tone ?? "neutral"],
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  {cluster.title}
                </p>
                {cluster.caption ? (
                  <p className="mt-1 text-sm font-medium opacity-80">
                    {cluster.caption}
                  </p>
                ) : null}
                <div className="mt-4 space-y-2">
                  {cluster.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-dashed border-current/40 bg-white/60 px-3 py-2 text-sm font-semibold shadow-sm"
                    >
                      <span>{item.title}</span>
                      {item.detail ? (
                        <p className="mt-1 text-xs font-medium opacity-70">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {footerNote ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-sm font-medium text-blue-900">
            {footerNote}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
