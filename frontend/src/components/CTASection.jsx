import React from "react";

const CTASection = () => (
  <section className="max-w-5xl mx-auto px-4 mb-16">
    <div className="bg-gradient-to-tr from-green-500 to-green-400 rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Improve Your Eco Score and Climb the Leaderboard
        </h2>
        <p className="text-green-50 mb-4 max-w-md">
          Every small action counts. Log your activities today and see how you
          rank against the community.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="rounded-full bg-white text-green-700 font-bold px-7 py-3 shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg">
          Start Tracking
        </button>
        <button className="rounded-full bg-green-50 text-green-700 font-bold px-7 py-3 shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg">
          View Carbon Dashboard
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
    </div>
  </section>
);

export default CTASection;
