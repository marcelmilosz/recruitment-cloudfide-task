import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { stylesConfig } from "../config/styles.config";

export default function NotFound() {
    return (
        <div className="h-full flex items-center justify-center p-6 text-center">
            <div className={`flex flex-col items-center justify-center p-12 max-w-lg w-full ${stylesConfig.borderRadius.parent} ${stylesConfig.border.default_dashed} bg-surface/30`}>

                {/* Visual Icon */}
                <div className={`w-16 h-16 flex items-center justify-center bg-danger/10 ${stylesConfig.borderRadius.child} mb-6`}>
                    <Icon name="MapPinOff" size={32} className="text-danger" />
                </div>

                {/* Typography */}
                <h1 className="text-6xl font-bold text-text mb-2 tracking-tight">404</h1>
                <h2 className="text-xl font-semibold text-text mb-4">Page not found</h2>
                <p className="text-text/60 mb-8 max-w-sm mx-auto">
                    The URL you entered doesn't exist. It might have been moved, or there is a typo in the address.
                </p>

                {/* Action */}
                <Link
                    to="/"
                    className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-static-white font-medium hover:bg-primary-hover transition-colors ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.child}`}
                >
                    <Icon name="Home" size={18} />
                    Take me Home
                </Link>

            </div>
        </div>
    );
}