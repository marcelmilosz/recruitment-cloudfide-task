import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { TreeSidebar } from "../components/Tree/TreeSidebar";

export default function Tree() {
    const location = useLocation();

    // 1. Manage sidebar open state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 2. Track the previous URL path
    const [prevPathname, setPrevPathname] = useState(location.pathname);

    // 3. Render-phase update: Automatically close the mobile sidebar whenever the URL changes
    // No useEffect needed! This satisfies the linter and runs significantly faster.
    if (location.pathname !== prevPathname) {
        setPrevPathname(location.pathname);
        setIsSidebarOpen(false);
    }

    return (
        <div className="flex flex-col md:flex-row h-full w-full overflow-hidden relative">

            {/* --- Mobile Header Toggle --- */}
            {/* Visible ONLY on mobile. Opens the sidebar. */}
            <div className="md:hidden p-4 flex items-center shrink-0 z-10">
                <Button
                    variant="secondary"
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-full flex items-center justify-center gap-2"
                >
                    <Icon name="Menu" size={18} />
                    Open File Explorer
                </Button>
            </div>

            {/* --- Mobile Backdrop --- */}
            {/* Fades in and blocks interactions behind the sidebar */}
            <div
                className={`
                    absolute inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden
                    ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* --- Sidebar Container --- */}
            {/* Off-canvas drawer on mobile, static 64-width column on desktop */}
            <div
                className={`
                    absolute top-0 left-0 bottom-0 z-50 w-4/5 max-w-[320px] bg-background border-r border-border 
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:transform-none md:w-64 md:shrink-0
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <TreeSidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* --- Main Content Area --- */}
            <div className="flex-1 overflow-hidden min-h-0 bg-background flex flex-col">
                <Outlet />
            </div>

        </div>
    );
}