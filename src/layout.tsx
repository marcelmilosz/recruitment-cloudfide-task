import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Layout() {
    return (
        // Changed to h-screen to lock the layout to the viewport
        <div className="h-screen min-h-screen flex flex-col overflow-hidden">
            <Navbar />

            {/* grow allows this to take all remaining space */}
            <main className="grow flex flex-col overflow-hidden">
                <Outlet />
            </main>

            <footer className="bg-surface p-4 text-center text-sm text-text shrink-0">
                © 2026 - Zadanie rekrutacyjne dla Cloudfide - Marcel Miłosz.
            </footer>
        </div>
    );
}