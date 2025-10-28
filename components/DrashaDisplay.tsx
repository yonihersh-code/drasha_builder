import React, { useState } from 'react';

interface DrashaDisplayProps {
    drashaText: string;
    isLoading: boolean;
    error: string | null;
}

const DrashaDisplay: React.FC<DrashaDisplayProps> = ({ drashaText, isLoading, error }) => {
    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const handleCopy = () => {
        if (!drashaText) return;
        navigator.clipboard.writeText(drashaText);
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
    };

    const handleDownload = () => {
        if (!drashaText) return;
        const blob = new Blob([drashaText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'drasha.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                        <p className="text-lg">Generating your drasha...</p>
                        <p className="text-sm text-slate-400 mt-2">This may take a moment. The AI is thinking deeply.</p>
                    </div>
                </div>
            );
        }
        if (error) {
             return (
                <div className="flex justify-center items-center h-full">
                    <div className="text-center text-red-400">
                        <h3 className="text-lg font-semibold">An Error Occurred</h3>
                        <p className="text-sm mt-2">{error}</p>
                    </div>
                </div>
            );
        }
        if (drashaText) {
            return <p className="whitespace-pre-wrap">{drashaText}</p>;
        }
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-slate-500">Your drasha will appear here once generated.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/50 rounded-lg p-6 h-full" aria-live="polite">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-sky-400">Your Generated Drasha</h2>
                {drashaText && !isLoading && !error && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                        >
                            {copyButtonText}
                        </button>
                        <button
                             onClick={handleDownload}
                            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                        >
                            Download (.txt)
                        </button>
                    </div>
                )}
            </div>
            <div className="prose prose-invert max-w-none h-[calc(100%-56px)] overflow-y-auto pr-2 text-slate-300">
                {renderContent()}
            </div>
        </div>
    );
};

export default DrashaDisplay;