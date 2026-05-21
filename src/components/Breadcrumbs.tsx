import { Link } from "react-router-dom";
import { stylesConfig } from "../config/styles.config";

export const Breadcrumbs = ({ path }: { path: string }) => {
    const segments = path.split("/");

    return (
        <nav className="flex items-center gap-2 mb-4 text-sm text-text/70" aria-label="Breadcrumb">
            {segments.map((segment, index) => {
                // Build the path up to this segment
                const fullPath = segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                    <div key={fullPath} className="flex items-center gap-2">
                        {index > 0 && <span className="text-text/30">/</span>}

                        {isLast ? (
                            <span className="font-semibold text-primary">
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