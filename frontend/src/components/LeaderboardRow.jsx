import React from "react";
import { Medal, Bike, Bolt, Recycle, Leaf } from "lucide-react";

const badgeIcons = {
  eco: <Leaf className="w-5 h-5 text-green-600" />,
  bike: <Bike className="w-5 h-5 text-blue-500" />,
  bolt: <Bolt className="w-5 h-5 text-yellow-500" />,
  recycle: <Recycle className="w-5 h-5 text-green-400" />,
};

const getAvatarUrl = (name) => {
  const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=16a34a&color=fff`;
  return { dicebear, fallback };
};

const LeaderboardRow = ({ rank, name, score, badges }) => {
  const { dicebear, fallback } = getAvatarUrl(name);
  return (
    <div className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-gray-50 transition-all">
      <div className="col-span-1 font-bold text-slate-500">#{rank}</div>
      <div className="col-span-4 flex items-center gap-3">
        <span className="w-10 h-10 rounded-full border-2 border-green-400 shadow overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-200 bg-white">
          <img
            src={dicebear}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }}
          />
        </span>
        <span className="font-medium text-slate-800">{name}</span>
      </div>
      <div className="col-span-4 flex gap-2">
        {badges &&
          badges.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 shadow-inner"
            >
              {badgeIcons[b]}
            </span>
          ))}
      </div>
      <div className="col-span-3 text-right font-bold text-green-700 text-lg">
        {score}
      </div>
    </div>
  );
};

export default LeaderboardRow;
