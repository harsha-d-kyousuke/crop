import React from 'react';

interface WelcomeProps {
    onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white p-8 animate-fade-in">
            <div className="max-w-3xl w-full">
                <div className="flex items-center gap-4 mb-6">
                    <i className="fas fa-moon text-3xl text-gray-400"></i>
                    <i className="fas fa-seedling text-3xl text-green-400"></i>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-2 text-gray-100 tracking-tight">Smart Farm Planner Pro</h1>
                <p className="text-xl text-gray-300 mb-4">AI-Powered Soil Analysis & Crop Selection</p>
                <p className="text-lg text-gray-400 max-w-2xl mb-8">
                    Leverage cutting-edge AI to analyze your farm's potential, get tailored crop recommendations from a database of over 999+ options, and chat with an agricultural expert.
                </p>
                <button 
                    onClick={onStart} 
                    className="bg-transparent text-purple-300 px-8 py-3 rounded-lg font-semibold border border-purple-400 hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                    <i className="fas fa-rocket mr-2"></i>Start Planning
                </button>
            </div>
        </div>
    );
};

export default Welcome;