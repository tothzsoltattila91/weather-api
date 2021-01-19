import { Env } from '../../utils';

function fetchCurrentWeather(city: string): Promise<Response> {
  return fetch(`${Env.weatherApiUrl}/weather?q=${city}&units=metric&appid=${Env.weatherApiKey}`);
}

function fetchForeCastWeather(lon: number, lat: number): Promise<Response> {
  return fetch(
    `${Env.weatherApiUrl}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${Env.weatherApiKey}`
  );
}

export { fetchCurrentWeather, fetchForeCastWeather };
