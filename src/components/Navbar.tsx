import { useState } from "react";
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import { stylesConfig } from "../config/styles.config";
import { useTreeStore } from "../store/useTreeStore";
import { APP_PATHS } from "../config/paths.config";

export default function Navbar() {
    const root = useTreeStore((state) => state.root);

    return (
        <header className="sticky top-0 z-50 flex gap-2 items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/50 shrink-0">

            {/* 1. Left Section: Logo (Flex-1, Align Left) */}
            <div className="flex-1 flex justify-start">
                <Link to={APP_PATHS.HOME}>
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 ${stylesConfig.borderRadius.child} bg-primary text-static-white shadow-lg shadow-primary/20`}>
                            <Icon name="FolderTree" size={18} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-text tracking-wide hidden sm:block">
                            File<span className="text-primary">Tree</span>
                        </span>
                    </div>
                </Link>
            </div>

            {/* 2. Center Section: Search (Flex-1, Align Center) */}
            <div className="flex-2 flex justify-center">
                <GlobalSearch />
            </div>

            {/* 3. Right Section: Navigation (Flex-1, Align Right) */}
            <nav className="flex-1 flex justify-end items-center gap-2">
                <NavbarLink to={APP_PATHS.HOME} icon="Home">
                    Home
                </NavbarLink>

                {root && (
                    <NavbarLink to={APP_PATHS.TREE} icon="LayoutList">
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

    // 3. Render-phase update 
    // If the URL changes from outside, React will immediately update the input state 
    // before painting the screen, avoiding the cascading render.
    if (currentQuery !== prevQuery) {
        setPrevQuery(currentQuery);
        setInputValue(currentQuery);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            navigate(`${APP_PATHS.SEARCH}?q=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex md:w-100 items-center gap-2 px-3 py-1.5 bg-surface border border-border/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all ${stylesConfig.borderRadius.parent}`}
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