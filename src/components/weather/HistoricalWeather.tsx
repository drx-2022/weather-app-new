import React, { useState } from 'react';
import Image from 'next/image';
import { HistoricalWeather as HistoricalWeatherType } from '@/lib/types';
import { formatDate, formatTime, getWeatherIconUrl } from '@/lib/weather';
import { DatePicker } from '@/components/ui/DatePicker';

interface HistoricalWeatherProps {
  data: HistoricalWeatherType;
  onDateChange: (timestamp: number) => void;
  loading?: boolean;
}

export function HistoricalWeather({ data, onDateChange, loading }: HistoricalWeatherProps) {
  const [selectedDate, setSelectedDate] = useState(new Date(data.data[0].dt * 1000));

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(Math.floor(date.getTime() / 1000));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Historical Weather</h2>
          <div className="w-48">
            <DatePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {data.data.map((point) => (
              <div
                key={point.dt}
                className="p-4 rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {formatDate(point.dt)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTime(point.dt)}
                    </div>
                  </div>
                  <Image
                    src={getWeatherIconUrl(point.weather[0].icon)}
                    alt={point.weather[0].description}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Temperature</div>
                    <div className="font-medium">{Math.round(point.temp)}°C</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Feels Like</div>
                    <div className="font-medium">{Math.round(point.feels_like)}°C</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Humidity</div>
                    <div className="font-medium">{point.humidity}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Wind Speed</div>
                    <div className="font-medium">{point.wind_speed} m/s</div>
                  </div>
                  <div>
                    <div className="text-gray-500">UV Index</div>
                    <div className="font-medium">{point.uvi}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Clouds</div>
                    <div className="font-medium">{point.clouds}%</div>
                  </div>
                </div>

                {(point.rain?.['1h'] || point.snow?.['1h']) && (
                  <div className="mt-4 text-sm">
                    {point.rain?.['1h'] && (
                      <div className="text-blue-600">
                        Rain: {point.rain['1h']} mm/h
                      </div>
                    )}
                    {point.snow?.['1h'] && (
                      <div className="text-blue-600">
                        Snow: {point.snow['1h']} mm/h
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 