import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { stylesConfig } from "../../config/styles.config";
import type { FileSystemNode } from "../../types/tree";
import Icon from "../Icon";

export default function TreeItem({ node }: { node: FileSystemNode }) {
    const { "*": nodePath } = useParams();
    const isActive = nodePath === node.path;
    const isParentOfActive = nodePath?.startsWith(node.path + "/");

    // 1. Manage our open state
    const [isOpen, setIsOpen] = useState(!!isParentOfActive);

    // 2. Keep track of the previous URL path to detect changes
    const [prevNodePath, setPrevNodePath] = useState(nodePath);

    // 3. Update state DURING render if the URL changed.
    // React will immediately interrupt this render, update the state, and re-render
    // before touching the DOM. No effects, no flicker, no cascading renders!
    if (nodePath !== prevNodePath) {
        setPrevNodePath(nodePath);
        if (isParentOfActive) {
            setIsOpen(true);
        }
    }

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="select-none">
            <div className={`flex items-center py-1 px-2 ${stylesConfig.borderRadius.orphan} ${isActive ? 'bg-primary text-white' : 'hover:bg-surface text-text'}`}>
                <div className="w-6 flex justify-center items-center">
                    {node.type === "folder" ? (
                        <button onClick={handleToggle} className="cursor-pointer">
                            <Icon
                                name={isOpen ? "ChevronDown" : "ChevronRight"}
                                variant={isActive ? "default" : "folder"}
                                size={16}
                                strokeWidth={2.5}
                            />
                        </button>
                    ) : (
                        <Icon name="File" variant="file" size={16} />
                    )}
                </div>

                <Link to={`/tree/${node.path}`} className="flex-1 truncate ml-1">
                    {node.name}
                </Link>
            </div>

            {node.type === "folder" && isOpen && (
                <div className="ml-6 border-l border-border pl-2 my-1">
                    {node.children.map((child) => (
                        <TreeItem key={child.path} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}