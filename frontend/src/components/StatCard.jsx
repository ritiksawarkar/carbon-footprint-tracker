import React from "react";

const StatCard = ({ icon, title, value, iconBg }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBg} shadow-inner`}
    >
      {icon}
    </div>
    <div>
      <div className="text-xs font-semibold text-slate-500 mb-1">{title}</div>
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  </div>
);

export default StatCard;
