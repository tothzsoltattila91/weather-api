import { WeatherData } from '../../modules/WeatherLayout/interfaces';
import { Env } from '../../utils';
import './styles.css';

interface ComponentProps extends WeatherData {
  isForeCast: boolean;
}

function HighlightedWeatherCard(props: ComponentProps) {
  const { description, iconId, temperature, temperatureMin, temperatureMax, humidity, windSpeed, isForeCast } = props;

  return (
    <div className="weatherCard">
      <img alt="weather_image" src={`${Env.weatherIconsUrl}/${iconId}@2x.png`} />
      <div>{description}</div>
      <div>{temperature}°</div>
      {isForeCast && (
        <>
          <div>{temperatureMax}</div>
          <div>{temperatureMin}</div>
        </>
      )}
      <div>humidity: {humidity}%</div>
      <div>windspeed: {windSpeed}km/h</div>
    </div>
  );
}

export { HighlightedWeatherCard };
