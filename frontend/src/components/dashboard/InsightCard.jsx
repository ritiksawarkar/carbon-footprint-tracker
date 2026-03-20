import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const InsightCard = ({ title, text }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-[0_18px_36px_-30px_rgba(16,185,129,0.7)] sm:p-6"
        >
            <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <Sparkles className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                    {title}
                </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{text}</p>
        </motion.section>
    );
};

export default InsightCard;
