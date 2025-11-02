import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { FarmData, CropData, SoilData } from '../types';

interface CropRecommendationsProps {
    farmData: FarmData;
    soilData: SoilData[];
    allCrops: CropData[];
}

const CROP_CATEGORIES = ['all', 'cereals', 'vegetables', 'fruits', 'pulses', 'cash'];

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ farmData, soilData, allCrops }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const recommendedCrops = useMemo(() => {
        const lowerCaseUserState = farmData.state.toLowerCase().trim();
        let stateFilteredCrops = allCrops;

        if (lowerCaseUserState) {
            const cropsInState = allCrops.filter(crop => crop.state.toLowerCase() === lowerCaseUserState);
            if (cropsInState.length > 0) {
                stateFilteredCrops = cropsInState;
            }
        }
        
        const sortedByYield = [...stateFilteredCrops].sort((a, b) => b.yield_kg_per_ha - a.yield_kg_per_ha);

        if (activeFilter === 'all') {
            return sortedByYield.slice(0, 12);
        }

        return sortedByYield.filter(c => c.category.toLowerCase() === activeFilter);
    }, [farmData.state, allCrops, activeFilter]);

    const exportReport = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("Smart Farm Planner Pro - Report", 105, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.text("1. Farm Details", 20, 40);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Address: ${farmData.fullAddress}`, 20, 50);
        doc.text(`Land Area: ${farmData.landArea} ${farmData.areaUnit}`, 20, 57);
        doc.text(`Current Crop: ${farmData.currentCrop}`, 20, 64);

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("2. Soil Analysis", 20, 80);
        let yPos = 90;
        soilData.forEach(item => {
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`${item.name}: ${item.value} (Ideal: ${item.ideal})`, 20, yPos);
            yPos += 7;
        });

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("3. Top Crop Recommendations", 20, yPos + 10);
        yPos += 20;
        recommendedCrops.slice(0, 10).forEach((crop, index) => {
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`${index + 1}. ${crop.crop} (Yield: ${crop.yield_kg_per_ha} kg/ha)`, 20, yPos);
            yPos += 7;
        });

        doc.save('Smart_Farm_Report.pdf');
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                <i className="fas fa-magic text-green-500 mr-3"></i>AI-Powered Crop Recommendations
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Based on your location, soil analysis, climate, and market conditions.</p>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-6">
                {CROP_CATEGORIES.map(category => (
                    <button 
                        key={category}
                        onClick={() => setActiveFilter(category)} 
                        className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 text-sm sm:text-base font-medium ${activeFilter === category ? 'bg-blue-500 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedCrops.length > 0 ? recommendedCrops.map((crop, index) => (
                    <div key={crop.crop + index} className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative border-l-4 ${index === 0 ? 'border-green-500' : 'border-blue-500'}`}>
                        {index === 0 && <span className="absolute top-2 left-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold z-10">Best Match</span>}
                        <div className="flex items-center mb-3">
                            <span className="text-4xl mr-4">{crop.icon}</span>
                            <div>
                                <h3 className="font-bold text-xl text-gray-800 dark:text-white">{crop.crop}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{crop.category}</p>
                            </div>
                        </div>
                        <div className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                            <p><i className="fas fa-water mr-2 text-blue-400"></i>Water Need: <span className="font-semibold">{crop.water_need}</span></p>
                            <p><i className="fas fa-calendar-alt mr-2 text-yellow-500"></i>Season: <span className="font-semibold">{crop.season}</span></p>
                            <p><i className="fas fa-chart-line mr-2 text-green-500"></i>Yield: <span className="font-semibold">{crop.yield_kg_per_ha} kg/ha</span></p>
                        </div>
                    </div>
                )) : (
                    <p className="col-span-full text-center text-gray-600 dark:text-gray-400 py-8">No crops found for the selected category in your state. Try viewing 'All' crops for general recommendations.</p>
                )}
            </div>
            
            <div className="flex justify-center mt-10">
                <button onClick={exportReport} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300">
                    <i className="fas fa-download mr-2"></i>Export Detailed Report
                </button>
            </div>
        </div>
    );
};

export default CropRecommendations;