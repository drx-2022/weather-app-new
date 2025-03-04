import React from 'react';
import Image from 'next/image';
import { CurrentWeather as CurrentWeatherType } from '@/lib/types';
import { getWeatherIconUrl } from '@/lib/weather';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-sm text-gray-500">Current Weather</p>
          </div>
          <Image
            src={getWeatherIconUrl(data.weather[0].icon)}
            alt={data.weather[0].description}
            width={64}
            height={64}
            className="w-16 h-16"
          />
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-gray-900">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="text-gray-600">
              Feels like {Math.round(data.main.feels_like)}°C
            </div>
          </div>

          <div className="text-lg capitalize text-gray-700">
            {data.weather[0].description}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Humidity</div>
              <div className="font-medium">{data.main.humidity}%</div>
            </div>
            <div>
              <div className="text-gray-500">Wind Speed</div>
              <div className="font-medium">{data.wind.speed} m/s</div>
            </div>
            <div>
              <div className="text-gray-500">Min Temp</div>
              <div className="font-medium">{Math.round(data.main.temp_min)}°C</div>
            </div>
            <div>
              <div className="text-gray-500">Max Temp</div>
              <div className="font-medium">{Math.round(data.main.temp_max)}°C</div>
            </div>
            <div>
              <div className="text-gray-500">Pressure</div>
              <div className="font-medium">{data.main.pressure} hPa</div>
            </div>
            <div>
              <div className="text-gray-500">Visibility</div>
              <div className="font-medium">{data.visibility / 1000} km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 