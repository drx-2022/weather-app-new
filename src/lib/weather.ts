import {
  CurrentWeather,
  OneCallResponse,
  AirPollutionData,
  HistoricalWeather,
} from './types';

const STANDARD_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const ONECALL_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_ONECALL_API_KEY;

// Current Weather with city name or coordinates
export async function getCurrentWeather(query: string): Promise<CurrentWeather> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${STANDARD_API_KEY}`
  );
  
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Location not found');
    }
    throw new Error('Failed to fetch current weather');
  }
  
  return res.json();
}

// One Call API (Current + Forecast)
export async function getOneCallData(lat: number, lon: number): Promise<OneCallResponse> {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${ONECALL_API_KEY}`
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return res.json();
}

// Air Pollution
export async function getAirPollution(lat: number, lon: number): Promise<AirPollutionData> {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${STANDARD_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch air pollution data');
  }

  return res.json();
}

// Historical Weather
export async function getHistoricalWeather(
  lat: number,
  lon: number,
  dt: number
): Promise<HistoricalWeather> {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&units=metric&appid=${ONECALL_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch historical weather data');
  }

  return res.json();
}

// Utility functions
export function formatDate(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getAQIDescription(aqi: number): {
  level: string;
  description: string;
  color: string;
} {
  switch (aqi) {
    case 1:
      return {
        level: 'Good',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        color: 'bg-green-500',
      };
    case 2:
      return {
        level: 'Fair',
        description: 'Air quality is acceptable. However, there may be a risk for some people.',
        color: 'bg-yellow-500',
      };
    case 3:
      return {
        level: 'Moderate',
        description: 'Members of sensitive groups may experience health effects.',
        color: 'bg-orange-500',
      };
    case 4:
      return {
        level: 'Poor',
        description: 'Everyone may begin to experience health effects.',
        color: 'bg-red-500',
      };
    case 5:
      return {
        level: 'Very Poor',
        description: 'Health warnings of emergency conditions. The entire population is likely to be affected.',
        color: 'bg-purple-500',
      };
    default:
      return {
        level: 'Unknown',
        description: 'Air quality data is not available.',
        color: 'bg-gray-500',
      };
  }
} 