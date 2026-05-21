import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { stylesConfig } from "../../config/styles.config";
import type { FileSystemNode } from "../../types/tree";

export const TreeItem = ({ node }: { node: FileSystemNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { "*": nodePath } = useParams(); // Using wildcard path matching
    const isActive = nodePath === node.path;

    // Toggle expansion logic
    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent this from triggering navigation if it were inside a link
        setIsOpen(!isOpen);
    };

    return (
        <div className="select-none">
            <div className={`flex items-center py-1 px-2 ${stylesConfig.borderRadius.orphan} ${isActive ? 'bg-primary text-white' : 'hover:bg-surface text-text'}`}>

                {/* 1. The Arrow (Toggle Trigger) */}
                <div className="w-6 flex justify-center">
                    {node.type === "folder" ? (
                        <button
                            onClick={handleToggle}
                            className="cursor-pointer hover:text-primary transition-colors"
                        >
                            {isOpen ? "▼" : "▶"}
                        </button>
                    ) : (
                        <span className="text-[10px]">📄</span> // Icon for file
                    )}
                </div>

                {/* 2. The Name (Navigation Trigger) */}
                <Link
                    to={`/tree/${node.path}`}
                    className="flex-1 truncate"
                >
                    {node.name}
                </Link>
            </div>

            {/* 3. Children (Render only if folder and open) */}
            {node.type === "folder" && isOpen && (
                <div className="ml-6 border-l border-border pl-2 my-1">
                    {node.children.map((child) => (
                        <TreeItem key={child.path} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};