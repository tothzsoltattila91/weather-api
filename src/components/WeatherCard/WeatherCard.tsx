import { CurrentWeatherCard, ForeCastWeatherCard } from './components';

interface ComponentProps {
  day: string;
  description: string;
  iconId: string;
  isForeCast: boolean;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
}

function WeatherCard(props: ComponentProps) {
  const { day, description, iconId, isForeCast, temperature, temperatureMin, temperatureMax } = props;

  return (
    <div>
      {isForeCast ? (
        <ForeCastWeatherCard
          day={day}
          iconId={iconId}
          temperatureMin={temperatureMin}
          temperatureMax={temperatureMax}
        />
      ) : (
        <CurrentWeatherCard description={description} temperature={temperature} iconId={iconId} />
      )}
    </div>
  );
}

export { WeatherCard };
