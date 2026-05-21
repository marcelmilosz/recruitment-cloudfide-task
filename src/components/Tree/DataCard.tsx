import type { ReactNode } from "react";
import { stylesConfig } from "../../config/styles.config";
import Icon, { type IconName } from "../Icon"; // Assuming you exported IconName from Icon.tsx

interface DataCardProps {
    label: string;
    value: ReactNode;
    icon: IconName; // Require an icon for every card
    className?: string;
}

export default function DataCard({ label, value, icon, className = "" }: DataCardProps) {
    return (
        <div className={`flex items-center gap-4 p-1.5 px-2 sm:p-4 bg-background ${stylesConfig.border.default} ${stylesConfig.borderRadius.parent} ${className}`}>

            {/* Icon */}
            <div className={`shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${stylesConfig.borderRadius.child} bg-primary/10`}>
                <Icon name={icon} variant="primary" size={24} />
            </div>

            {/* Text Content */}
            <div className="flex flex-col overflow-hidden">
                <p className="text-xs uppercase tracking-wider text-text/50 font-bold mb-0.5">
                    {label}
                </p>
                <div className="text-text font-medium truncate text-lg">
                    {value}
                </div>
            </div>
        </div>
    );
}