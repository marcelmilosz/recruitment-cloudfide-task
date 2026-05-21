import { useState } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import { SectionSpacer } from '../components/Other';

export default function Home() {
    const [jsonInput, setJsonInput] = useState<string>('');

    function handleSubmit() {
        try {
            const parsed = JSON.parse(jsonInput);
            console.log('Sending JSON:', parsed);
            alert('JSON sent to console!');
        } catch {
            alert('Invalid JSON format');
        }
    };

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
                    Send Data
                </Button>

                <Button onClick={() => setJsonInput('')} variant="danger">
                    Clear
                </Button>
            </div>
        </div>
    );
}