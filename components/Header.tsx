import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center p-4 md:p-6 border-b border-slate-700">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                Zooz Drasha Builder
            </h1>
            <p className="text-slate-400 mt-2">Craft the perfect drasha with the power of AI</p>
        </header>
    );
};

export default Header;