import { WeatherData } from '../../modules/WeatherLayout/interfaces';
import { Env } from '../../utils';
import './styles.css';

interface ComponentProps extends WeatherData {
  isForeCast: boolean;
}

function HighlightedWeatherCard(props: ComponentProps) {
  const {
    description,
    iconId,
    temperature,
    temperatureMin,
    temperatureMax,
    humidity,
    windSpeed,
    isForeCast,
    day,
  } = props;

  return (
    <div className="HLCard">
      <div className="HLIconBlock">
        <div className="HLDescription">
          <div>{day}</div>
          <div>{description}</div>
        </div>
        <img className="HLIcon" alt="weather_image" src={`${Env.weatherIconsUrl}/${iconId}@2x.png`} />
        <div>{temperature}°C</div>
      </div>
      <div className="HLMiscColumn">
        <div>Humidity: {humidity}%</div>
        <div>Windspeed: {windSpeed}km/h</div>
        {isForeCast && (
          <>
            <div>Min. temperature: {temperatureMax}°C</div>
            <div>Max. temperature: {temperatureMin}°C</div>
          </>
        )}
      </div>
    </div>
  );
}

export { HighlightedWeatherCard };
