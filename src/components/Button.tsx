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

    const baseStyles = `cursor-pointer px-6 py-2 ${stylesConfig.borderRadius.orphan} font-medium ${stylesConfig.animation.default_duration} flex items-center justify-center`;

    const variants = {
        primary: "bg-primary text-static-white hover:bg-primary-hover",
        secondary: `bg-secondary text-static-white hover:bg-secondary-hover`,
        danger: `bg-danger text-static-white hover:bg-danger-hover`,
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