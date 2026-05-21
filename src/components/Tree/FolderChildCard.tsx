import { Link } from "react-router-dom";
import Icon from "../Icon";
import { stylesConfig } from "../../config/styles.config";
import type { FileSystemNode } from "../../types/tree";
import { formatBytes } from "../../utils/treeUtils";

export default function FolderChildCard({ node }: { node: FileSystemNode }) {
    return (
        <Link
            to={`/tree/${node.path}`}
            className={`group flex flex-col items-center justify-between p-4 h-32 ${stylesConfig.borderRadius.child} ${stylesConfig.border.default} bg-background hover:bg-surface hover:border-primary/50 transition-all ${stylesConfig.animation.default_duration}`}
        >
            {/* Icon - scales up slightly on hover */}
            <div className={`mt-2 transition-transform ${stylesConfig.animation.default_duration} group-hover:scale-110 group-active:scale-95`}>
                <Icon
                    name={node.type === "folder" ? "Folder" : "File"}
                    variant={node.type === "folder" ? "folder" : "file"}
                    size={48}
                />
            </div>

            {/* Text Container */}
            <div className="w-full text-center mt-auto">
                <p className="font-medium text-text truncate px-1 text-sm">{node.name}</p>
                <p className="text-xs text-text/50 mt-0.5">
                    {node.type === "file" ? formatBytes(node.size) : `${node.children.length} items`}
                </p>
            </div>
        </Link>
    );
}