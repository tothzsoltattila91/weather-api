import { RestClient } from '../../utils';
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
    iconUrl: `${process.env.REACT_APP_ICONS_URL}/${weather[0].icon}@2x.png`,
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
      iconUrl: `${process.env.REACT_APP_ICONS_URL}/${weather[0].icon}@2x.png`,
      description: weather[0].main,
      humidity,
      windSpeed: wind_speed,
      id: index,
    });
  });

  return formattedForeCastWeatherData;
}

function fetchCurrentWeather(city: string): Promise<CurrentWeatherApiResponse> {
  return RestClient.get<CurrentWeatherApiResponse>(
    `${process.env.REACT_APP_WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
}

function fetchForeCastWeather(lon: number, lat: number): Promise<ForeCastWeatherApiResponse> {
  return RestClient.get<ForeCastWeatherApiResponse>(
    `${process.env.REACT_APP_WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
}

async function fetchForeCasts(city: string): Promise<Array<WeatherData>> {
  const currentWeatherData = await fetchCurrentWeather(city);
  const { lon, lat } = currentWeatherData.coord;

  const foreCastData = await fetchForeCastWeather(lon, lat);

  //foreCastApi call doesn't contain current weather, needs to be reassigned with current weather call data in forecast array
  const foreCast = formatForeCastWeatherData(foreCastData);
  foreCast[0] = {
    ...formatCurrentWeatherData(currentWeatherData),
    temperatureMin: foreCast[0].temperatureMin,
    temperatureMax: foreCast[0].temperatureMax,
  };

  return foreCast;
}

export { fetchForeCasts };
