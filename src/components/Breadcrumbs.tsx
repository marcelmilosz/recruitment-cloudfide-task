import { Link } from "react-router-dom";
import { stylesConfig } from "../config/styles.config";
import { useTreeStore } from "../store/useTreeStore";
import Icon from "./Icon";

export default function Breadcrumbs({ path }: { path: string }) {
    const segments = path.split("/");
    const findNode = useTreeStore((state) => state.findNode);

    return (
        <nav className="flex items-center gap-2 mb-4 text-sm text-text/70" aria-label="Breadcrumb">
            {segments.map((segment, index) => {
                const fullPath = segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;
                const node = findNode(fullPath);

                return (
                    <div key={fullPath} className="flex items-center gap-2">
                        {index > 0 && <span className="text-text/30">/</span>}

                        {/* Show Icon only on the last segment */}
                        {isLast && node && (
                            <Icon
                                name={node.type === "folder" ? "Folder" : "File"}
                                variant={node.type === "folder" ? "folder" : "file"}
                                size={14}
                            />
                        )}

                        {isLast ? (
                            <span className="font-semibold text-text">
                                {segment}
                            </span>
                        ) : (
                            <Link
                                to={`/tree/${fullPath}`}
                                className={`hover:text-primary transition-colors ${stylesConfig.animation.default_duration}`}
                            >
                                {segment}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};