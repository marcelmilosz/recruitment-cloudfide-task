import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import { SectionSpacer } from '../components/Other';
import { useTreeStore } from '../store/useTreeStore';
import { stylesConfig } from '../config/styles.config';
import Icon from '../components/Icon';

const DEMO_JSON = JSON.stringify({
    "name": "root",
    "type": "folder",
    "children": [
        {
            "name": "src",
            "type": "folder",
            "children": [
                { "name": "index.ts", "type": "file", "size": 1024 },
                {
                    "name": "components",
                    "type": "folder",
                    "children": [{ "name": "Button.tsx", "type": "file", "size": 512 }]
                }
            ]
        },
        { "name": "package.json", "type": "file", "size": 300 }
    ]
}, null, 4);

export default function Home() {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const setRoot = useTreeStore((state) => state.setRoot);
    const root = useTreeStore((state) => state.root);
    const navigate = useNavigate();

    function handleSubmit() {
        setError(null);
        if (!jsonInput.trim()) {
            setError("Please provide some JSON data.");
            return;
        }

        try {
            const parsed = JSON.parse(jsonInput);
            setRoot(parsed);
            navigate('/tree');
        } catch {
            setError("Invalid JSON format. Please check your syntax.");
        }
    }

    function handleLoadDemo() {
        setJsonInput(DEMO_JSON);
        setError(null);
    }

    return (
        <div className="m-auto w-full max-w-2xl flex flex-col py-8 px-2 sm:px-4">

            {/* --- Hero Typography --- */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium">
                    <Icon name="Sparkles" size={14} />
                    Directory Visualization Tool
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight">
                    Explore your File Tree.
                </h1>
                <p className="text-base sm:text-lg text-text/60 max-w-xl mx-auto">
                    Upload or paste your JSON directory structure to instantly visualize, navigate, and analyze your file system in a beautiful macOS-style interface.
                </p>
            </div>

            {/* --- Main Input Card --- */}
            <div className={`w-full bg-surface border border-border/50 shadow-2xl shadow-black/20 p-5 sm:p-8 ${stylesConfig.borderRadius.parent}`}>

                <FileInput onFileLoaded={setJsonInput} />

                <SectionSpacer />

                <div className="relative">
                    <TextArea
                        value={jsonInput}
                        onChange={(val) => { setJsonInput(val); setError(null); }}
                        placeholder="Paste your raw JSON structure here..."
                    />

                    {/* Error Message */}
                    {error && (
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-3 py-2 bg-danger/10 border border-danger/30 text-danger text-sm rounded-md shadow-md backdrop-blur-md z-10">
                            <Icon name="AlertCircle" size={16} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* --- Action Buttons (Upgraded Layout) --- */}
                <div className="mt-6 flex flex-col gap-3 border-t border-border/50 pt-6">

                    {/* 1. Primary Action: Always takes full width */}
                    <Button onClick={handleSubmit} variant="primary" className="w-full py-3 text-base">
                        <Icon name="Play" size={18} />
                        {root ? "Update & Visualize" : "Visualize Tree"}
                    </Button>

                    {/* 2. Secondary Actions: Split 50/50 below the main button */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">

                        {/* Left Side: Demo or Clear */}
                        {!jsonInput ? (
                            <Button onClick={handleLoadDemo} variant="secondary" className="w-full flex-1">
                                <Icon name="Sparkles" size={16} />
                                Try Demo Data
                            </Button>
                        ) : (
                            <Button onClick={() => { setJsonInput(''); setError(null); }} variant="danger" className="w-full flex-1">
                                <Icon name="Trash2" size={16} />
                                Clear Input
                            </Button>
                        )}

                        {/* Right Side: Return to Explorer (Only shows if data exists) */}
                        {root && (
                            <Button onClick={() => navigate('/tree')} variant="secondary" className="w-full flex-1">
                                <Icon name="FolderTree" size={16} />
                                Go to Explorer
                            </Button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}