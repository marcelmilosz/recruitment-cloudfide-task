import { useState } from "react";
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import { stylesConfig } from "../config/styles.config";
import { useTreeStore } from "../store/useTreeStore";

export default function Navbar() {
    const root = useTreeStore((state) => state.root);

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-md border-b border-border/50 shrink-0">

            {/* 1. Logo / App Brand */}
            <Link to="/">
                <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 ${stylesConfig.borderRadius.child} bg-primary text-static-white shadow-lg shadow-primary/20`}>
                        <Icon name="FolderTree" size={18} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-text tracking-wide hidden sm:block">
                        File<span className="text-primary">Tree</span>
                    </span>
                </div>
            </Link>

            {/* 2. Global Search (The new feature) */}
            <div className="flex-1 max-w-md mx-6">
                <GlobalSearch />
            </div>

            {/* 3. Navigation Links */}
            <nav className="flex items-center gap-2">
                <NavbarLink to="/" icon="Home">
                    Home
                </NavbarLink>

                {/* Only show Tree link if data is actually loaded */}
                {root && (
                    <NavbarLink to="/tree" icon="LayoutList">
                        Explorer
                    </NavbarLink>
                )}
            </nav>
        </header>
    );
}

// --- Sub-components ---

function GlobalSearch() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentQuery = searchParams.get("q") || "";

    // 1. Local state for what the user is currently typing
    const [inputValue, setInputValue] = useState(currentQuery);

    // 2. Track the previous URL query to detect external changes (e.g., pressing the Back button)
    const [prevQuery, setPrevQuery] = useState(currentQuery);

    // 3. Render-phase update (No useEffect!)
    // If the URL changes from outside, React will immediately update the input state 
    // before painting the screen, avoiding the cascading render.
    if (currentQuery !== prevQuery) {
        setPrevQuery(currentQuery);
        setInputValue(currentQuery);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 px-3 py-1.5 bg-surface border border-border/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all ${stylesConfig.borderRadius.parent}`}
        >
            <Icon name="Search" size={16} className="text-text/50 shrink-0" />
            <input
                type="text"
                placeholder="Search files and folders..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent text-sm text-text placeholder:text-text/30 outline-none"
            />
            {/* Small visual hint for keyboard users */}
            <kbd className="hidden sm:inline-block text-[10px] text-text/40 font-mono px-1.5 py-0.5 bg-background border border-border/50">
                ↵
            </kbd>
        </form>
    );
}

function NavbarLink({ to, icon, children }: { to: string; icon: IconName; children: React.ReactNode }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors ${stylesConfig.borderRadius.child} ` +
                // UX Polish: Premium active states using our primary/10 tint
                (isActive
                    ? "bg-primary/15 text-primary"
                    : "text-text/70 hover:bg-surface hover:text-text")
            }
        >
            <Icon name={icon} size={16} />
            <span className="hidden sm:block">{children}</span>
        </NavLink>
    );
}