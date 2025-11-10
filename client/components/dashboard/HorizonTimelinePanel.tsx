import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type TimelineItem = {
  title: string;
  description: string;
  tone: string;
};

export interface HorizonTimelinePanelProps {
  horizonLabel: string;
  summary: string;
  items: TimelineItem[];
  toneClasses: Record<string, string>;
}

export function HorizonTimelinePanel({ horizonLabel, summary, items, toneClasses }: HorizonTimelinePanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">{horizonLabel} roadmap</p>
        <p className="text-sm text-slate-600">{summary}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.title}
            className={`h-full border-2 transition hover:-translate-y-1 hover:shadow-md ${toneClasses[item.tone] ?? toneClasses.primary}`}
          >
            <CardHeader>
              <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
              <CardDescription className="text-sm text-current/80">{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
