import { stylesConfig } from "../config/styles.config";

type TextAreaProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function TextArea({ value, onChange, placeholder = "Enter text..." }: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-64 p-4 ${stylesConfig.borderRadius.orphan} bg-surface ${stylesConfig.border.default} focus:border-primary focus:outline-none text-text`}
        />
    );
}