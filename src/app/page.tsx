'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SearchInput } from '@/components/SearchInput';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { Forecast } from '@/components/weather/Forecast';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { AirPollution } from '@/components/weather/AirPollution';
import { WeatherAlerts } from '@/components/weather/WeatherAlerts';
import { HistoricalWeather } from '@/components/weather/HistoricalWeather';
import { TabPanel } from '@/components/ui/TabPanel';
import {
  getCurrentWeather,
  getOneCallData,
  getAirPollution,
  getHistoricalWeather,
} from '@/lib/weather';
import type {
  CurrentWeather as CurrentWeatherType,
  OneCallResponse,
  AirPollutionData,
  HistoricalWeather as HistoricalWeatherType,
} from '@/lib/types';
import { AccumulatedData } from '../components/AccumulatedData';
import { DailyForecast } from '../components/DailyForecast';

// Import WeatherMap dynamically to avoid SSR issues with Leaflet
const WeatherMap = dynamic(
  () => import('@/components/map/WeatherMap').then((mod) => mod.WeatherMap),
  { ssr: false }
);

interface WeatherData {
  current: CurrentWeatherType;
  forecast: OneCallResponse | null;
  airPollution: AirPollutionData | null;
  historical: HistoricalWeatherType | null;
}

interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

type Tab = {
  readonly id: 'current' | 'hourly' | 'daily' | 'air' | 'accumulated';
  readonly label: string;
};

const tabs: Tab[] = [
  { id: 'current', label: 'Current' },
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: '16-Day Forecast' },
  { id: 'air', label: 'Air Quality' },
  { id: 'accumulated', label: 'Accumulated Data' },
];

const STORAGE_KEY = 'weatherAppSavedLocations';

export default function HomePage() {
  const [citySearch, setCitySearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activeTab, setActiveTab] = useState('current');
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  // Load saved locations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedLocations(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load saved locations:', err);
      }
    }
  }, []);

  // Save locations to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
  }, [savedLocations]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!citySearch.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // Get current weather data with city name
      const currentWeatherData = await getCurrentWeather(`q=${encodeURIComponent(citySearch)}`);
      const { lat, lon } = currentWeatherData.coord;

      // Get air pollution data
      const airPollutionData = await getAirPollution(lat, lon);

      // Get historical data (24 hours ago)
      const yesterday = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
      const historicalData = await getHistoricalWeather(lat, lon, yesterday);

      try {
        // Get forecast data
        const oneCallData = await getOneCallData(lat, lon);
        setWeather({
          current: currentWeatherData,
          forecast: oneCallData,
          airPollution: airPollutionData,
          historical: historicalData,
        });
      } catch (forecastErr) {
        console.error('Failed to fetch forecast data:', forecastErr);
        setWeather({
          current: currentWeatherData,
          forecast: null,
          airPollution: airPollutionData,
          historical: historicalData,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }

  async function handleLocationSelect(lat: number, lon: number) {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // Get current weather data with coordinates
      const currentWeatherData = await getCurrentWeather(`lat=${lat}&lon=${lon}`);

      // Get air pollution data
      const airPollutionData = await getAirPollution(lat, lon);

      // Get historical data (24 hours ago)
      const yesterday = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
      const historicalData = await getHistoricalWeather(lat, lon, yesterday);

      try {
        // Get forecast data
        const oneCallData = await getOneCallData(lat, lon);
        setWeather({
          current: currentWeatherData,
          forecast: oneCallData,
          airPollution: airPollutionData,
          historical: historicalData,
        });
      } catch (forecastErr) {
        console.error('Failed to fetch forecast data:', forecastErr);
        setWeather({
          current: currentWeatherData,
          forecast: null,
          airPollution: airPollutionData,
          historical: historicalData,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }

  function handleSaveLocation(location: SavedLocation) {
    setSavedLocations((prev) => [...prev, location]);
  }

  function handleDeleteLocation(id: string) {
    setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
  }

  async function handleHistoricalDateChange(timestamp: number) {
    if (!weather?.current.coord) return;

    setHistoricalLoading(true);
    try {
      const { lat, lon } = weather.current.coord;
      
      const historicalData = await getHistoricalWeather(
        lat,
        lon,
        timestamp
      );

      setWeather((prev) => prev ? {
        ...prev,
        historical: historicalData,
      } : null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch historical data');
    } finally {
      setHistoricalLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Weather Forecast</h1>
        <p className="text-gray-500 mb-6">
          Get comprehensive weather data for any location
        </p>

        <div className="mb-8 space-y-6">
          <SearchInput
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            onSubmit={handleSearch}
            loading={loading}
          />

          <div className="bg-white rounded-lg p-4 shadow-lg space-y-4">
            <h2 className="text-lg font-medium">Select location from map</h2>
            <WeatherMap
              onLocationSelect={handleLocationSelect}
              apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''}
              onSaveLocation={handleSaveLocation}
              savedLocations={savedLocations}
            />

            {/* Saved Locations */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Locations</h3>
              <div className="flex flex-wrap gap-2">
                {savedLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <button
                      onClick={() => handleLocationSelect(location.lat, location.lon)}
                      className="text-sm hover:text-primary-600"
                    >
                      {location.name}
                    </button>
                    <button
                      onClick={() => handleDeleteLocation(location.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {weather && (
          <div className="space-y-6">
            <TabPanel
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {activeTab === 'current' && (
              <CurrentWeather data={weather.current} />
            )}

            {activeTab === 'hourly' && weather.forecast?.hourly && (
              <HourlyForecast data={weather.forecast.hourly} />
            )}

            {activeTab === 'daily' && (
              <DailyForecast
                lat={weather.current.coord?.lat || 0}
                lon={weather.current.coord?.lon || 0}
                apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''}
              />
            )}

            {activeTab === 'air' && weather.airPollution && (
              <AirPollution data={weather.airPollution} />
            )}

            {activeTab === 'accumulated' && (
              <AccumulatedData
                lat={weather.current.coord?.lat || 0}
                lon={weather.current.coord?.lon || 0}
                apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''}
              />
            )}

            {activeTab === 'alerts' && weather.forecast?.alerts && (
              <WeatherAlerts alerts={weather.forecast.alerts} />
            )}

            {activeTab === 'historical' && weather.historical && (
              <HistoricalWeather
                data={weather.historical}
                onDateChange={handleHistoricalDateChange}
                loading={historicalLoading}
              />
            )}

            {activeTab !== 'current' && !weather.forecast && (
              <div className="p-4 bg-amber-50 text-amber-600 rounded-lg">
                Additional weather data is not available. The One Call API 3.0 requires a
                separate subscription.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 