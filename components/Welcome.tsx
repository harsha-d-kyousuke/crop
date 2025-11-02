
import React from 'react';

interface WelcomeProps {
    onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
            <div className="text-center text-white px-6 animate-fade-in">
                <div className="mb-8">
                    <i className="fas fa-seedling text-6xl mb-4 text-white/90 animate-pulse"></i>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Smart Farm Planner Pro</h1>
                    <p className="text-xl md:text-2xl mb-4 opacity-90">AI-Powered Soil Analysis & Crop Selection</p>
                    <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">Leverage cutting-edge AI to analyze your farm's potential, get tailored crop recommendations from a database of over 999+ options, and chat with an agricultural expert.</p>
                </div>
                <button onClick={onStart} className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <i className="fas fa-rocket mr-2"></i>Start Planning
                </button>
            </div>
        </div>
    );
};

export default Welcome;
