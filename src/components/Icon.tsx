import * as LucideIcons from 'lucide-react';

// 1. Add folder and file to variants
type IconVariant = 'primary' | 'secondary' | 'danger' | 'default' | 'folder' | 'file';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends LucideIcons.LucideProps {
    name: IconName;
    variant?: IconVariant;
}

// 2. Map variants to Tailwind classes
// Since you added --color-folder/file in CSS, Tailwind generates text-folder/text-file
const variantStyles: Record<IconVariant, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    danger: "text-danger",
    default: "text-text",
    folder: "text-folder",
    file: "text-file",
};

export default function Icon({ name, variant = 'default', className = "", ...props }: IconProps) {
    const LucideIcon = LucideIcons[name] as React.ElementType;

    if (!LucideIcon) return null;

    return (
        <LucideIcon
            className={`${variantStyles[variant]} ${className}`}
            {...props}
        />
    );
};