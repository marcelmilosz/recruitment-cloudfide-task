import { Outlet } from "react-router-dom";
import { TreeSidebar } from "../components/Tree/TreeSidebar";

export default function Tree() {
    return (
        <div className="flex h-full bg-background overflow-hidden">
            {/* Sidebar remains full height */}
            <TreeSidebar />

            {/* Content area */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}