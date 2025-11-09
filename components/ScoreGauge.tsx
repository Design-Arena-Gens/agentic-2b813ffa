"use client";

import { useMemo } from "react";

type ScoreGaugeProps = {
  score: number;
};

const bands = [
  { label: "Needs Work", from: 0, to: 49, color: "text-rose-400" },
  { label: "On Track", from: 50, to: 74, color: "text-amber-300" },
  { label: "Market Ready", from: 75, to: 89, color: "text-emerald-300" },
  { label: "Top Performer", from: 90, to: 100, color: "text-sky-300" }
];

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const activeBand = useMemo(
    () => bands.find((band) => score >= band.from && score <= band.to) ?? bands[0],
    [score]
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center shadow-xl shadow-blue-500/10">
      <div className="text-sm uppercase tracking-[0.3em] text-slate-300/70">
        Listing Power Score
      </div>
      <div className="mt-6 text-6xl font-black text-slate-50">{score}</div>
      <div className={`mt-3 text-lg font-semibold ${activeBand.color}`}>
        {activeBand.label}
      </div>
      <div className="mt-5 text-sm text-slate-300/70">
        Aim for 85+ to dominate local search. Iteratively tweak copy, pricing, and response speed.
      </div>
      <div className="mt-6 flex justify-center gap-3 text-xs text-slate-400/70">
        {bands.map((band) => (
          <span
            key={band.label}
            className={`rounded-full px-3 py-1 ${
              band.label === activeBand.label ? "bg-white/15 text-white" : "bg-white/5"
            }`}
          >
            {band.label}
          </span>
        ))}
      </div>
    </div>
  );
}
