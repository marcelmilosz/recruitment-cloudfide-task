import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { stylesConfig } from "../../config/styles.config";
import type { FileSystemNode } from "../../types/tree";
import Icon from "../Icon";

export default function TreeItem({ node }: { node: FileSystemNode }) {
    const { "*": nodePath } = useParams();

    // Determine exact match and parent-child relationship for auto-expanding
    const isActive = nodePath === node.path;
    const isParentOfActive = nodePath?.startsWith(node.path + "/");

    // 1. Manage local toggle state
    const [isOpen, setIsOpen] = useState(!!isParentOfActive);

    // 2. Track previous URL to detect navigation without side-effects (useEffect)
    const [prevNodePath, setPrevNodePath] = useState(nodePath);

    // 3. Render-phase state update: Avoids UI flicker when clicking deep links
    if (nodePath !== prevNodePath) {
        setPrevNodePath(nodePath);
        if (isParentOfActive) {
            setIsOpen(true);
        }
    }

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents the Link from firing when clicking the arrow
        setIsOpen(!isOpen);
    };

    const activeClasses = isActive
        ? "bg-primary/15 text-primary font-medium"
        : "text-text/80 hover:bg-surface hover:text-text";

    return (
        <div className="select-none">

            {/* Row Container */}
            <div className={`flex items-center py-1.5 px-2 my-0.5 transition-colors ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.orphan} ${activeClasses}`}>


                {/* Icon Container */}
                <div className="w-6 shrink-0 flex justify-center items-center">
                    {node.type === "folder" ? (
                        <button
                            onClick={handleToggle}
                            className="cursor-pointer p-0.5 rounded-md hover:bg-text/10 transition-colors"
                            aria-label={isOpen ? "Collapse folder" : "Expand folder"}
                        >
                            <Icon
                                name={isOpen ? "ChevronDown" : "ChevronRight"}
                                variant={isActive ? "primary" : "folder"}
                                size={16}
                                strokeWidth={2.5}
                            />
                        </button>
                    ) : (
                        <Icon
                            name="File"
                            variant={isActive ? "primary" : "file"}
                            size={14}
                            className={isActive ? "" : "opacity-70"}
                        />
                    )}
                </div>

                {/* Main Link */}
                <Link
                    to={`/tree/${node.path}`}
                    className="flex-1 truncate ml-1 text-sm outline-none"
                    title={node.name} // Native tooltip fallback for truncated text
                >
                    {node.name}
                </Link>
            </div>

            {/* Nested Children */}
            {node.type === "folder" && isOpen && (
                <div className="ml-3.5 border-l border-border/50 pl-2.5">
                    {node.children.map((child) => (
                        <TreeItem key={child.path} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}