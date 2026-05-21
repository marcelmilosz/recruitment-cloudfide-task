// src/components/Button.tsx
import { stylesConfig } from "../config/styles.config";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
}

export default function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {

    // 1. Tactile feedback (active:scale)
    // 2. Accessibility (focus-visible)
    // 3. Disabled states
    const baseStyles = `cursor-pointer px-5 py-2.5 text-sm font-semibold transition-all ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.child} flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background`;

    const variants = {
        // Vibrant with a subtle glow shadow
        primary: "bg-primary text-static-white hover:bg-primary-hover shadow-lg shadow-primary/20 focus-visible:ring-primary",
        // Modern secondary: matches the surface with a subtle border
        secondary: "bg-surface text-text border border-border/50 hover:bg-background hover:border-border focus-visible:ring-text/50",
        // Danger: Soft red background, becomes solid red on hover
        danger: "bg-danger/10 text-danger border border-danger/20 hover:bg-danger hover:text-static-white focus-visible:ring-danger",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};