import React from "react";
import { useNavigate } from "react-router-dom";
import { Calculator } from "lucide-react";

const DashboardEmptyState = () => {
    const navigate = useNavigate();

    return (
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_20px_40px_-32px_rgba(15,23,42,0.65)] sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                No Carbon Snapshot Found
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Track your activity to unlock your dashboard
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                Your dashboard appears after you complete transportation, electricity, waste,
                and plastic inputs on the tracking flow.
            </p>
            <button
                type="button"
                onClick={() => navigate("/track")}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
                <Calculator className="h-4 w-4" />
                Go To Track Page
            </button>
        </section>
    );
};

export default DashboardEmptyState;
