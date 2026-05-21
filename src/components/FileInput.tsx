import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { stylesConfig } from "../config/styles.config";
import Icon from './Icon';

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

    // The missing function needed for clicking to upload
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);

            // Reset the input value so the same file can be uploaded again if needed
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
                group w-full h-32 flex flex-col items-center justify-center cursor-pointer 
                transition-all ${stylesConfig.animation.default_duration} ${stylesConfig.borderRadius.child}
                ${isDragging
                    ? 'border-2 border-primary bg-primary/5 scale-[1.02]'
                    : `${stylesConfig.border.default_dashed} bg-background hover:bg-surface`
                }
            `}
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                accept=".json"
                className="hidden"
            />

            <div className={`p-3 rounded-full mb-2 transition-colors ${isDragging ? 'bg-primary text-static-white' : 'bg-surface group-hover:bg-primary/10 text-text/50 group-hover:text-primary'}`}>
                <Icon name={isDragging ? "Download" : "UploadCloud"} size={24} />
            </div>

            <p className="font-medium text-text">
                {isDragging ? "Drop it!" : "Upload JSON File"}
            </p>
            <p className="text-xs text-text/40 mt-1">
                Drag and drop, or click to browse
            </p>
        </div>
    );
}