import { useEffect, useRef, useState } from "react";
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import { stylesConfig } from "../config/styles.config";
import { useTreeStore } from "../store/useTreeStore";
import { APP_PATHS } from "../config/paths.config";
import { searchNodes } from "../utils/treeUtils";

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
    const root = useTreeStore((state) => state.root);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentQuery = searchParams.get("q") || "";
    const [inputValue, setInputValue] = useState(currentQuery);
    const [isOpen, setIsOpen] = useState(false);

    // Calculate results (limit to 5 for UI performance)
    const results = inputValue.trim() && root ? searchNodes(root, inputValue).slice(0, 5) : [];

    // Click Outside Logic
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setIsOpen(false);
            navigate(`${APP_PATHS.SEARCH}?q=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-sm">
            <form
                onSubmit={handleSubmit}
                className={`flex items-center gap-2 px-3 py-1.5 bg-surface border border-border/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all ${stylesConfig.borderRadius.parent}`}
            >
                <Icon name="Search" size={16} className="text-text/50 shrink-0" />
                <input
                    type="text"
                    placeholder="Search files..."
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full bg-transparent text-sm text-text placeholder:text-text/30 outline-none"
                />
                <kbd className="hidden sm:inline-block text-[10px] rounded-full text-text/40 font-mono px-1.5 py-0.5 bg-background border border-border/50">
                    ↵
                </kbd>
            </form>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-2 bg-background ${stylesConfig.border.default} ${stylesConfig.borderRadius.child} shadow-xl z-50 overflow-hidden`}>
                    {results.map((node) => (
                        <Link
                            key={node.path}
                            to={APP_PATHS.treeNode(node.path)}
                            onClick={() => {
                                setIsOpen(false);
                                setInputValue("");
                            }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors border-b border-border/20 last:border-0"
                        >
                            <Icon
                                name={node.type === "folder" ? "Folder" : "File"}
                                size={16}
                                className="text-text/60"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text truncate">{node.name}</p>
                                <p className="text-[10px] text-text/40 truncate font-mono">{node.path}</p>
                            </div>
                        </Link>
                    ))}

                    {/* "View all" footer */}
                    <div className="px-4 py-2 bg-surface/50 border-t border-border/20">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                        >
                            View all results for "{inputValue}"
                        </button>
                    </div>
                </div>
            )}
        </div>
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