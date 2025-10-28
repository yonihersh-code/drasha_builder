
import React from 'react';

interface SelectInputProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, id, value, onChange, options }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
