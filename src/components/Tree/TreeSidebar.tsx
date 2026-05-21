import { useTreeStore } from "../../store/useTreeStore";
import TreeItem from "./TreeItem";
import Icon from "../Icon";
import { ResetDataButton } from "../ResetDataButton";

export const TreeSidebar = ({ onClose }: { onClose?: () => void }) => {
    const root = useTreeStore((state) => state.root);

    if (!root) {
        return (
            <div className="w-full h-full bg-background p-6 flex flex-col items-center justify-center text-text/50">
                <Icon name="Database" size={32} className="mb-4 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider">No data</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-background flex flex-col overflow-hidden">

            <div className="p-4 border-b border-border/50 shrink-0 flex items-center justify-between">
                <h2 className="font-semibold text-xs uppercase tracking-wider text-text/50">
                    Explorer
                </h2>
                {/* Mobile Close Button (Hidden on Desktop) */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-1.5 -mr-1.5 text-text/50 hover:text-text rounded-md hover:bg-surface transition-colors"
                        aria-label="Close Explorer"
                    >
                        <Icon name="X" size={16} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <TreeItem node={root} />
            </div>


            <div className="p-2 w-full">
                <ResetDataButton />
            </div>
        </div>
    );
};