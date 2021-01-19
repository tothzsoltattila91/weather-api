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
      className="weatherCard"
      style={{
        flexDirection: 'row',
        borderRadius: '10px',
        border: isActive ? '2px solid #E27D60' : 'none',
      }}
    >
      <div>{day}</div>
      <img alt="weather_image" src={`${Env.weatherIconsUrl}/${iconId}@2x.png`} />
      <div>
        <span>{temperatureMin}°</span>
        <span>{temperatureMax}°</span>
      </div>
    </div>
  );
}

export { ForeCastWeatherCard };
