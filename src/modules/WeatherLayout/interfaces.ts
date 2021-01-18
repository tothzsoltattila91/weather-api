import { ForeCastData } from "../../components/WeatherCard/interfaces";

interface WeatherData extends ForeCastData {
  temperature: number;
  description: string;
}

export type { WeatherData };
