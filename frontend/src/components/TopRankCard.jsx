import React from "react";
import { Medal } from "lucide-react";

const badgeColors = {
  gold: "bg-yellow-100 border-yellow-400 text-yellow-700",
  silver: "bg-slate-100 border-slate-400 text-slate-500",
  bronze: "bg-orange-100 border-orange-400 text-orange-600",
};

const getAvatarUrl = (name) => {
  // Use DiceBear for deterministic avatars, fallback to UI Avatars
  const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=16a34a&color=fff`;
  return { dicebear, fallback };
};

const TopRankCard = ({ rank, name, score, badge, large }) => {
  let border = "border-4 border-green-400";
  if (rank === 1) border = "border-4 border-yellow-400";
  if (rank === 2) border = "border-4 border-gray-400";
  if (rank === 3) border = "border-4 border-orange-400";
  const size = rank === 1 ? "w-16 h-16" : "w-14 h-14";
  const { dicebear, fallback } = getAvatarUrl(name);
  return (
    <div
      className={`flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 ${large ? "scale-110 z-10" : ""} relative min-w-[180px] min-h-[260px] transition-all`}
    >
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${badgeColors[badge]} shadow ${large ? "text-base" : ""}`}
      >
        <Medal className="w-4 h-4 mr-1" />#{rank} {badge && badge.toUpperCase()}
      </div>
      <div
        className={`${size} rounded-full bg-slate-200 mt-6 mb-3 overflow-hidden ${border} shadow hover:scale-105 transition-transform duration-200`}
      >
        <img
          src={dicebear}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
      </div>
      <div className="font-bold text-lg text-slate-900 mb-1 text-center">
        {name}
      </div>
      <div className="bg-yellow-50 text-yellow-700 font-bold rounded-full px-4 py-1 text-lg mt-2 shadow-inner">
        ECO SCORE {score}
      </div>
    </div>
  );
};

export default TopRankCard;
