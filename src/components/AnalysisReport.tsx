import React, { useEffect, useRef } from 'react';
import { FarmData, SoilData } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AnalysisReportProps {
    farmData: FarmData;
    soilData: SoilData[];
}

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const AnalysisReport: React.FC<AnalysisReportProps> = ({ farmData, soilData }) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);
        }

        if (mapRef.current) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(farmData.fullAddress)}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0 && mapRef.current) {
                        const { lat, lon } = data[0];
                        mapRef.current.setView([lat, lon], 13);
                        L.marker([lat, lon]).addTo(mapRef.current)
                            .bindPopup(farmData.fullAddress)
                            .openPopup();
                    } else if (mapRef.current) {
                        mapRef.current.setView([20.5937, 78.9629], 5); // Fallback to India
                    }
                })
                .catch(err => {
                    console.error("Geocoding failed:", err);
                    if (mapRef.current) {
                      mapRef.current.setView([20.5937, 78.9629], 5);
                    }
                });
        }
        
        // Cleanup function
        const map = mapRef.current;
        return () => {
            if (map) {
                map.remove();
                mapRef.current = null;
            }
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [farmData.fullAddress]);


    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                <i className="fas fa-flask text-amber-500 mr-3"></i>Advanced Soil & Location Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                     <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Soil Composition Report</h3>
                    <div className="space-y-4">
                        {soilData.map(item => (
                            <div key={item.name} className={`rounded-xl p-4 flex items-center space-x-4 shadow-md ${item.color}`}>
                                <div className="p-3 rounded-full bg-white/70 dark:bg-gray-700/70">
                                    <i className={`${item.icon} ${item.textColor} text-xl w-6 text-center`}></i>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                                    <p className={`font-bold text-2xl ${item.textColor}`}>{item.value}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Ideal: {item.ideal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Precise Location Map</h3>
                    <div ref={mapContainerRef} id="map" className="shadow-xl z-0"></div>
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                        <p className="font-semibold text-gray-800 dark:text-white">{farmData.fullAddress || 'Address not provided'}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                           {`${farmData.landArea} ${farmData.areaUnit}`} | Current crop: {farmData.currentCrop}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;