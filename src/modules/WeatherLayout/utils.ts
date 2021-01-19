import { DAYS } from '../../utils/contants';

function formatCurrentWeatherData(currentWeatherData: any) {
  const { main, weather, wind } = currentWeatherData;
  const date = new Date();

  return {
    temperature: Math.round(main.temp),
    temperatureMin: Math.round(main.temp_min),
    temperatureMax: Math.round(main.temp_max),
    day: DAYS[date.getDay()],
    iconId: weather[0].icon,
    description: weather[0].description,
    humidity: main.humidity,
    windSpeed: wind.speed,
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
      humidity
    } = data;

    formattedForeCastWeatherData.push({
      temperature: Math.round((min + max) / 2),
      temperatureMin: Math.round(min),
      temperatureMax: Math.round(max),
      day: DAYS[(date.getDay() + index) % 7],
      iconId: weather[0].icon,
      description: weather[0].description,
      humidity,
      windSpeed: wind_speed
    });
  });

  return formattedForeCastWeatherData;
}

export { formatCurrentWeatherData, formatForeCastWeatherData };
