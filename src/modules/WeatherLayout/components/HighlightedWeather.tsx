import { CurrentWeatherCard } from "../../../components/WeatherCard/components/CurrentWeatherCard";
import { ForeCastWeatherCard } from "../../../components/WeatherCard/components/ForeCastWeatherCard";
import { WeatherData } from "../interfaces";

interface ComponentProps {
  activeWeater: WeatherData & {isForeCast: boolean};
  onWeatherHighlight(index?: number):void;
}

function HighlightedWeather({ activeWeater, onWeatherHighlight }: ComponentProps) {
  const {
    temperatureMin,
    temperatureMax,
    iconId,
    day,
    temperature,
    description,
    isForeCast,
  } = activeWeater;

  return (
    <div>
      {!isForeCast && <button onClick={() => onWeatherHighlight()}>Hightlight current</button>}
      {isForeCast ? (
        <ForeCastWeatherCard
          day={day}
          iconId={icondId}
          temperatureMin={temperatureMin}
          temperatureMax={temperatureMax}
        />
      ) : (
        <CurrentWeatherCard
          description={description}
          iconId={iconId}
          temperature={temperature}
        />
      )}
    </div>
  );
}

export { HighlightedWeather };
