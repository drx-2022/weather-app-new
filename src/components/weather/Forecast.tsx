import React from 'react';
import Image from 'next/image';
import { DailyForecast } from '@/lib/types';
import { formatDate, getWeatherIconUrl } from '@/lib/weather';

interface ForecastProps {
  data: DailyForecast[];
}

export function Forecast({ data }: ForecastProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5-Day Forecast</h2>
        <div className="grid gap-4">
          {data.slice(1, 6).map((day) => (
            <div
              key={day.dt}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={getWeatherIconUrl(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {formatDate(day.dt)}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {day.weather[0].description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-900">
                  {Math.round(day.temp.max)}°C
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round(day.temp.min)}°C
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 