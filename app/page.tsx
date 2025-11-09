"use client";

import { useMemo, useState } from "react";
import { AgentChat } from "@/components/AgentChat";
import { InsightCard } from "@/components/InsightCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import {
  buildAgentResponse,
  listingSchema,
  type AgentResponse,
  type ListingInput
} from "@/lib/agent";
import { CATEGORY_INSIGHTS, type MarketplaceCategory } from "@/lib/categoryData";

const categories: MarketplaceCategory[] = [
  "Electronics",
  "Home & Furniture",
  "Fashion",
  "Vehicles",
  "Sports & Outdoors",
  "Appliances",
  "Toys & Games",
  "Other"
];

const audienceOptions: ListingInput["targetAudience"][] = [
  "Budget Buyers",
  "Mid-Range",
  "Premium Collectors"
];

const conditionOptions: ListingInput["condition"][] = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "Needs Repair"
];

const defaultListing: ListingInput = {
  title: "Premium Bluetooth Speaker with Deep Bass",
  description:
    "Selling my portable Bluetooth speaker with 24-hour battery life, IPX7 waterproof rating, dual sub-woofers, and party lights. Used sparingly, sounds amazing, includes retail packaging and AUX cable.",
  category: "Electronics",
  condition: "Like New",
  price: 6499,
  currency: "INR",
  location: "Mumbai",
  shippingAvailable: true,
  stockUnits: 1,
  targetAudience: "Mid-Range"
};

export default function HomePage() {
  const [formData, setFormData] = useState<ListingInput>(defaultListing);
  const [agentReport, setAgentReport] = useState<AgentResponse | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const defaultReport = useMemo(() => buildAgentResponse(defaultListing), []);

  const handleChange = <Key extends keyof ListingInput>(
    key: Key,
    value: ListingInput[Key]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = listingSchema.safeParse(formData);
    if (!parsed.success) {
      const formatted = parsed.error.issues.map((issue) => issue.message);
      setErrors(formatted);
      return;
    }
    const report = buildAgentResponse(parsed.data);
    setAgentReport(report);
    setErrors([]);
  };

  const categoryHighlights = useMemo(
    () => CATEGORY_INSIGHTS[formData.category],
    [formData.category]
  );

  return (
    <main className="flex min-h-screen flex-col gap-12 px-6 pb-16 pt-10 md:px-12 lg:px-20">
      <header className="mx-auto max-w-5xl text-center">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
          Marketplace Growth Copilot
        </span>
        <h1 className="mt-5 text-4xl font-black leading-tight text-slate-50 md:text-5xl lg:text-6xl">
          Facebook Marketplace listings ko AI ke saath boost karein
        </h1>
        <p className="mt-4 text-base text-slate-200/80 md:text-lg">
          Smart agent jo listing analyse kare, high-converting keyword tags suggest kare aur buyers
          ke saath chat strategy banaye. Bas details fill karein aur closing roadmap hasil karein.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-blue-500/10"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-100">
                Listing Intelligence Canvas
              </h2>
              <button
                type="submit"
                className="rounded-2xl bg-accent px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:scale-[1.02]"
              >
                Generate Strategy
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Listing Title
                </span>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) => handleChange("title", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
                  placeholder="Premium smartphone with fast charging..."
                />
              </label>

              <label className="md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Description
                </span>
                <textarea
                  value={formData.description}
                  onChange={(event) => handleChange("description", event.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
                  placeholder="Describe the standout features, condition, accessories, why you are selling..."
                />
              </label>

              <label>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Category
                </span>
                <select
                  value={formData.category}
                  onChange={(event) =>
                    handleChange("category", event.target.value as MarketplaceCategory)
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Condition
                </span>
                <select
                  value={formData.condition}
                  onChange={(event) =>
                    handleChange("condition", event.target.value as ListingInput["condition"])
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
                >
                  {conditionOptions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Price
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <select
                    value={formData.currency}
                    onChange={(event) =>
                      handleChange("currency", event.target.value as ListingInput["currency"])
                    }
                    className="w-24 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(event) => handleChange("price", Number(event.target.value))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
                    placeholder="6500"
                    min={0}
                  />
                </div>
              </label>

              <label>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Target Audience
                </span>
                <select
                  value={formData.targetAudience}
                  onChange={(event) =>
                    handleChange("targetAudience", event.target.value as ListingInput["targetAudience"])
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 focus:border-accent focus:outline-none"
                >
                  {audienceOptions.map((audience) => (
                    <option key={audience} value={audience}>
                      {audience}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Location
                </span>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(event) => handleChange("location", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
                  placeholder="Delhi, Mumbai, Bengaluru..."
                />
              </label>

              <label>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Stock Units
                </span>
                <input
                  type="number"
                  min={1}
                  value={formData.stockUnits}
                  onChange={(event) => handleChange("stockUnits", Number(event.target.value))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
                />
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <input
                  id="shippingAvailable"
                  type="checkbox"
                  checked={formData.shippingAvailable}
                  onChange={(event) => handleChange("shippingAvailable", event.target.checked)}
                  className="h-5 w-5 rounded border border-white/20 bg-transparent accent-accent"
                />
                <label htmlFor="shippingAvailable" className="text-sm text-slate-200">
                  Shipping / delivery offer kar sakte hain
                </label>
              </div>
            </div>

            {errors.length > 0 && (
              <ul className="mt-5 space-y-2 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-200">
                {errors.map((error) => (
                  <li key={error}>⚠️ {error}</li>
                ))}
              </ul>
            )}
          </form>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              Category Signals
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">Buyer Motivations</h3>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  {categoryHighlights.buyerMotivations.map((motivation) => (
                    <li key={motivation} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{motivation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">Trust Signals</h3>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  {categoryHighlights.trustSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-6">
            <ScoreGauge score={agentReport?.listingScore ?? defaultReport.listingScore} />

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-indigo-700/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">
                    Keyword Arsenal
                  </h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">
                    Tag strategy + hooks
                  </p>
                </div>
                {agentReport && (
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {agentReport.keywordStrategy.heroTags.length} hero tags
                  </span>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {(
                  agentReport?.keywordStrategy.heroTags ?? defaultReport.keywordStrategy.heroTags
                ).map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-100/80">
                {(
                  agentReport?.keywordStrategy.supportingTags ??
                  defaultReport.keywordStrategy.supportingTags
                ).map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200/70">
                {(
                  agentReport?.keywordStrategy.hashtags ?? defaultReport.keywordStrategy.hashtags
                ).map(
                  (tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1">
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="mt-5 rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Listing Hook
                </span>
                <p className="mt-2 text-slate-100">
                  {agentReport?.keywordStrategy.copyHook ?? defaultReport.keywordStrategy.copyHook}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {(agentReport?.salesBlueprint ?? defaultReport.salesBlueprint).map(
                (insight, index) => (
                  <InsightCard key={insight.headline} insight={insight} index={index} />
                )
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-slate-100">Action Queue</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-200">
                {(agentReport?.nextSteps ?? defaultReport.nextSteps).map(
                  (step) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/30 text-xs font-bold text-primary">
                        ✓
                      </span>
                      <span>{step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <AgentChat listing={agentReport ? formData : null} />
        </div>
      </section>

      <footer className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-xs text-slate-300">
        Built as an on-demand revenue co-pilot for Facebook Marketplace sellers. Optimise your
        listings, respond faster, and close more deals with keyword intelligence.
      </footer>
    </main>
  );
}
