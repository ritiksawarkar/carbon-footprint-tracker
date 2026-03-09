import React from "react";
import {
  Leaf,
  Trophy,
  User,
  Users,
  Zap,
  ChevronDown,
  Medal,
  Star,
  Bike,
  Bolt,
  Recycle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TopRankCard from "../components/TopRankCard";
import LeaderboardRow from "../components/LeaderboardRow";
import BadgeCard from "../components/BadgeCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const stats = [
  {
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    title: "Total CO₂ Saved",
    value: "2,430 kg",
    iconBg: "bg-green-50",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Active Eco Citizens",
    value: "1,250",
    iconBg: "bg-blue-50",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Average Eco Score",
    value: "74 / 100",
    iconBg: "bg-yellow-50",
  },
];

const top3 = [
  {
    rank: 2,
    name: "Priya K",
    score: 88,
    badge: "silver",
    avatar: "/avatars/priya.png",
  },
  {
    rank: 1,
    name: "Rahul Sharma",
    score: 92,
    badge: "gold",
    avatar: "/avatars/rahul.png",
  },
  {
    rank: 3,
    name: "Arjun V",
    score: 85,
    badge: "bronze",
    avatar: "/avatars/arjun.png",
  },
];

const leaderboard = [
  {
    rank: 4,
    name: "Neha Sharma",
    score: 82,
    badges: ["eco", "bike"],
    avatar: "/avatars/neha.png",
  },
  {
    rank: 5,
    name: "Arpit Gupta",
    score: 80,
    badges: ["bolt"],
    avatar: "/avatars/arpit.png",
  },
  {
    rank: 6,
    name: "Sneha Patil",
    score: 78,
    badges: ["eco", "recycle"],
    avatar: "/avatars/sneha.png",
  },
];

const badges = [
  {
    icon: <Medal className="w-6 h-6 text-green-600" />,
    title: "Eco Champion",
    desc: "Consistency for 30 days",
    bg: "bg-green-50",
  },
  {
    icon: <Bike className="w-6 h-6 text-blue-500" />,
    title: "Green Traveler",
    desc: "Low carbon commutes",
    bg: "bg-blue-50",
  },
  {
    icon: <Bolt className="w-6 h-6 text-yellow-500" />,
    title: "Energy Saver",
    desc: "Reduced power usage",
    bg: "bg-yellow-50",
  },
  {
    icon: <Recycle className="w-6 h-6 text-green-400" />,
    title: "Waste Reducer",
    desc: "Recycling milestones",
    bg: "bg-green-100",
  },
];

const LeaderboardPage = () => (
  <div className="bg-[#f8fafc] min-h-screen font-sans">
    <Navbar />
    {/* Page Header */}
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-green-600" />
          <span className="text-xs font-semibold text-green-600 tracking-widest">
            GLOBAL RANKING
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Community Leaderboard
        </h1>
        <p className="text-slate-600 max-w-lg">
          Discover the top eco-conscious users making the biggest impact in
          reducing their carbon footprint.
        </p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
          Campus Leaderboard <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
          City Leaderboard <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
    {/* Stats Cards */}
    <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </section>
    {/* Top 3 Leaderboard */}
    <section className="max-w-6xl mx-auto px-4 mb-10">
      <div className="flex flex-col md:flex-row items-end justify-center gap-6">
        <TopRankCard {...top3[0]} />
        <TopRankCard {...top3[1]} large />
        <TopRankCard {...top3[2]} />
      </div>
    </section>
    {/* Community Rankings Table */}
    <section className="max-w-4xl mx-auto px-4 mb-12">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-green-600" />
        Community Rankings
      </h2>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b text-xs font-semibold text-slate-500 bg-slate-50">
          <div className="col-span-1">RANK</div>
          <div className="col-span-4">USER</div>
          <div className="col-span-4">BADGES</div>
          <div className="col-span-3 text-right">SCORE</div>
        </div>
        {leaderboard.map((row, i) => (
          <LeaderboardRow key={i} {...row} />
        ))}
      </div>
    </section>
    {/* Badges */}
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Sustainability Achievement Badges
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <BadgeCard key={i} {...b} />
        ))}
      </div>
    </section>
    {/* CTA Section */}
    <CTASection />
    <Footer />
  </div>
);

export default LeaderboardPage;
