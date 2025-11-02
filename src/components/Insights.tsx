import React, { useMemo } from 'react';
import { CropData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface InsightsProps {
    allCrops: CropData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Insights: React.FC<InsightsProps> = ({ allCrops }) => {

    const topCropsByYield = useMemo(() => {
        return [...allCrops]
            .sort((a, b) => b.yield_kg_per_ha - a.yield_kg_per_ha)
            .slice(0, 7);
    }, [allCrops]);

    const cropCategoryDistribution = useMemo(() => {
        const categoryCount = allCrops.reduce((acc, crop) => {
            const category = crop.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
    }, [allCrops]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                    <p className="font-bold text-gray-800 dark:text-white">{label || payload[0].name}</p>
                    <p className="text-sm" style={{ color: payload[0].fill || payload[0].payload.fill }}>
                        {`${payload[0].name}: ${payload[0].value.toLocaleString()}`}
                    </p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="max-w-7xl mx-auto animate-fade-in space-y-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                <i className="fas fa-chart-pie text-blue-500 mr-3"></i>Data Insights
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Top 7 Crops by Yield (kg/ha)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topCropsByYield} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                            <XAxis dataKey="crop" angle={-20} textAnchor="end" height={50} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-gray-600 dark:text-gray-400" />
                            <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-gray-600 dark:text-gray-400"/>
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                            <Bar dataKey="yield_kg_per_ha" fill="#8884d8" name="Yield (kg/ha)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Crop Category Distribution</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={cropCategoryDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(Number(percent || 0) * 100).toFixed(0)}%`}
                                className="stroke-none"
                            >
                                {cropCategoryDistribution.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip content={<CustomTooltip />} />
                             <Legend wrapperStyle={{fontSize: "14px"}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Insights;