'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  getGeocodingResults,
  formatLocationName,
} from '@/lib/weather';
import type {
  CurrentWeather as CurrentWeatherType,
  OneCallResponse,
  AirPollutionData,
  HistoricalWeather as HistoricalWeatherType,
  GeocodingLocation,
} from '@/lib/types';
import { AccumulatedData } from '../components/AccumulatedData';
import { DailyForecast } from '../components/DailyForecast';
import { StatisticalWeather } from '../components/weather/StatisticalWeather';

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
  readonly id: 'current' | 'hourly' | 'daily' | 'air' | 'accumulated' | 'alerts' | 'statistics';
  readonly label: string;
};

const tabs: Tab[] = [
  { id: 'current', label: 'Current' },
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: '16-Day Forecast' },
  { id: 'air', label: 'Air Quality' },
  { id: 'accumulated', label: 'Accumulated Data' },
  { id: 'alerts', label: 'Weather Alerts' },
  { id: 'statistics', label: 'Climate Stats' },
];

const STORAGE_KEY = 'weatherAppSavedLocations';
const DEBOUNCE_MS = 300; // Debounce delay for location search in milliseconds

export default function HomePage() {
  const [citySearch, setCitySearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activeTab, setActiveTab] = useState('current');
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<GeocodingLocation[]>([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);

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

  // Debounced search for location suggestions
  const debouncedLocationSearch = useCallback(
    async (searchTerm: string) => {
      if (searchTerm.trim().length < 2) {
        setLocationSuggestions([]);
        return;
      }

      setSearchLoading(true);
      try {
        const suggestions = await getGeocodingResults(searchTerm);
        setLocationSuggestions(suggestions);
      } catch (err) {
        console.error('Failed to fetch location suggestions:', err);
        setLocationSuggestions([]);
      } finally {
        setSearchLoading(false);
      }
    },
    []
  );

  // Create debounce for search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      debouncedLocationSearch(citySearch);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timerId);
  }, [citySearch, debouncedLocationSearch]);

  // Handle input change for search box
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearch(e.target.value);
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = async (location: GeocodingLocation) => {
    setCitySearch(formatLocationName(location));
    
    // Immediately store the selected location before API calls
    setSelectedLocation({ lat: location.lat, lon: location.lon });
    
    // Continue with the full location selection process
    await handleLocationSelect(location.lat, location.lon);
  };

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!citySearch.trim()) return;

    // If there are suggestions available, use the first one
    if (locationSuggestions.length > 0) {
      const firstLocation = locationSuggestions[0];
      await handleLocationSelect(firstLocation.lat, firstLocation.lon);
      return;
    }

    // Otherwise proceed with the original search by name
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

  // Handle saving location from dialog
  const saveLocationFromDialog = () => {
    if (locationName && selectedLocation) {
      setSavedLocations((prev) => [...prev, {
        id: `${selectedLocation.lat}-${selectedLocation.lon}`,
        name: locationName,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
      }]);
    }
    setShowSavePopup(false);
    setLocationName('');
  };

  // Handle keyboard event for saving location
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && locationName.trim()) {
      saveLocationFromDialog();
    }
  };

  async function handleLocationSelect(lat: number, lon: number) {
    setLoading(true);
    setError('');
    setWeather(null);
    // Store selected location
    setSelectedLocation({ lat, lon });
    // Clear suggestions after selection
    setLocationSuggestions([]);

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

  // Add a saved location from map or other components
  function handleSaveLocation(location: SavedLocation) {
    setSavedLocations((prev) => [...prev, location]);
  }

  function handleDeleteLocation(id: string) {
    setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
  }

  // Function to check if a location is already saved
  const isLocationSaved = (lat: number, lon: number) => {
    return savedLocations.some(loc => 
      Math.abs(loc.lat - lat) < 0.001 && Math.abs(loc.lon - lon) < 0.001
    );
  };

  // Open save dialog for current location
  const openSaveLocationDialog = () => {
    if (weather?.current.coord) {
      setSelectedLocation({
        lat: weather.current.coord.lat,
        lon: weather.current.coord.lon
      });
      setShowSavePopup(true);
    }
  };

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
            onChange={handleSearchInputChange}
            onSubmit={handleSearch}
            loading={loading || searchLoading}
            suggestions={locationSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />

          <div className="bg-white rounded-lg p-4 shadow-lg space-y-4">
            <h2 className="text-lg font-medium">Select location from map</h2>
            {/* Add a key to the WeatherMap component to force remount when needed */}
            <WeatherMap
              key={`map-${selectedLocation?.lat}-${selectedLocation?.lon}`}
              onLocationSelect={handleLocationSelect}
              apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''}
              onSaveLocation={handleSaveLocation}
              savedLocations={savedLocations}
              selectedLocation={selectedLocation}
            />

            {/* Current Selected Location with Save Button */}
            {weather && weather.current.name && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Selected Location</h3>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-primary-50 rounded-lg border border-primary-100 flex items-center gap-2">
                    <span className="text-sm text-gray-800 font-medium">
                      {weather.current.name}
                      {weather.current.sys.country ? `, ${weather.current.sys.country}` : ''}
                    </span>
                    
                    {!isLocationSaved(weather.current.coord.lat, weather.current.coord.lon) && (
                      <button
                        onClick={openSaveLocationDialog}
                        className="text-primary-500 hover:text-primary-700 focus:outline-none"
                        title="Save this location"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                      title="Remove location"
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

        {/* Save Location Dialog */}
        {showSavePopup && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowSavePopup(false);
                setLocationName('');
              }
            }}
          >
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-medium mb-4">Save Location</h3>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter location name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowSavePopup(false);
                    setLocationName('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={saveLocationFromDialog}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  disabled={!locationName.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

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

            {activeTab === 'statistics' && (
              <StatisticalWeather
                lat={weather.current.coord?.lat || 0}
                lon={weather.current.coord?.lon || 0}
                apiKey={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''}
              />
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