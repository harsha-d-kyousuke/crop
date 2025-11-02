import React, { useState } from 'react';
import { FarmData, CropData } from '../types';

interface FarmDetailsFormProps {
    onSubmit: (data: FarmData) => void;
    allCrops: CropData[];
}

const FarmDetailsForm: React.FC<FarmDetailsFormProps> = ({ onSubmit, allCrops }) => {
    const [formData, setFormData] = useState<Omit<FarmData, 'fullAddress'>>({
        street: '', town: '', district: '', state: '', pincode: '',
        landArea: '', areaUnit: 'acres', currentCrop: '',
        waterSource: 'rain', budget: 'low'
    });
    const [suggestions, setSuggestions] = useState<CropData[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCropInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prev => ({...prev, currentCrop: value}));
        if(value.length > 1) {
            const filtered = allCrops
                .filter(c => c.crop.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    const handleSuggestionClick = (cropName: string) => {
        setFormData(prev => ({...prev, currentCrop: cropName}));
        setShowSuggestions(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullAddress = [formData.street, formData.town, formData.district, formData.state, formData.pincode].filter(Boolean).join(', ');
        onSubmit({ ...formData, fullAddress });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            setIsFetchingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data && data.address) {
                                setFormData(prev => ({
                                    ...prev,
                                    street: data.address.road || data.address.suburb || '',
                                    town: data.address.village || data.address.town || data.address.city || '',
                                    district: data.address.county || data.address.state_district || '',
                                    state: data.address.state || '',
                                    pincode: data.address.postcode || ''
                                }));
                            }
                        })
                        .catch(err => console.error("Reverse geocoding failed:", err))
                        .finally(() => setIsFetchingLocation(false));
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setIsFetchingLocation(false);
                },
                { enableHighAccuracy: true }
            );
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:bg-gray-900">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl mx-auto my-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>Farm Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Complete Address</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" id="street" value={formData.street} onChange={handleChange} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Street Address" />
                            <input type="text" id="town" value={formData.town} onChange={handleChange} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Town/Village" />
                            <input type="text" id="district" value={formData.district} onChange={handleChange} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="District" />
                            <input type="text" id="state" value={formData.state} onChange={handleChange} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="State" />
                        </div>
                        <div className="flex mt-4 space-x-2">
                            <input type="text" id="pincode" value={formData.pincode} onChange={handleChange} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Pincode" />
                            <button type="button" onClick={getLocation} disabled={isFetchingLocation} className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300">
                                {isFetchingLocation ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-crosshairs"></i>}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Land Area</label>
                            <div className="flex space-x-2">
                                <input type="number" id="landArea" value={formData.landArea} onChange={handleChange} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Enter area" />
                                <select id="areaUnit" value={formData.areaUnit} onChange={handleChange} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                    <option value="acres">Acres</option><option value="hectares">Hectares</option><option value="bigha">Bigha</option><option value="katha">Katha</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Crop</label>
                            <div className="relative">
                                <input type="text" id="currentCrop" value={formData.currentCrop} onChange={handleCropInputChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Search current crop..." autoComplete="off" onFocus={() => formData.currentCrop.length > 1 && setShowSuggestions(true)}/>
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {suggestions.map(s => <div key={s.crop} onClick={() => handleSuggestionClick(s.crop)} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{s.crop}</div>)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Water Source</label>
                            <select id="waterSource" value={formData.waterSource} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="rain">Rainwater</option><option value="bore">Borewell</option><option value="canal">Canal</option><option value="river">River</option><option value="tank">Tank</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
                            <select id="budget" value={formData.budget} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="low">Low (₹10,000 - ₹50,000)</option><option value="medium">Medium (₹50,000 - ₹2,00,000)</option><option value="high">High (₹2,00,000+)</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                        <i className="fas fa-microscope mr-2"></i>Analyze & Get Smart Recommendations
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FarmDetailsForm;