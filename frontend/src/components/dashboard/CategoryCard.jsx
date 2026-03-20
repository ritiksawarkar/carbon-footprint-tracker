import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ Icon, title, value, percentage, description, tone, barTone }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_16px_28px_-26px_rgba(15,23,42,0.65)] transition-all hover:-translate-y-0.5 hover:border-slate-300 sm:p-5"
        >
            <div className="mb-3 flex items-center justify-between gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                    <Icon className="h-5 w-5" />
                </span>
                <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{value} kg</p>
                    <p className="text-xs font-semibold text-slate-500">{percentage}% share</p>
                </div>
            </div>

            <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
            <p className="mt-1 text-xs text-slate-500">{description}</p>

            <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${barTone}`}
                    style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
            </div>
        </motion.article>
    );
};

export default CategoryCard;
