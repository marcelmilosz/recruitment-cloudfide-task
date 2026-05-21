import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { stylesConfig } from "../config/styles.config";

interface FileInputProps {
    onFileLoaded: (content: string) => void;
}

export default function FileInput({ onFileLoaded }: FileInputProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            onFileLoaded(content);
        };
        reader.readAsText(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
                w-full h-32 ${stylesConfig.border.default_dashed} flex flex-col items-center justify-center cursor-pointer 
                transition-colors ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.child}
                ${isDragging ? 'border-primary bg-surface/50' : 'border-border bg-surface'}
            `}
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                accept=".json"
                className="hidden"
            />
            <p className="text-text/70">
                {isDragging ? "Drop your file here" : "Click or drag JSON file here"}
            </p>
        </div>
    );
}