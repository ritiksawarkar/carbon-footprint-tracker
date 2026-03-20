import React, { Suspense } from "react";
import { motion } from "framer-motion";
import InsightCard from "./InsightCard";

const ChartSection = ({ DonutChart, pieData, pieOptions, breakdown, insightTitle, insightText }) => {
    return (
        <section className="grid grid-cols-1 gap-4 2xl:grid-cols-5">
            <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.6)] sm:p-6 2xl:col-span-3"
            >
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900">Emission Breakdown</h3>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                        Category Share
                    </span>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    <div className="h-64 w-full max-w-[320px]">
                        <Suspense fallback={<div className="h-full w-full animate-pulse rounded-2xl bg-slate-100" />}>
                            <DonutChart data={pieData} options={pieOptions} />
                        </Suspense>
                    </div>

                    <div className="w-full space-y-3">
                        {breakdown.map((item) => (
                            <div
                                key={item.key}
                                className="rounded-2xl border border-slate-200/80 bg-slate-50 px-3 py-3"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <p className="text-sm font-semibold text-slate-800">{item.key}</p>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900">{item.percentage}%</p>
                                </div>
                                <div className="h-2 rounded-full bg-slate-200">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.article>

            <div className="2xl:col-span-2">
                <InsightCard title={insightTitle} text={insightText} />
            </div>
        </section>
    );
};

export default ChartSection;
