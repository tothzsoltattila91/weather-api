import { ForeCastWeatherCard } from "../../../components/WeatherCard/components/ForeCastWeatherCard";
import { ForeCastData } from "../../../components/WeatherCard/interfaces";

interface ComponentProps {
  foreCasts: ForeCastData[];
  onWeatherHighlight(index: number): void;
}

function ForeCast({ foreCasts, onWeatherHighlight }: ComponentProps) {
  return (
    <div>
      {foreCasts.map((foreCast: ForeCastData, index: number) => (
        <div key={index} onClick={() => onWeatherHighlight(index)}>
          <ForeCastWeatherCard {...foreCast} />
        </div>
      ))}
    </div>
  );
}

export { ForeCast };
