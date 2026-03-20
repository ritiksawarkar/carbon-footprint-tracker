import React from "react";

const DashboardLoading = () => {
    return (
        <div className="space-y-5">
            <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200" />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
            </div>
        </div>
    );
};

export default DashboardLoading;
