// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            {/* Page Content */}
            <main className="grow bg-background p-4">
                <Outlet />
            </main>

            {/* Shared Footer */}
            <footer className="bg-surface p-4 text-center text-sm text-text">
                © 2026 - Zadanie rekrutacyjne dla Cloudfide - Marcel Miłosz.
            </footer>
        </div>
    );
};