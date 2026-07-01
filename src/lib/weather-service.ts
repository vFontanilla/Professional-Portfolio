import { getTimezoneOffset } from "date-fns-tz";
import type { CurrentWeatherResponse, HourlyForecastResponse, ForecastEntry, Coordinates, CitySuggestion } from "@/types/weather";

const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? "";

interface WeatherApiCondition {
  text: string;
  icon: string;
}

interface WeatherApiLocation {
  name: string;
  region?: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
  tz_id: string;
}

interface WeatherApiCurrent {
  condition: WeatherApiCondition;
  temp_c: number;
  feelslike_c: number;
  pressure_mb: number;
  humidity: number;
  wind_kph: number;
  wind_degree: number;
  last_updated: string;
  last_updated_epoch: number;
}

interface WeatherApiHour {
  time: string;
  time_epoch: number;
  temp_c: number;
  feelslike_c: number;
  pressure_mb: number;
  humidity: number;
  wind_kph: number;
  wind_degree: number;
  chance_of_rain?: number;
  condition: WeatherApiCondition;
}

interface WeatherApiForecastDay {
  hour: WeatherApiHour[];
  astro: {
    sunrise: string;
    sunset: string;
  };
}

interface WeatherApiForecastResponse {
  location: WeatherApiLocation;
  current: WeatherApiCurrent;
  forecast: {
    forecastday: WeatherApiForecastDay[];
  };
}

interface WeatherApiCurrentResponse {
  location: WeatherApiLocation;
  current: WeatherApiCurrent;
}

interface WeatherApiSearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherApiErrorResponse {
  error?: {
    message?: string;
  };
}

function getApiKey(): string {
  if (!API_KEY) {
    throw new Error("Weather API key is not configured.");
  }

  return API_KEY;
}

function getIconUrl(icon: string): string {
  return icon.startsWith("//") ? `https:${icon}` : icon;
}

function mapHourToForecastEntry(entry: WeatherApiHour): ForecastEntry {
  return {
    dt: entry.time_epoch,
    main: {
      temp: entry.temp_c,
      feels_like: entry.feelslike_c,
      temp_min: entry.temp_c,
      temp_max: entry.temp_c,
      pressure: entry.pressure_mb,
      humidity: entry.humidity,
    },
    weather: [
      {
        main: entry.condition.text,
        description: entry.condition.text,
        icon: getIconUrl(entry.condition.icon),
      },
    ],
    wind: { speed: entry.wind_kph, deg: entry.wind_degree },
    pop: (entry.chance_of_rain ?? 0) / 100,
    dt_txt: entry.time,
  };
}

function mapCurrentWeather(data: WeatherApiCurrentResponse): CurrentWeatherResponse {
  return {
    coord: { lon: data.location.lon, lat: data.location.lat },
    weather: [
      {
        main: data.current.condition.text,
        description: data.current.condition.text,
        icon: getIconUrl(data.current.condition.icon),
      },
    ],
    main: {
      temp: data.current.temp_c,
      feels_like: data.current.feelslike_c,
      temp_min: data.current.temp_c,
      temp_max: data.current.temp_c,
      pressure: data.current.pressure_mb,
      humidity: data.current.humidity,
    },
    wind: { speed: data.current.wind_kph, deg: data.current.wind_degree },
    dt: data.current.last_updated_epoch,
    sys: { country: data.location.country },
    name: data.location.name,
    localtime: data.location.localtime,
  };
}

async function parseWeatherResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    const errorData = text.trim().startsWith("{")
      ? (JSON.parse(text) as WeatherApiErrorResponse)
      : {};
    const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${text || "Unknown error"}`;

    throw new Error(errorMessage);
  }

  return JSON.parse(text) as T;
}

export async function fetchCurrentWeatherByCity(city: string): Promise<CurrentWeatherResponse> {
  const url = `${BASE_URL}/current.json?key=${getApiKey()}&q=${encodeURIComponent(city)}`;
  const response = await fetch(url);
  const data = await parseWeatherResponse<WeatherApiCurrentResponse>(response);

  return mapCurrentWeather(data);
}

export async function fetchHourlyForecastByCity(city: string): Promise<HourlyForecastResponse> {
  const url = `${BASE_URL}/forecast.json?key=${getApiKey()}&q=${encodeURIComponent(city)}&days=1&aqi=no&alerts=no`;
  const response = await fetch(url);
  const data = await parseWeatherResponse<WeatherApiForecastResponse>(response);
  const forecastDay = data.forecast.forecastday[0];
  const list: ForecastEntry[] = forecastDay.hour.map(mapHourToForecastEntry);

  const timezoneOffset = getTimezoneOffset(data.location.tz_id, new Date()) / 1000;

  return {
    list,
    city: { name: data.location.name, coord: { lon: data.location.lon, lat: data.location.lat }, country: data.location.country, timezone: timezoneOffset, sunrise: forecastDay.astro.sunrise, sunset: forecastDay.astro.sunset },
  };
}

export async function fetchAutocompleteWeatherByCity(city: string): Promise<CitySuggestion[]> {
  const url = `${BASE_URL}/search.json?key=${getApiKey()}&q=${encodeURIComponent(city)}`;
  const response = await fetch(url);
  const data = await parseWeatherResponse<WeatherApiSearchResult[]>(response);

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    lat: item.lat,
    lon: item.lon,
    region: item.region,
    country: item.country,
  }));
}

export async function fetchWeatherByCoords(coords: Coordinates): Promise<{ current: CurrentWeatherResponse; forecast: HourlyForecastResponse }> {
  const { lat, lon } = coords;
  const url = `${BASE_URL}/forecast.json?key=${getApiKey()}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;
  const response = await fetch(url);
  const data = await parseWeatherResponse<WeatherApiForecastResponse>(response);

  const forecastDay = data.forecast.forecastday[0];
  const current = mapCurrentWeather(data);
  const hourlyData = data.forecast.forecastday[0].hour.slice(0, 8);
  const forecastList: ForecastEntry[] = hourlyData.map(mapHourToForecastEntry);

  const timezoneOffset = getTimezoneOffset(data.location.tz_id, new Date()) / 1000;

  return {
    current,
    forecast: { list: forecastList, city: { name: data.location.name, coord: { lat: data.location.lat, lon: data.location.lon }, country: data.location.country, timezone: timezoneOffset, sunrise: forecastDay.astro.sunrise, sunset: forecastDay.astro.sunset } },
  };
}
