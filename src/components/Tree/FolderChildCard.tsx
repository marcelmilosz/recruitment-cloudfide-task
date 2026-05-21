import { Link } from "react-router-dom";
import Icon from "../Icon";
import { stylesConfig } from "../../config/styles.config";
import type { FileSystemNode } from "../../types/tree";
import { formatBytes } from "../../utils/treeUtils";

export default function FolderChildCard({ node }: { node: FileSystemNode }) {
    return (
        <Link
            to={`/tree/${node.path}`}
            className={`flex flex-col items-center justify-center p-4 ${stylesConfig.borderRadius.child} ${stylesConfig.border.default} bg-background hover:bg-surface transition-colors gap-2 text-center`}
        >
            <Icon
                name={node.type === "folder" ? "Folder" : "File"}
                variant={node.type === "folder" ? "folder" : "file"}
                size={48}
            />
            <div className="w-full">
                <p className="font-medium text-text truncate px-2">{node.name}</p>
                <p className="text-xs text-text/50">
                    {node.type === "file" ? formatBytes(node.size) : `${node.children.length} items`}
                </p>
            </div>
        </Link>
    );
};