// src/components/TreeSidebar.tsx

import { useTreeStore } from "../../store/useTreeStore";
import TreeItem from "./TreeItem";

export const TreeSidebar = () => {
    const root = useTreeStore((state) => state.root);

    if (!root) return <div className="p-4 text-text/50">No data loaded</div>;

    return (
        <div className="w-64 border-r border-border bg-background p-4 overflow-y-auto">
            <h2 className="font-bold text-lg mb-4 text-text">Explorer</h2>
            <TreeItem node={root} />
        </div>
    );
};