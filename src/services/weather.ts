interface AccumulatedTemperature {
  date: string;
  temp: number;
  count: number;
}

interface AccumulatedPrecipitation {
  date: string;
  rain: number;
  count: number;
}

interface WeatherApiError {
  code: number;
  message: string;
}

interface AccumulatedTemperatureResponse {
  message: string;
  cod: string;
  city_id: number;
  calctime: number;
  list: AccumulatedTemperature[];
}

interface AccumulatedPrecipitationResponse {
  message: string;
  cod: string;
  city_id: number;
  calctime: number;
  list: AccumulatedPrecipitation[];
}

interface DailyForecastTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface DailyForecastFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface DailyForecastWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface DailyForecastItem {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: DailyForecastTemp;
  feels_like: DailyForecastFeelsLike;
  pressure: number;
  humidity: number;
  weather: DailyForecastWeather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
}

interface DailyForecastCity {
  id: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  country: string;
  population: number;
  timezone: number;
}

interface DailyForecastResponse {
  city: DailyForecastCity;
  cod: string;
  message: number;
  cnt: number;
  list: DailyForecastItem[];
}

interface StatisticalWeatherData {
  month: number;
  day?: number;
  temp: {
    record_min: number;
    record_max: number;
    average_min: number;
    average_max: number;
    median: number;
    mean: number;
    p25: number;
    p75: number;
    st_dev: number;
    num: number;
  };
  pressure: {
    min: number;
    max: number;
    median: number;
    mean: number;
    p25: number;
    p75: number;
    st_dev: number;
    num: number;
  };
  humidity: {
    min: number;
    max: number;
    median: number;
    mean: number;
    p25: number;
    p75: number;
    st_dev: number;
    num: number;
  };
  wind: {
    min: number;
    max: number;
    median: number;
    mean: number;
    p25: number;
    p75: number;
    st_dev: number;
    num: number;
  };
  precipitation: {
    min: number;
    max: number;
    median: number;
    mean: number;
    p25: number;
    p75: number;
    st_dev: number;
    num: number;
  };
  clouds: {
    min: number;
    max: number;
    median: number;
    mean: number;
    p25: number;
    p75: number;
    st_dev: number;
    num: number;
  };
  sunshine_hours?: number; // Only available for monthly aggregation
}

interface StatisticalWeatherYearlyResponse {
  cod: number;
  city_id: number;
  calctime: number;
  result: StatisticalWeatherData[];
}

interface StatisticalWeatherMonthlyResponse {
  cod: number;
  city_id: number;
  calctime: number;
  result: StatisticalWeatherData;
}

interface StatisticalWeatherDailyResponse {
  cod: number;
  city_id: number;
  calctime: number;
  result: StatisticalWeatherData;
}

export type StatisticalAggregation = 'year' | 'month' | 'day';

export type Units = 'standard' | 'metric' | 'imperial';
export type Lang = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ru' | 'zh_cn' | 'ja' | 'kr' | 'ar' | 'tr' | 'nl' | 'pl' | 'pt' | 'ro' | 'sv' | 'uk' | 'bg' | 'ca' | 'da' | 'el' | 'fa' | 'fi' | 'gl' | 'he' | 'hi' | 'hu' | 'id' | 'lt' | 'sk' | 'sl' | 'vi' | 'th' | 'zu';

export async function getAccumulatedTemperature(
  lat: number,
  lon: number,
  start: number,
  end: number,
  apiKey: string,
  threshold?: number
): Promise<AccumulatedTemperature[]> {
  const url = `https://history.openweathermap.org/data/2.5/history/accumulated_temperature?lat=${lat}&lon=${lon}&start=${start}&end=${end}${
    threshold ? `&threshold=${threshold}` : ''
  }&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || 'code' in data) {
    const error = data as WeatherApiError;
    if (error.code === 404000) {
      return [];
    }
    throw new Error(error.message || 'Failed to fetch accumulated temperature data');
  }

  // Handle successful response
  const result = data as AccumulatedTemperatureResponse;
  return result.list || [];
}

export async function getAccumulatedPrecipitation(
  lat: number,
  lon: number,
  start: number,
  end: number,
  apiKey: string
): Promise<AccumulatedPrecipitation[]> {
  const url = `https://history.openweathermap.org/data/2.5/history/accumulated_precipitation?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || 'code' in data) {
    const error = data as WeatherApiError;
    if (error.code === 404000) {
      return [];
    }
    throw new Error(error.message || 'Failed to fetch accumulated precipitation data');
  }

  // Handle successful response
  const result = data as AccumulatedPrecipitationResponse;
  return result.list || [];
}

export async function getDailyForecast(
  lat: number,
  lon: number,
  apiKey: string,
  options?: {
    cnt?: number;
    units?: Units;
    lang?: Lang;
  }
): Promise<DailyForecastResponse> {
  const { cnt = 7, units = 'metric', lang = 'en' } = options || {};
  
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=${units}&lang=${lang}&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch daily forecast data');
  }

  return data;
}

export async function getStatisticalWeather(
  lat: number,
  lon: number,
  apiKey: string,
  options?: {
    aggregation?: StatisticalAggregation;
    month?: number; // Required for month and day aggregation
    day?: number; // Required for day aggregation
    units?: Units; // Not actually used in the API, just for client display
  }
): Promise<StatisticalWeatherYearlyResponse | StatisticalWeatherMonthlyResponse | StatisticalWeatherDailyResponse> {
  const { aggregation = 'year', month, day, units = 'metric' } = options || {};
  
  let url = `https://history.openweathermap.org/data/2.5/aggregated/${aggregation}?lat=${lat}&lon=${lon}`;
  
  if (aggregation === 'month' || aggregation === 'day') {
    if (!month) {
      throw new Error('Month parameter is required for monthly and daily aggregation');
    }
    url += `&month=${month}`;
    
    if (aggregation === 'day') {
      if (!day) {
        throw new Error('Day parameter is required for daily aggregation');
      }
      url += `&day=${day}`;
    }
  }
  
  url += `&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch statistical weather data');
  }

  // Transform the data to match the expected interface from our components
  return data;
}