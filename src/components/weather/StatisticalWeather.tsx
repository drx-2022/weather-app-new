import React, { useState, useEffect } from 'react';
import { getStatisticalWeather, Units, StatisticalAggregation } from '../../services/weather';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticalWeatherProps {
  lat: number;
  lon: number;
  apiKey: string;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed, API expects 1-indexed

export function StatisticalWeather({ lat, lon, apiKey }: StatisticalWeatherProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [aggregation, setAggregation] = useState<StatisticalAggregation>('year');
  const [month, setMonth] = useState<number>(currentMonth);
  const [day, setDay] = useState<number>(1);
  const [activeChart, setActiveChart] = useState<'temperature' | 'precipitation' | 'wind' | 'humidity'>('temperature');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Configure options based on aggregation type
        const options: any = { 
          aggregation,
          units // Not used by the API, but useful for UI display
        };
        
        if (aggregation === 'month' || aggregation === 'day') {
          options.month = month;
        }
        
        if (aggregation === 'day') {
          options.day = day;
        }
        
        const response = await getStatisticalWeather(lat, lon, apiKey, options);
        console.log('Statistical API response:', response); // For debugging
        setData(response);
      } catch (err) {
        console.error('Statistical API error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch statistical data');
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchData();
    }
  }, [lat, lon, apiKey, units, aggregation, month, day]);

  const getUnitSymbol = (type: 'temp' | 'speed' | 'precip' | 'humidity' | 'pressure') => {
    switch (type) {
      case 'temp':
        return units === 'metric' ? '°C' : units === 'imperial' ? '°F' : 'K';
      case 'speed':
        return units === 'imperial' ? 'mph' : 'm/s';
      case 'precip':
        return 'mm';
      case 'humidity':
        return '%';
      case 'pressure':
        return 'hPa';
      default:
        return '';
    }
  };

  // Convert Kelvin to the selected temperature unit
  const convertTemperature = (kelvin: number): number => {
    if (units === 'metric') {
      return kelvin - 273.15; // Kelvin to Celsius
    } else if (units === 'imperial') {
      return (kelvin - 273.15) * 9/5 + 32; // Kelvin to Fahrenheit
    }
    return kelvin; // Standard units (Kelvin)
  };

  const getChartData = () => {
    if (!data?.result) {
      return {
        temperature: { labels: [], datasets: [] },
        precipitation: { labels: [], datasets: [] },
        wind: { labels: [], datasets: [] },
        humidity: { labels: [], datasets: [] },
      };
    }

    // Handle yearly aggregation (array of daily data)
    if (aggregation === 'year' && Array.isArray(data.result)) {
      const resultData = data.result;
      
      // Group by month for clearer visualization
      const monthlyData = monthNames.map((_, idx) => {
        const monthNumber = idx + 1;
        const monthItems = resultData.filter((item: { month: number; }) => item.month === monthNumber);
        
        if (monthItems.length === 0) return null;
        
        // Calculate averages for this month
        const tempSum = monthItems.reduce((sum: any, item: { temp: { mean: any; }; }) => sum + item.temp.mean, 0);
        const precipSum = monthItems.reduce((sum: any, item: { precipitation: { mean: any; }; }) => sum + item.precipitation.mean, 0);
        const windSum = monthItems.reduce((sum: any, item: { wind: { mean: any; }; }) => sum + item.wind.mean, 0);
        const humiditySum = monthItems.reduce((sum: any, item: { humidity: { mean: any; }; }) => sum + item.humidity.mean, 0);
        
        return {
          month: monthNumber,
          monthName: monthNames[monthNumber - 1],
          temperature: {
            mean: tempSum / monthItems.length,
            min: Math.min(...monthItems.map((item: { temp: { record_min: any; }; }) => item.temp.record_min)),
            max: Math.max(...monthItems.map((item: { temp: { record_max: any; }; }) => item.temp.record_max))
          },
          precipitation: {
            mean: precipSum / monthItems.length,
            max: Math.max(...monthItems.map((item: { precipitation: { max: any; }; }) => item.precipitation.max))
          },
          wind: {
            mean: windSum / monthItems.length,
            max: Math.max(...monthItems.map((item: { wind: { max: any; }; }) => item.wind.max))
          },
          humidity: {
            mean: humiditySum / monthItems.length,
            min: Math.min(...monthItems.map((item: { humidity: { min: any; }; }) => item.humidity.min)),
            max: Math.max(...monthItems.map((item: { humidity: { max: any; }; }) => item.humidity.max))
          }
        };
      }).filter(Boolean);
      
      return {
        temperature: {
          labels: monthlyData.map(m => m?.monthName || ''),
          datasets: [
            {
              label: 'Average Temperature',
              data: monthlyData.map(m => convertTemperature(m?.temperature.mean || 0)),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: 'Record High',
              data: monthlyData.map(m => convertTemperature(m?.temperature.max || 0)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Record Low',
              data: monthlyData.map(m => convertTemperature(m?.temperature.min || 0)),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        },
        precipitation: {
          labels: monthlyData.map(m => m?.monthName || ''),
          datasets: [
            {
              label: 'Average Precipitation',
              data: monthlyData.map(m => m?.precipitation.mean || 0),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Maximum Precipitation',
              data: monthlyData.map(m => m?.precipitation.max || 0),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderDash: [5, 5],
            },
          ],
        },
        wind: {
          labels: monthlyData.map(m => m?.monthName || ''),
          datasets: [
            {
              label: 'Average Wind Speed',
              data: monthlyData.map(m => m?.wind.mean || 0),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: 'Maximum Wind Speed',
              data: monthlyData.map(m => m?.wind.max || 0),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderDash: [5, 5],
            },
          ],
        },
        humidity: {
          labels: monthlyData.map(m => m?.monthName || ''),
          datasets: [
            {
              label: 'Average Humidity',
              data: monthlyData.map(m => m?.humidity.mean || 0),
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
            {
              label: 'Maximum Humidity',
              data: monthlyData.map(m => m?.humidity.max || 0),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderDash: [5, 5],
            },
            {
              label: 'Minimum Humidity',
              data: monthlyData.map(m => m?.humidity.min || 0),
              borderColor: 'rgb(201, 203, 207)',
              backgroundColor: 'rgba(201, 203, 207, 0.5)',
              borderDash: [5, 5],
            },
          ],
        },
      };
    }
    
    // Handle monthly or daily aggregation (single object)
    const resultData = aggregation === 'year' ? null : data.result;
    
    if (!resultData) {
      return {
        temperature: { labels: [], datasets: [] },
        precipitation: { labels: [], datasets: [] },
        wind: { labels: [], datasets: [] },
        humidity: { labels: [], datasets: [] },
      };
    }
    
    // Safe access to nested properties with fallbacks
    const safeAccess = (obj: any, path: string[], defaultValue: any = 0) => {
      return path.reduce((prev, curr) => (prev && prev[curr] !== undefined) ? prev[curr] : defaultValue, obj);
    };
    
    // For monthly/daily aggregation, we'll use bar charts with multiple data points
    // showing different statistics for the same month/day
    const periodLabel = aggregation === 'month' 
      ? monthNames[month - 1]
      : `${monthNames[month - 1]} ${day}`;
    
    return {
      temperature: {
        labels: ['Mean', 'Record Max', 'Record Min', 'Avg Max', 'Avg Min'], 
        datasets: [
          {
            label: `Temperature for ${periodLabel}`,
            data: [
              convertTemperature(safeAccess(resultData, ['temp', 'mean'])),
              convertTemperature(safeAccess(resultData, ['temp', 'record_max'])),
              convertTemperature(safeAccess(resultData, ['temp', 'record_min'])),
              convertTemperature(safeAccess(resultData, ['temp', 'average_max'])),
              convertTemperature(safeAccess(resultData, ['temp', 'average_min']))
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',   // Mean - teal
              'rgba(255, 99, 132, 0.7)',   // Record Max - red
              'rgba(53, 162, 235, 0.7)',   // Record Min - blue
              'rgba(255, 159, 64, 0.7)',   // Avg Max - orange
              'rgba(201, 203, 207, 0.7)'   // Avg Min - gray
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(255, 99, 132)',
              'rgb(53, 162, 235)',
              'rgb(255, 159, 64)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }
        ],
      },
      precipitation: {
        labels: ['Mean', 'Maximum', 'Minimum', '25th Percentile', '75th Percentile'],
        datasets: [
          {
            label: `Precipitation for ${periodLabel}`,
            data: [
              safeAccess(resultData, ['precipitation', 'mean']),
              safeAccess(resultData, ['precipitation', 'max']),
              safeAccess(resultData, ['precipitation', 'min']),
              safeAccess(resultData, ['precipitation', 'p25']),
              safeAccess(resultData, ['precipitation', 'p75'])
            ],
            backgroundColor: [
              'rgba(53, 162, 235, 0.7)',   // Mean - blue
              'rgba(255, 99, 132, 0.7)',   // Maximum - red
              'rgba(75, 192, 192, 0.7)',   // Minimum - teal
              'rgba(153, 102, 255, 0.7)',  // 25th - purple
              'rgba(255, 159, 64, 0.7)'    // 75th - orange
            ],
            borderColor: [
              'rgb(53, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ],
            borderWidth: 1
          }
        ],
      },
      wind: {
        labels: ['Mean', 'Maximum', 'Minimum', '25th Percentile', '75th Percentile'],
        datasets: [
          {
            label: `Wind Speed for ${periodLabel}`,
            data: [
              safeAccess(resultData, ['wind', 'mean']),
              safeAccess(resultData, ['wind', 'max']),
              safeAccess(resultData, ['wind', 'min']),
              safeAccess(resultData, ['wind', 'p25']),
              safeAccess(resultData, ['wind', 'p75'])
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',   // Mean - teal
              'rgba(255, 99, 132, 0.7)',   // Maximum - red
              'rgba(53, 162, 235, 0.7)',   // Minimum - blue
              'rgba(153, 102, 255, 0.7)',  // 25th - purple
              'rgba(255, 159, 64, 0.7)'    // 75th - orange
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(255, 99, 132)',
              'rgb(53, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ],
            borderWidth: 1
          }
        ],
      },
      humidity: {
        labels: ['Mean', 'Maximum', 'Minimum', '25th Percentile', '75th Percentile'],
        datasets: [
          {
            label: `Humidity for ${periodLabel}`,
            data: [
              safeAccess(resultData, ['humidity', 'mean']),
              safeAccess(resultData, ['humidity', 'max']),
              safeAccess(resultData, ['humidity', 'min']),
              safeAccess(resultData, ['humidity', 'p25']),
              safeAccess(resultData, ['humidity', 'p75'])
            ],
            backgroundColor: [
              'rgba(153, 102, 255, 0.7)',  // Mean - purple
              'rgba(255, 159, 64, 0.7)',   // Maximum - orange
              'rgba(201, 203, 207, 0.7)',  // Minimum - gray
              'rgba(75, 192, 192, 0.7)',   // 25th - teal
              'rgba(255, 99, 132, 0.7)'    // 75th - red
            ],
            borderColor: [
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(201, 203, 207)',
              'rgb(75, 192, 192)',
              'rgb(255, 99, 132)'
            ],
            borderWidth: 1
          }
        ],
      },
    };
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
            const value = context.parsed.y || context.parsed; // Support both line and bar charts
            if (value === null || value === undefined) return `${label}: No data`;
            
            let unit = '';
            switch (activeChart) {
              case 'temperature': unit = getUnitSymbol('temp'); break;
              case 'precipitation': unit = getUnitSymbol('precip'); break;
              case 'wind': unit = getUnitSymbol('speed'); break;
              case 'humidity': unit = getUnitSymbol('humidity'); break;
            }
            
            return `${aggregation === 'year' ? label : context.label}: ${typeof value === 'number' ? value.toFixed(1) : value}${unit}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: activeChart === 'temperature' ? `Temperature (${getUnitSymbol('temp')})` :
                activeChart === 'precipitation' ? `Precipitation (${getUnitSymbol('precip')})` :
                activeChart === 'wind' ? `Wind Speed (${getUnitSymbol('speed')})` :
                `Humidity (${getUnitSymbol('humidity')})`,
        },
        beginAtZero: activeChart !== 'temperature', // Start at zero except for temperature
      },
      x: {
        title: {
          display: true,
          text: aggregation === 'year' ? 'Month' : 'Statistic',
        },
      },
    },
  };
  
  // Generate days for the selected month
  const getDaysInMonth = (month: number) => {
    // Create a date for the next month, then get the last day of the current month
    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
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
      <div className="p-4 bg-amber-50 text-amber-600 rounded-lg">
        <p>Error: {error}</p>
        <p className="mt-2 text-sm">
          Note: The Statistical Weather API may require a paid subscription. Check your OpenWeatherMap account to ensure you have access to this feature.
        </p>
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-lg">
        {/* Units selector */}
        <div className="flex items-center gap-2">
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

        {/* Aggregation selector */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Type:</label>
          <select
            value={aggregation}
            onChange={(e) => setAggregation(e.target.value as StatisticalAggregation)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="year">Annual Overview</option>
            <option value="month">Monthly Details</option>
            <option value="day">Daily Details</option>
          </select>
        </div>

        {/* Month selector (for month and day aggregation) */}
        {(aggregation === 'month' || aggregation === 'day') && (
          <div className="flex items-center gap-2">
            <label className="font-medium">Month:</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx + 1}>{name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Day selector (for day aggregation) */}
        {aggregation === 'day' && (
          <div className="flex items-center gap-2">
            <label className="font-medium">Day:</label>
            <select
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {getDaysInMonth(month).map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      {/* Chart type selector */}
      <div className="flex flex-wrap gap-2">
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
        <button
          onClick={() => setActiveChart('wind')}
          className={`px-4 py-2 rounded-lg ${
            activeChart === 'wind'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Wind
        </button>
        <button
          onClick={() => setActiveChart('humidity')}
          className={`px-4 py-2 rounded-lg ${
            activeChart === 'humidity'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Humidity
        </button>
      </div>

      {/* Statistical information display */}
      {data?.result ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">
            {activeChart === 'temperature' ? 'Temperature Statistics' :
             activeChart === 'precipitation' ? 'Precipitation Statistics' :
             activeChart === 'wind' ? 'Wind Speed Statistics' :
             'Humidity Statistics'}
          </h3>
          {/* Add error boundary to prevent crashes when chart data is incomplete */}
          <div className="relative min-h-[300px]">
            {(() => {
              try {
                const chart = chartData[activeChart];
                // Check if there's actual data to display
                const hasData = chart.datasets.some(dataset => 
                  dataset.data.some(value => value !== 0 && value !== null && !isNaN(value))
                );
                
                if (hasData) {
                  // Use Bar chart for monthly/daily data and Line chart for yearly data
                  return aggregation === 'year' ? (
                    <Line data={chart} options={chartOptions} />
                  ) : (
                    <Bar data={chart} options={chartOptions} />
                  );
                } else {
                  return (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No data available for this chart</p>
                    </div>
                  );
                }
              } catch (err) {
                console.error("Error rendering chart:", err);
                return (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
                    <p className="text-red-500">Error rendering chart</p>
                  </div>
                );
              }
            })()}
          </div>
          
          {/* Description text based on chart type */}
          <div className="text-sm text-gray-500 mt-4">
            {activeChart === 'temperature' && (
              <p>
                Shows temperature statistics {aggregation === 'year' ? 'throughout the year' : 
                  aggregation === 'month' ? `for ${monthNames[month-1]}` : 
                  `for ${monthNames[month-1]} ${day}`}. 
                Temperature is displayed in {units === 'metric' ? 'Celsius' : 
                  units === 'imperial' ? 'Fahrenheit' : 'Kelvin'}.
              </p>
            )}
            {activeChart === 'precipitation' && (
              <p>
                Shows precipitation statistics {aggregation === 'year' ? 'throughout the year' : 
                  aggregation === 'month' ? `for ${monthNames[month-1]}` : 
                  `for ${monthNames[month-1]} ${day}`}.
                Precipitation is measured in millimeters.
              </p>
            )}
            {activeChart === 'wind' && (
              <p>
                Shows wind speed statistics {aggregation === 'year' ? 'throughout the year' : 
                  aggregation === 'month' ? `for ${monthNames[month-1]}` : 
                  `for ${monthNames[month-1]} ${day}`}.
                Wind speed is measured in {units === 'imperial' ? 'miles per hour' : 'meters per second'}.
              </p>
            )}
            {activeChart === 'humidity' && (
              <p>
                Shows humidity statistics {aggregation === 'year' ? 'throughout the year' : 
                  aggregation === 'month' ? `for ${monthNames[month-1]}` : 
                  `for ${monthNames[month-1]} ${day}`}.
                Relative humidity is measured as a percentage.
              </p>
            )}
          </div>
          
          {/* Display sunshine hours if available (only in monthly data) */}
          {aggregation === 'month' && data.result && 'sunshine_hours' in data.result && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Sunshine Hours: </span>
              {data.result.sunshine_hours} hours
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow">
          <p>No statistical data available for this location</p>
          <p className="mt-2 text-sm">
            The Statistical Weather API may require a paid subscription. 
            Check your OpenWeatherMap account to ensure you have access to this feature.
          </p>
        </div>
      )}
    </div>
  );
}