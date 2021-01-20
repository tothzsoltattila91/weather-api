import { ForeCastWeatherCard } from '../../../components/WeatherCard/ForeCastWeatherCard';
import { WeatherData } from '../interfaces';

interface ComponentProps {
  foreCasts: WeatherData[];
  activeWeather: number;
  onWeatherHighlight(index: number): void;
}

function ForeCast({ foreCasts, onWeatherHighlight, activeWeather }: ComponentProps) {
  return (
    <div className="forecasts">
      {foreCasts.map((foreCast: WeatherData, index: number) => (
        <div key={index} onClick={() => onWeatherHighlight(index)}>
          <ForeCastWeatherCard {...foreCast} isActive={index === activeWeather} />
        </div>
      ))}
    </div>
  );
}

export { ForeCast };
