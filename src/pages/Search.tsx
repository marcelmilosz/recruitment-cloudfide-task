import { useSearchParams, Link } from "react-router-dom";
import { useTreeStore } from "../store/useTreeStore";
import { searchNodes } from "../utils/treeUtils";
import { stylesConfig } from "../config/styles.config";
import Icon from "../components/Icon";
import { formatBytes } from "../utils/treeUtils";

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const root = useTreeStore((state) => state.root);

    // 1. STATE: If no data is loaded yet
    if (!root) {
        return (
            <div className="h-full flex items-center justify-center p-6">
                <div className={`flex flex-col items-center justify-center p-12 text-center max-w-lg w-full ${stylesConfig.borderRadius.parent} ${stylesConfig.border.default_dashed} bg-surface/30`}>
                    <div className={`w-16 h-16 flex items-center justify-center bg-background ${stylesConfig.borderRadius.child} ${stylesConfig.border.default} mb-6`}>
                        <Icon name="Database" size={32} className="text-text/50" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-2">No File Tree Loaded</h2>
                    <p className="text-text/60 mb-8">
                        You need to load a JSON directory structure before you can search through it.
                    </p>

                    {/* Action Button */}
                    <Link
                        to="/"
                        className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-static-white font-medium hover:bg-primary-hover transition-colors ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.child}`}
                    >
                        <Icon name="Home" size={18} />
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Execute search
    const results = query ? searchNodes(root, query) : [];

    return (
        <div className="h-full flex flex-col gap-4 md:gap-6 max-w-4xl mx-auto w-full px-2 sm:px-0">
            <div className="flex flex-col gap-1 md:gap-2 shrink-0">
                {/* Responsive heading sizes */}
                <h2 className="text-2xl md:text-3xl font-bold text-text">Search Results</h2>
                <p className="text-sm md:text-base text-text/60">
                    Showing results for <span className="text-primary font-semibold">"{query}"</span>
                </p>
            </div>

            {/* Reduce padding in the results list for mobile */}
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2 md:gap-3 pb-6">
                {results.length > 0 ? (
                    results.map((node) => (
                        <Link
                            key={node.path}
                            to={`/tree/${node.path}`}
                            className={`group flex items-center gap-3 md:gap-4 p-3 md:p-4 ${stylesConfig.borderRadius.child} ${stylesConfig.border.default} bg-surface hover:bg-background hover:border-primary/50 transition-all ${stylesConfig.animation.default_duration}`}
                        >
                            {/* Icon */}
                            <div className="shrink-0">
                                <Icon
                                    name={node.type === "folder" ? "Folder" : "File"}
                                    variant={node.type === "folder" ? "folder" : "file"}
                                    size={32}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-text truncate">{node.name}</h3>
                                    <span className={`text-xs text-text/40 px-2 py-0.5 bg-background ${stylesConfig.border.default} ${stylesConfig.borderRadius.full}`}>
                                        {node.type === "file" ? formatBytes(node.size) : `${node.children.length} items`}
                                    </span>
                                </div>
                                {/* Full path display */}
                                <p className={`text-xs font-mono text-text/50 truncate mt-1 group-hover:text-primary/70 transition-colors ${stylesConfig.animation.default_duration}`}>
                                    {node.path}
                                </p>
                            </div>

                            {/* Action Arrow */}
                            <Icon name="ChevronRight" size={20} className={`text-text/20 group-hover:text-primary transition-colors ${stylesConfig.animation.default_duration}`} />
                        </Link>
                    ))
                ) : (
                    /* 2. STATE: BEAUTIFUL NOT FOUND STATE */
                    <div className={`flex flex-col items-center justify-center py-20 px-4 text-center ${stylesConfig.borderRadius.parent} ${stylesConfig.border.default_dashed} bg-surface/50`}>
                        <div className={`w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 ${stylesConfig.borderRadius.child}`}>
                            <Icon name="SearchX" size={32} variant="primary" />
                        </div>

                        <h3 className="text-2xl font-bold text-text mb-2">No matches found</h3>
                        <p className="text-text/60 max-w-md mb-8">
                            We couldn't find any files or folders matching "<span className="text-text font-medium">{query}</span>". Try checking for typos or using different keywords.
                        </p>

                        {/* Action Buttons Group */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {/* Primary Action: Go Browse */}
                            <Link
                                to="/tree"
                                className={`flex items-center gap-2 px-5 py-2.5 bg-primary text-static-white font-medium hover:bg-primary-hover transition-colors ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.child}`}
                            >
                                <Icon name="FolderTree" size={18} />
                                Browse Explorer
                            </Link>

                            {/* Secondary Action: Go Home */}
                            <Link
                                to="/"
                                className={`flex items-center gap-2 px-5 py-2.5 bg-background text-text font-medium hover:bg-surface transition-colors ${stylesConfig.animation.default_duration} ${stylesConfig.border.default} ${stylesConfig.borderRadius.child}`}
                            >
                                <Icon name="Home" size={18} />
                                Go Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}