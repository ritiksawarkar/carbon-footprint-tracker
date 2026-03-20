import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Sparkles } from "lucide-react";

const statusTone = {
    emerald: {
        text: "text-emerald-700",
        bg: "bg-emerald-100",
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    amber: {
        text: "text-amber-700",
        bg: "bg-amber-100",
        badge: "border-amber-200 bg-amber-50 text-amber-700",
    },
    rose: {
        text: "text-rose-700",
        bg: "bg-rose-100",
        badge: "border-rose-200 bg-rose-50 text-rose-700",
    },
};

const HeroSection = ({ total, impact, topContributor, trendLabel }) => {
    const tone = statusTone[impact.tone] || statusTone.amber;

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top_right,rgba(30,41,59,0.13),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_36%),linear-gradient(160deg,#ffffff,#f8fafc)] p-6 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.75)] sm:p-8"
        >
            <div className="pointer-events-none absolute -right-14 top-8 h-44 w-44 rounded-full bg-slate-900/5 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-end">
                <div className="lg:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Carbon Storyline
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl xl:text-5xl">
                        Your Carbon Footprint is {impact.label.replace(" Impact", "")}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                        Electricity, transport, waste, and plastic patterns are combined into one weekly
                        impact signal so you can act on what matters most.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${tone.badge}`}>
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {impact.label}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            {trendLabel}
                        </span>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Total CO2</p>
                    <p className="mt-2 text-4xl font-black text-slate-900 sm:text-5xl">{total}</p>
                    <p className="text-sm font-semibold text-slate-500">kg/week</p>

                    {topContributor ? (
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                Biggest Contributor
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-800">
                                <Sparkles className={`h-4 w-4 ${tone.text}`} />
                                {topContributor.label}
                                <span className="text-slate-500">({topContributor.percentage}%)</span>
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
