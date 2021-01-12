import { WeatherIcon } from './WeatherIcon';

interface ComponentProps {
  description: string;
  iconId: string;
  temperature: number;
}

function CurrentWeatherCard(props: ComponentProps) {
  const { description, iconId, temperature } = props;

  return (
    <div>
      <WeatherIcon iconId={iconId} />
      <div>{description}</div>
      <div>{temperature}°</div>
    </div>
  );
}

export { CurrentWeatherCard };
