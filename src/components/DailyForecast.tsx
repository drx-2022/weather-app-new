import React, { useState, useEffect } from 'react';
import { getDailyForecast, Units, Lang } from '../services/weather';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DailyForecastProps {
  lat: number;
  lon: number;
  apiKey: string;
}

export function DailyForecast({ lat, lon, apiKey }: DailyForecastProps) {
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDailyForecast(lat, lon, apiKey, {
          cnt: days,
          units,
        });
        setForecastData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch forecast data');
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchData();
    }
  }, [lat, lon, apiKey, units, days]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getUnitSymbol = (type: 'temp' | 'speed') => {
    switch (units) {
      case 'metric':
        return type === 'temp' ? '°C' : 'm/s';
      case 'imperial':
        return type === 'temp' ? '°F' : 'mph';
      default:
        return type === 'temp' ? 'K' : 'm/s';
    }
  };

  const temperatureChartData = {
    labels: forecastData?.list.map((item: any) => formatDate(item.dt)) || [],
    datasets: [
      {
        label: `Max Temperature (${getUnitSymbol('temp')})`,
        data: forecastData?.list.map((item: any) => item.temp.max) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `Min Temperature (${getUnitSymbol('temp')})`,
        data: forecastData?.list.map((item: any) => item.temp.min) || [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value.toFixed(1)}${getUnitSymbol('temp')}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Temperature (${getUnitSymbol('temp')})`,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <label className="font-medium">Units:</label>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value as Units)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="metric">Metric (°C, m/s)</option>
            <option value="imperial">Imperial (°F, mph)</option>
            <option value="standard">Standard (K, m/s)</option>
          </select>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <label className="font-medium">Days:</label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="16">16 days</option>
          </select>
        </div>
      </div>

      {forecastData && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Temperature Forecast</h3>
            <Line data={temperatureChartData} options={chartOptions} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {forecastData.list.map((day: any) => (
              <div key={day.dt} className="bg-white p-4 rounded-lg shadow">
                <div className="text-lg font-medium mb-2">{formatDate(day.dt)}</div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    className="w-12 h-12"
                  />
                  <div>
                    <div className="capitalize">{day.weather[0].description}</div>
                    <div className="text-sm text-gray-500">
                      {Math.round(day.temp.max)}/{Math.round(day.temp.min)}{getUnitSymbol('temp')}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Morning:</span> {Math.round(day.temp.morn)}{getUnitSymbol('temp')}
                  </div>
                  <div>
                    <span className="text-gray-500">Day:</span> {Math.round(day.temp.day)}{getUnitSymbol('temp')}
                  </div>
                  <div>
                    <span className="text-gray-500">Evening:</span> {Math.round(day.temp.eve)}{getUnitSymbol('temp')}
                  </div>
                  <div>
                    <span className="text-gray-500">Night:</span> {Math.round(day.temp.night)}{getUnitSymbol('temp')}
                  </div>
                  <div>
                    <span className="text-gray-500">Humidity:</span> {day.humidity}%
                  </div>
                  <div>
                    <span className="text-gray-500">Wind:</span> {Math.round(day.speed)}{getUnitSymbol('speed')}
                  </div>
                  {day.rain && (
                    <div>
                      <span className="text-gray-500">Rain:</span> {day.rain}mm
                    </div>
                  )}
                  {day.snow && (
                    <div>
                      <span className="text-gray-500">Snow:</span> {day.snow}mm
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Clouds:</span> {day.clouds}%
                  </div>
                  <div>
                    <span className="text-gray-500">Precip:</span> {Math.round(day.pop * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 