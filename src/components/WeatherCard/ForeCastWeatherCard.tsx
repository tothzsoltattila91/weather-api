import { WeatherData } from '../../modules/WeatherLayout/interfaces';
import { Env } from '../../utils';
import './styles.css';

interface ComponentProps extends WeatherData {
  isActive: boolean;
}

function ForeCastWeatherCard(props: ComponentProps) {
  const { iconId, temperatureMin, temperatureMax, day, isActive } = props;

  return (
    <div
      className="FCCard"
      style={{
        border: isActive ? '2px solid #EC9C4C' : '2px solid #fff',
      }}
    >
      <div>{day.slice(0, 3)}</div>
      <img className="FCIcon" alt="weather_image" src={`${Env.weatherIconsUrl}/${iconId}@2x.png`} />
      <div className="FCTemps">
        <div>{temperatureMin}°C</div>
        <div>{temperatureMax}°C</div>
      </div>
    </div>
  );
}

export { ForeCastWeatherCard };
