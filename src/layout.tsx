
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Icon from "./components/Icon";

export default function Layout() {
    return (
        // 1. h-[100dvh] is crucial for mobile! It respects the dynamic address bar size.
        // 2. overflow-hidden on the root prevents the whole page from "rubber-banding".
        <div className="h-dvh flex flex-col overflow-hidden bg-background">
            <Navbar />

            {/* 3. The main tag MUST have overflow-y-auto so inner pages like Home can scroll */}
            <main className="flex-1 flex flex-col overflow-y-auto relative">
                <Outlet />
            </main>

            <footer className="bg-surface/50 border-t border-border/50 py-3 px-6 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text/50 backdrop-blur-sm transition-all z-10">
                {/* Left side: Copyright & Context */}
                <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={14} className="opacity-70 shrink-0" />
                    <span>© 2026</span>
                    <span className="hidden sm:inline-block opacity-30">|</span>
                    <span className="hidden sm:inline-block">
                        Zadanie rekrutacyjne dla <span className="font-semibold text-text/80">Cloudfide</span>
                    </span>
                </div>

                {/* Right side: Author Signature */}
                <div className="flex items-center gap-1.5 group">
                    <span>Stworzone przez</span>
                    <span className="font-semibold text-primary transition-colors group-hover:text-primary-hover">
                        Marcel Miłosz
                    </span>
                    <Icon
                        name="Code2"
                        size={14}
                        className="text-primary opacity-80 group-hover:scale-110 transition-transform"
                    />
                </div>
            </footer>
        </div>
    );
}