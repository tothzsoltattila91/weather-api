import { Env } from '../../utils';
import { DAYS } from '../../utils/contants';
import { WeatherData } from './interfaces';

interface CurrentWeatherApiResponse {
  coord: { lon: number; lat: number };
  main: { temp: number; temp_min: number; temp_max: number; humidity: number };
  wind: { speed: number };
  weather: Array<{ icon: string; main: string }>;
}

interface ForeCastWeatherApiData {
  temp: { min: number; max: number };
  weather: Array<{ icon: string; main: string }>;
  humidity: number;
  wind_speed: number;
}

interface ForeCastWeatherApiResponse {
  daily: Array<ForeCastWeatherApiData>;
}

function formatCurrentWeatherData(currentWeatherData: CurrentWeatherApiResponse): WeatherData {
  const { main, weather, wind } = currentWeatherData;
  const date = new Date();

  return {
    temperature: Math.round(main.temp),
    temperatureMin: Math.round(main.temp_min),
    temperatureMax: Math.round(main.temp_max),
    day: DAYS[date.getDay()],
    iconId: weather[0].icon,
    description: weather[0].main,
    humidity: main.humidity,
    windSpeed: wind.speed,
    id: 0,
  };
}

function formatForeCastWeatherData(foreCastWeatherData: ForeCastWeatherApiResponse): Array<WeatherData> {
  const formattedForeCastWeatherData: Array<WeatherData> = [];
  const date = new Date();

  foreCastWeatherData.daily.forEach((data: ForeCastWeatherApiData, index: number) => {
    const {
      temp: { min, max },
      weather,
      wind_speed,
      humidity,
    } = data;

    formattedForeCastWeatherData.push({
      temperature: Math.round((min + max) / 2),
      temperatureMin: Math.round(min),
      temperatureMax: Math.round(max),
      day: DAYS[(date.getDay() + index) % 7],
      iconId: weather[0].icon,
      description: weather[0].main,
      humidity,
      windSpeed: wind_speed,
      id: index,
    });
  });

  return formattedForeCastWeatherData;
}

function fetchCurrentWeather(city: string): Promise<Response> {
  return fetch(`${Env.weatherApiUrl}/weather?q=${city}&units=metric&appid=${Env.weatherApiKey}`);
}

function fetchForeCastWeather(lon: number, lat: number): Promise<Response> {
  return fetch(
    `${Env.weatherApiUrl}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${Env.weatherApiKey}`
  );
}

async function fetchForeCasts(city: string): Promise<Array<WeatherData>> {
  const currentWeatherResponse = await fetchCurrentWeather(city);

  const currentWeatherData: CurrentWeatherApiResponse = await currentWeatherResponse.json();
  const { lon, lat } = currentWeatherData.coord;

  const foreCastWeatherResponse = await fetchForeCastWeather(lon, lat);
  const foreCastData = await foreCastWeatherResponse.json();

  const foreCast = formatForeCastWeatherData(foreCastData);
  foreCast[0] = {
    ...formatCurrentWeatherData(currentWeatherData),
    temperatureMin: foreCast[0].temperatureMin,
    temperatureMax: foreCast[0].temperatureMax,
  };

  return foreCast;
}

export { fetchForeCasts };
