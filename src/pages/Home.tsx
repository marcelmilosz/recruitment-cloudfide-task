import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import { SectionSpacer } from '../components/Other';
import { useTreeStore } from '../store/useTreeStore';

export default function Home() {
    const [jsonInput, setJsonInput] = useState<string>('');
    const setRoot = useTreeStore((state) => state.setRoot);
    const root = useTreeStore((state) => state.root);
    const navigate = useNavigate();

    function handleSubmit() {
        try {
            const parsed = JSON.parse(jsonInput);
            setRoot(parsed);
            navigate('/tree');
        } catch {
            alert('Invalid JSON format');
        }
    }

    return (
        <div className="mx-auto w-full max-w-3xl h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-text">JSON Input</h1>

            <FileInput onFileLoaded={setJsonInput} />

            <SectionSpacer />

            <TextArea
                value={jsonInput}
                onChange={setJsonInput}
                placeholder="Paste your JSON here..."
            />

            <div className="flex gap-4">
                <Button onClick={handleSubmit} variant="primary">
                    {root ? "Update Data & View" : "Load Data & View"}
                </Button>

                {root && (
                    <Button onClick={() => navigate('/tree')} variant="secondary">
                        Go to existing Tree
                    </Button>
                )}

                <Button onClick={() => setJsonInput('')} variant="danger">
                    Clear Input
                </Button>
            </div>
        </div>
    );
}