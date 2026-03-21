import { Brain, Calculator, LayoutDashboard, Leaf, LineChart, LogOut, Sparkles, Trophy, UserRound, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { apiFetch } from "../utils/api";

const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/track", label: "Track", icon: Calculator },
    { to: "/suggestions", label: "Suggestions", icon: Sparkles },
    { to: "/ai-advisor", label: "AI Advisor", icon: Brain },
    { to: "/simulator", label: "Simulator", icon: LineChart },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/profile", label: "Profile", icon: UserRound },
];

const navLinkClass = ({ isActive }) =>
    [
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
        isActive
            ? "bg-green-100 text-green-800"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    ].join(" ");

function Sidebar({ className = "", showClose = false, onClose, onNavigate }) {
    const handleLogout = () => {
        apiFetch("/api/auth/logout", { method: "POST" }).finally(() => {
            localStorage.removeItem("ecotrack_user");
            window.location.href = "/";
        });
    };

    return (
        <aside className={["w-64 h-full border-r border-slate-200 bg-white px-4 py-6", className].join(" ")}>
            <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between gap-2">
                    <NavLink to="/" className="flex items-center gap-2" onClick={onNavigate}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                            <Leaf className="icon-glyph-sm" />
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-green-700">EcoTrack</span>
                    </NavLink>

                    {showClose ? (
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100"
                            aria-label="Close menu"
                        >
                            <X className="icon-glyph-sm" />
                        </button>
                    ) : null}
                </div>

                <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={navLinkClass}
                                end={item.to === "/dashboard"}
                                onClick={onNavigate}
                            >
                                <Icon className="icon-glyph-sm" />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                >
                    <LogOut className="icon-glyph-sm" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
