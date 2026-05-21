import { stylesConfig } from "../config/styles.config";

type TextAreaProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function TextArea({ value, onChange, placeholder = "Enter text..." }: TextAreaProps) {
    return (
        <div className="relative group">
            {/* JSON Badge */}
            <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono text-text/30 uppercase tracking-wider bg-background border-b border-l border-border/50 rounded-bl-md rounded-tr-md z-10">
                JSON
            </div>

            {/* Textarea */}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`
                    w-full h-64 p-4 font-mono text-sm leading-relaxed
                    bg-background text-text placeholder:text-text/30
                    ${stylesConfig.borderRadius.child} ${stylesConfig.border.default} 
                    focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none 
                    resize-y
                `}
                spellCheck="false"
            />
        </div>
    );
}