import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SelectInput from './components/SelectInput';
import NumberInput from './components/NumberInput';
import TextAreaInput from './components/TextAreaInput';
import DrashaDisplay from './components/DrashaDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { generateDrasha } from './services/geminiService';
import { DrashaOptions } from './types';
import { RABBI_OPTIONS, TOPIC_OPTIONS } from './constants';

const App: React.FC = () => {
    const [options, setOptions] = useState<DrashaOptions>({
        duration: 10,
        topic: TOPIC_OPTIONS[0],
        rabbi: RABBI_OPTIONS[5],
        notes: '',
    });
    const [generatedDrasha, setGeneratedDrasha] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setOptions(prev => ({
            ...prev,
            [id]: id === 'duration' ? parseInt(value, 10) : value,
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedDrasha('');
        
        try {
            const result = await generateDrasha(options);
            setGeneratedDrasha(result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setGeneratedDrasha('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 bg-grid-slate-700/[0.2] flex flex-col">
            <Header />
            <main className="container mx-auto p-4 md:p-6 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Panel */}
                    <div className="lg:col-span-1 bg-slate-800/50 rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-semibold mb-4 text-sky-400">Customize Your Drasha</h2>
                            <NumberInput
                                label="Length of Drasha (minutes)"
                                id="duration"
                                value={options.duration}
                                onChange={handleChange}
                            />
                            <SelectInput
                                label="Parasha or Chag"
                                id="topic"
                                value={options.topic}
                                onChange={handleChange}
                                options={TOPIC_OPTIONS}
                            />
                            <SelectInput
                                label="In the Style of Rabbi..."
                                id="rabbi"
                                value={options.rabbi}
                                onChange={handleChange}
                                options={RABBI_OPTIONS}
                            />
                            <TextAreaInput
                                label="Additional Notes or Themes"
                                id="notes"
                                value={options.notes}
                                onChange={handleChange}
                                placeholder="e.g., focus on kindness, community, a specific verse..."
                            />
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {isLoading ? <LoadingSpinner /> : null}
                                    {isLoading ? 'Generating...' : 'Generate Drasha'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Display Panel */}
                    <div className="lg:col-span-2">
                       <DrashaDisplay drashaText={generatedDrasha} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;