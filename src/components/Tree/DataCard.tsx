import type { ReactNode } from "react";
import { stylesConfig } from "../../config/styles.config";


interface DataCardProps {
    label: string;
    value: ReactNode;
    className?: string;
}

export default function DataCard({ label, value, className = "" }: DataCardProps) {
    return (
        <div className={`p-4 bg-background ${stylesConfig.border.default} ${stylesConfig.borderRadius.child} ${className}`}>
            <p className="text-sm uppercase tracking-wider text-primary font-bold mb-1">
                {label}
            </p>
            <div className="text-text">
                {value}
            </div>
        </div>
    );
};