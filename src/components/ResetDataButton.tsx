import { useNavigate } from "react-router-dom";
import { useTreeStore } from "../store/useTreeStore";
import { APP_PATHS } from "../config/paths.config";
import Button from "./Button";
import Icon from "./Icon";

export const ResetDataButton = () => {
    const clearRoot = useTreeStore((state) => state.clearRoot);
    const root = useTreeStore((state) => state.root);
    const navigate = useNavigate(); // 1. Initialize the navigator

    // If there is no data, don't show the button at all
    if (!root) return null;

    const handleClear = () => {
        // Simple browser confirmation to prevent accidental clicks
        if (window.confirm("Are you sure you want to delete all saved data? This action cannot be undone.")) {
            clearRoot();

            // 2. Navigate to Home instead of hard reloading the page
            navigate(APP_PATHS.HOME);
        }
    };

    return (
        <Button
            variant="danger"
            onClick={handleClear}
            className="px-3 py-1.5 w-full"
        >
            <Icon name="Trash2" size={16} />
            <span>Reset Data</span>
        </Button>
    );
};