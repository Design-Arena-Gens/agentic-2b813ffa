import { type AgentInsight } from "@/lib/agent";

type InsightCardProps = {
  insight: AgentInsight;
  index: number;
};

export function InsightCard({ insight, index }: InsightCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-accent/60 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Play #{index + 1}
        </span>
        <h3 className="text-lg font-semibold text-slate-50">{insight.headline}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-200/80">{insight.insight}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
        {insight.actionItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
