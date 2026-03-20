import React from "react";
import { motion } from "framer-motion";

const ChartCard = ({ title, badge, children }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.75)] sm:p-6"
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                {badge ? (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                        {badge}
                    </span>
                ) : null}
            </div>
            {children}
        </motion.section>
    );
};

export default ChartCard;
