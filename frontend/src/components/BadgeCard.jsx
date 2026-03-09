import React from "react";

const BadgeCard = ({ icon, title, desc, bg }) => (
  <div
    className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center min-h-[140px]`}
  >
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full mb-3 ${bg} shadow-inner`}
    >
      {icon}
    </div>
    <div className="font-bold text-base text-slate-800 mb-1">{title}</div>
    <div className="text-xs text-slate-500">{desc}</div>
  </div>
);

export default BadgeCard;
