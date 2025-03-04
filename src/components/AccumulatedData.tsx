import React, { useState, useEffect } from 'react';
import { getAccumulatedTemperature, getAccumulatedPrecipitation } from '../services/weather';
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

interface AccumulatedDataProps {
  lat: number;
  lon: number;
  apiKey: string;
}

interface AccumulatedData {
  date: string;
  temp?: number;
  rain?: number;
  count: number;
}

interface DateRange {
  start: Date;
  end: Date;
}

const PRESET_RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 14 days', days: 14 },
  { label: 'Last 30 days', days: 30 },
] as const;

const MAX_DAYS = 30; // OpenWeather API limitation
const MIN_DATE = new Date('2017-01-01'); // OpenWeather historical data starts from 2017

export function AccumulatedData({ lat, lon, apiKey }: AccumulatedDataProps) {
  const [temperatureData, setTemperatureData] = useState<AccumulatedData[]>([]);
  const [precipitationData, setPrecipitationData] = useState<AccumulatedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<number>(284); // Default threshold in Kelvin (about 11°C)
  const [activeChart, setActiveChart] = useState<'temperature' | 'precipitation'>('temperature');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const start = Math.floor(dateRange.start.getTime() / 1000);
        const end = Math.floor(dateRange.end.getTime() / 1000);

        const [tempData, precipData] = await Promise.all([
          getAccumulatedTemperature(lat, lon, start, end, apiKey, threshold),
          getAccumulatedPrecipitation(lat, lon, start, end, apiKey),
        ]);

        // Ensure the data is in array format
        const tempArray = Array.isArray(tempData) ? tempData : [tempData];
        const precipArray = Array.isArray(precipData) ? precipData : [precipData];

        setTemperatureData(tempArray);
        setPrecipitationData(precipArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchData();
    }
  }, [lat, lon, apiKey, threshold, dateRange]);

  // Validate date range
  const validateDateRange = (start: Date, end: Date): string | null => {
    if (start < MIN_DATE) {
      return 'Historical data is only available from 2017 onwards';
    }

    const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > MAX_DAYS) {
      return `Date range cannot exceed ${MAX_DAYS} days`;
    }

    return null;
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    const newDate = new Date(value);
    const newRange = {
      ...dateRange,
      [type]: newDate,
    };

    const validationError = validateDateRange(
      type === 'start' ? newDate : dateRange.start,
      type === 'end' ? newDate : dateRange.end
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setDateRange(newRange);
  };

  const handlePresetRange = (days: number) => {
    if (days > MAX_DAYS) {
      setError(`Date range cannot exceed ${MAX_DAYS} days`);
      return;
    }

    const end = new Date();
    const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
    
    if (start < MIN_DATE) {
      setError('Historical data is only available from 2017 onwards');
      return;
    }

    setError(null);
    setDateRange({ start, end });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const temperatureChartData = {
    labels: temperatureData.map(d => formatDate(d.date)),
    datasets: [
      {
        label: 'Daily Temperature (K)',
        data: temperatureData.map(d => (d.temp ?? 0) / (d.count || 1)), // Average daily temperature
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Cumulative Temperature (K)',
        data: temperatureData.map(d => d.temp ?? 0), // Cumulative temperature
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const precipitationChartData = {
    labels: precipitationData.map(d => formatDate(d.date)),
    datasets: [
      {
        label: 'Daily Precipitation (mm)',
        data: precipitationData.map(d => (d.rain ?? 0) / (d.count || 1)), // Average daily precipitation
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Cumulative Precipitation (mm)',
        data: precipitationData.map(d => d.rain ?? 0), // Cumulative precipitation
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            const datasetLabel = context.dataset.label;
            const measurements = temperatureData[context.dataIndex]?.count || precipitationData[context.dataIndex]?.count || 0;
            return `${datasetLabel}: ${value.toFixed(2)} (${measurements} measurements)`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: activeChart === 'temperature' ? 'Daily Temperature (K)' : 'Daily Precipitation (mm)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: activeChart === 'temperature' ? 'Cumulative Temperature (K)' : 'Cumulative Precipitation (mm)',
        },
        grid: {
          drawOnChartArea: false,
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="font-medium">Temperature Threshold:</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-24"
            />
            <span className="text-sm text-gray-500">K ({(threshold - 273.15).toFixed(1)}°C)</span>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setActiveChart('temperature')}
              className={`px-4 py-2 rounded-lg ${
                activeChart === 'temperature'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setActiveChart('precipitation')}
              className={`px-4 py-2 rounded-lg ${
                activeChart === 'precipitation'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Precipitation
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium">Start Date:</label>
              <input
                type="date"
                value={dateRange.start.toISOString().split('T')[0]}
                max={dateRange.end.toISOString().split('T')[0]}
                min={MIN_DATE.toISOString().split('T')[0]}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium">End Date:</label>
              <input
                type="date"
                value={dateRange.end.toISOString().split('T')[0]}
                min={dateRange.start.toISOString().split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 ml-auto">
            {PRESET_RANGES.map(({ label, days }) => (
              <button
                key={days}
                onClick={() => handlePresetRange(days)}
                className={`px-3 py-1 text-sm ${
                  days > MAX_DAYS 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={days > MAX_DAYS}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-center text-amber-600 bg-amber-50 p-4 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {activeChart === 'temperature' ? (
          temperatureData.length > 0 ? (
            <>
              <h3 className="text-lg font-medium mb-4">Temperature Accumulation</h3>
              <Line data={temperatureChartData} options={chartOptions} />
              <div className="text-sm text-gray-500 mt-4 space-y-2">
                <p>
                  Shows both daily and cumulative temperature values above the threshold ({threshold}K or {(threshold - 273.15).toFixed(1)}°C)
                </p>
                <p>
                  Total accumulated temperature: {(temperatureData[temperatureData.length - 1]?.temp ?? 0).toFixed(2)}K
                </p>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No temperature data available for the selected date range</p>
          )
        ) : (
          precipitationData.length > 0 ? (
            <>
              <h3 className="text-lg font-medium mb-4">Precipitation Accumulation</h3>
              <Line data={precipitationChartData} options={chartOptions} />
              <div className="text-sm text-gray-500 mt-4 space-y-2">
                <p>Shows both daily and cumulative precipitation values</p>
                <p>
                  Total accumulated precipitation: {(precipitationData[precipitationData.length - 1]?.rain ?? 0).toFixed(2)}mm
                </p>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No precipitation data available for the selected date range</p>
          )
        )}
      </div>
    </div>
  );
} 