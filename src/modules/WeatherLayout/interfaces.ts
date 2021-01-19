interface WeatherData {
  day: string;
  iconId: string;
  temperatureMin: number;
  temperatureMax: number;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export type { WeatherData };
