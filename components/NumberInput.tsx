
import React from 'react';

interface NumberInputProps {
    label: string;
    id: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, id, value, onChange, min = 1, max = 30, step = 1 }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
                {label}
            </label>
            <input
                type="number"
                id={id}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
        </div>
    );
};

export default NumberInput;
