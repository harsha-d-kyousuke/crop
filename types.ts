
export interface FarmData {
    street: string;
    town: string;
    district: string;
    state: string;
    pincode: string;
    landArea: number | '';
    areaUnit: 'acres' | 'hectares' | 'bigha' | 'katha';
    currentCrop: string;
    waterSource: 'rain' | 'bore' | 'canal' | 'river' | 'tank';
    budget: 'low' | 'medium' | 'high';
    fullAddress: string;
}

export interface SoilData {
    name: string;
    value: string;
    icon: string;
    ideal: string;
    color: string;
    textColor: string;
}

export interface CropData {
    state: string;
    district: string;
    crop: string;
    crop_year: number;
    season: string;
    area: number;
    production: number;
    soil_ph_observed: number;
    soil_ph_optimal_min: number;
    soil_ph_optimal_max: number;
    rainfall_mm_observed: number;
    crop_min_rain_mm: number;
    crop_max_rain_mm: number;
    yield_kg_per_ha: number;
    category: string;
    water_need: string;
    icon: string;
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}
