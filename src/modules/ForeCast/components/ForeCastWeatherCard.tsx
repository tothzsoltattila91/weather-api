import { WeatherData } from '../interfaces';
import { Env } from '../../../utils';
import './styles.css';

interface ComponentProps {
  foreCast: WeatherData;
  isActive: boolean;
  onClick(): void;
}

function ForeCastWeatherCard(props: ComponentProps) {
  const {
    foreCast: { iconId, temperatureMin, temperatureMax, day },
    isActive,
    onClick,
  } = props;

  return (
    <div
      className="FCCard"
      style={{
        border: isActive ? '2px solid #509ffb' : '2px solid rgba(72, 72, 74, 0.6)',
      }}
      onClick={onClick}
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
