
import React from 'react';

type DashboardTab = 'report' | 'recommendations' | 'insights' | 'chatbot';

interface HeaderProps {
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
    onStartOver: () => void;
}

const TABS: { id: DashboardTab; label: string; icon: string }[] = [
    { id: 'report', label: 'Analysis', icon: 'fa-flask' },
    { id: 'recommendations', label: 'Crops', icon: 'fa-seedling' },
    { id: 'insights', label: 'Insights', icon: 'fa-chart-pie' },
    { id: 'chatbot', label: 'AgriBot', icon: 'fa-robot' },
];

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onStartOver }) => {
    return (
        <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <i className="fas fa-leaf text-green-500 text-2xl mr-2"></i>
                        <span className="font-bold text-lg text-gray-800 dark:text-white hidden sm:block">Farm Planner Pro</span>
                    </div>
                    <nav className="flex items-center justify-center space-x-1 sm:space-x-2 lg:space-x-4">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                <i className={`fas ${tab.icon} mr-0 sm:mr-2`}></i>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                     <button onClick={onStartOver} className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 rounded-md text-sm font-medium flex items-center">
                        <i className="fas fa-refresh mr-1"></i>
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
