import React from 'react';
import { AirPollutionData } from '@/lib/types';
import { getAQIDescription } from '@/lib/weather';

interface AirPollutionProps {
  data: AirPollutionData;
}

export function AirPollution({ data }: AirPollutionProps) {
  const { aqi } = data.list[0].main;
  const { components } = data.list[0];
  const { level, description, color } = getAQIDescription(aqi);

  // Background and text color mapping for AQI levels
  const getBgColor = () => {
    switch (aqi) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-300';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Determine text color based on background color for better contrast
  const getTextColor = () => {
    switch (aqi) {
      case 1: // Good - green background
      case 3: // Moderate - orange background
      case 4: // Poor - red background
      case 5: // Very Poor - purple background
        return 'text-white';
      case 2: // Fair - yellow background
        return 'text-gray-800'; // Dark text for light background
      default:
        return 'text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Air Quality</h2>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div 
              className={`w-16 h-16 rounded-full ${getBgColor()} flex items-center justify-center border-2 border-gray-200 shadow-md`}
            >
              <span className={`text-2xl font-bold ${getTextColor()} drop-shadow-md`}>{aqi}</span>
            </div>
            <div>
              <div className="font-medium text-lg">{level}</div>
              <div className="text-sm text-gray-600">{description}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">PM2.5</div>
              <div className="font-medium">{components.pm2_5} μg/m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">PM10</div>
              <div className="font-medium">{components.pm10} μg/m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">NO₂</div>
              <div className="font-medium">{components.no2} μg/m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">O₃</div>
              <div className="font-medium">{components.o3} μg/m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">SO₂</div>
              <div className="font-medium">{components.so2} μg/m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">CO</div>
              <div className="font-medium">{components.co} μg/m³</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}