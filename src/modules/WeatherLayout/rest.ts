import { Env } from '../../utils';
import { DAYS } from '../../utils/contants';

// ezt bővíteni
interface CurrentWeatherApiResponse {
  coord: { lon: number; lat: number };
}

function formatCurrentWeatherData(currentWeatherData: any) {
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

function formatForeCastWeatherData(foreCastWeatherData: any) {
  const formattedForeCastWeatherData: Array<any> = [];
  const date = new Date();

  foreCastWeatherData.daily.forEach((data: any, index: number) => {
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

async function fetchForeCasts(city: string) {
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
