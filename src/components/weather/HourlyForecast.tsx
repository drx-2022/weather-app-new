import React from 'react';
import Image from 'next/image';
import { HourlyForecast as HourlyForecastType } from '@/lib/types';
import { formatTime, getWeatherIconUrl } from '@/lib/weather';

interface HourlyForecastProps {
  data: HourlyForecastType[];
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">48-Hour Forecast</h2>
        
        <div className="overflow-x-auto">
          <div className="inline-flex space-x-4 pb-4">
            {data.map((hour) => (
              <div
                key={hour.dt}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-50 min-w-[100px]"
              >
                <div className="text-sm font-medium text-gray-900">
                  {formatTime(hour.dt)}
                </div>
                <Image
                  src={getWeatherIconUrl(hour.weather[0].icon)}
                  alt={hour.weather[0].description}
                  width={40}
                  height={40}
                  className="w-10 h-10 my-2"
                />
                <div className="font-medium text-gray-900">
                  {Math.round(hour.temp)}°C
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(hour.pop * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {hour.wind_speed.toFixed(1)} m/s
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Precipitation chance</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
} 