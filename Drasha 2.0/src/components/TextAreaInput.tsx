
import React from 'react';

interface TextAreaInputProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, id, value, onChange, placeholder, rows = 4 }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
        </div>
    );
};

export default TextAreaInput;
