import React, { useState, useEffect, useCallback } from 'react';
import Welcome from './components/Welcome';
import FarmDetailsForm from './components/FarmDetailsForm';
import AnalysisReport from './components/AnalysisReport';
import CropRecommendations from './components/CropRecommendations';
import Chatbot from './components/Chatbot';
import Insights from './components/Insights';
import Header from './components/Header';
import { FarmData, SoilData, CropData } from './types';

type Page = 'welcome' | 'form' | 'dashboard';
type DashboardTab = 'report' | 'recommendations' | 'insights' | 'chatbot';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('welcome');
    const [dashboardTab, setDashboardTab] = useState<DashboardTab>('report');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [farmData, setFarmData] = useState<FarmData | null>(null);
    const [soilData, setSoilData] = useState<SoilData[]>([]);
    const [allCrops, setAllCrops] = useState<CropData[]>([]);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await fetch('/crop_data.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: CropData[] = await response.json();
                setAllCrops(data);
            } catch (error) {
                console.error("Failed to fetch crop data:", error);
            }
        };
        fetchCrops();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleFormSubmit = (data: FarmData) => {
        setFarmData(data);
        generateSoilReport();
        setPage('dashboard');
        setDashboardTab('report');
    };

    const generateSoilReport = () => {
        const generatedSoilData: SoilData[] = [
            { name: 'pH Level', value: (5.5 + Math.random() * 2).toFixed(1), icon: 'fas fa-vial', ideal: '6.0-7.0', color: 'bg-green-100 dark:bg-green-900/50', textColor: 'text-green-700 dark:text-green-300' },
            { name: 'Nitrogen (N)', value: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)], icon: 'fas fa-atom', ideal: 'Medium-High', color: 'bg-blue-100 dark:bg-blue-900/50', textColor: 'text-blue-700 dark:text-blue-300' },
            { name: 'Phosphorus (P)', value: `${(20 + Math.random() * 30).toFixed(0)} kg/ha`, icon: 'fas fa-fire', ideal: '25-50 kg/ha', color: 'bg-orange-100 dark:bg-orange-900/50', textColor: 'text-orange-700 dark:text-orange-300' },
            { name: 'Potassium (K)', value: `${(150 + Math.random() * 100).toFixed(0)} kg/ha`, icon: 'fas fa-bolt', ideal: '180-280 kg/ha', color: 'bg-yellow-100 dark:bg-yellow-900/50', textColor: 'text-yellow-700 dark:text-yellow-300' },
            { name: 'Organic Carbon', value: `${(0.4 + Math.random() * 0.5).toFixed(2)} %`, icon: 'fas fa-leaf', ideal: '> 0.75%', color: 'bg-purple-100 dark:bg-purple-900/50', textColor: 'text-purple-700 dark:text-purple-300' },
        ];
        setSoilData(generatedSoilData);
    };
    
    const startOver = useCallback(() => {
        setFarmData(null);
        setSoilData([]);
        setPage('welcome');
    }, []);


    const renderContent = () => {
        switch (page) {
            case 'welcome':
                return <Welcome onStart={() => setPage('form')} />;
            case 'form':
                return <FarmDetailsForm onSubmit={handleFormSubmit} allCrops={allCrops} />;
            case 'dashboard':
                if (!farmData) {
                    setPage('form');
                    return null;
                }
                return (
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <Header 
                            activeTab={dashboardTab} 
                            onTabChange={setDashboardTab} 
                            onStartOver={startOver} 
                        />
                        <main className="p-4 sm:p-6 lg:p-8">
                            {dashboardTab === 'report' && <AnalysisReport farmData={farmData} soilData={soilData} />}
                            {dashboardTab === 'recommendations' && <CropRecommendations farmData={farmData} soilData={soilData} allCrops={allCrops} />}
                            {dashboardTab === 'insights' && <Insights allCrops={allCrops} />}
                            {dashboardTab === 'chatbot' && <Chatbot />}
                        </main>
                    </div>
                );
            default:
                return <Welcome onStart={() => setPage('form')} />;
        }
    };

    return (
        <div className="relative">
             <button onClick={toggleDarkMode} className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-yellow-400">
                {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            {renderContent()}
        </div>
    );
};

export default App;