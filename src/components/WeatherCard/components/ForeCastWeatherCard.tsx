import { WeatherIcon } from './WeatherIcon';

interface ComponentProps {
  iconId: string;
  temperatureMin: number;
  temperatureMax: number;
}

function ForeCastWeatherCard(props: ComponentProps) {
  const { iconId, temperatureMin, temperatureMax } = props;

  return (
    <div>
      <WeatherIcon iconId={iconId} />
      <div>
        <span>{temperatureMin}°</span>
        <span>{temperatureMax}°</span>
      </div>
    </div>
  );
}

export { ForeCastWeatherCard };
