import { useTreeStore } from "../../store/useTreeStore";
import TreeItem from "./TreeItem";
import Icon from "../Icon";

export const TreeSidebar = () => {
    const root = useTreeStore((state) => state.root);

    // Premium empty state: Centered with an icon to reduce cognitive load
    if (!root) {
        return (
            <div className="w-64 h-full border-r border-border bg-background p-6 flex flex-col items-center justify-center text-text/50">
                <Icon name="Database" size={32} className="mb-4 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider">No data</p>
            </div>
        );
    }

    return (
        <div className="w-64 h-full border-r border-border bg-background flex flex-col overflow-hidden">
            {/* Header section: Fixed at the top, subtle bottom border to detach from scrolling content */}
            <div className="p-4 border-b border-border/50 shrink-0">
                <h2 className="font-semibold text-xs uppercase tracking-wider text-text/50">
                    Explorer
                </h2>
            </div>

            {/* Scrollable container for the tree */}
            <div className="flex-1 overflow-y-auto p-2">
                <TreeItem node={root} />
            </div>
        </div>
    );
};