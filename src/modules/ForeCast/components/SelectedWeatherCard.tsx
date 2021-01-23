import { WeatherData } from '../interfaces';
import './styles.css';

interface ComponentProps {
  selectedWeather: WeatherData;
  cityOfForeCast: string;
}

function SelectedWeatherCard({ selectedWeather, cityOfForeCast }: ComponentProps) {
  const {
    description,
    iconUrl,
    temperature,
    temperatureMin,
    temperatureMax,
    humidity,
    windSpeed,
    day,
  } = selectedWeather;

  return (
    <div className="SCard">
      <div className="SIconBlock">
        <div className="SDescription">
          <div className="SCityText">{cityOfForeCast}</div>
          <div>{day}</div>
          <div>{description}</div>
        </div>
        <img className="SIcon" alt="weather_image" src={iconUrl} />
        <div className="STemperature">{temperature}°C</div>
      </div>
      <table className="SMiscColumn">
        <tbody>
          <tr>
            <td>Humidity</td>
            <td>{humidity}%</td>
          </tr>
          <tr>
            <td>Windspeed</td>
            <td>{windSpeed} km/h</td>
          </tr>
          <tr>
            <td>Min. temperature </td>
            <td>{temperatureMin}°C</td>
          </tr>
          <tr>
            <td>Max. temperature</td>
            <td>{temperatureMax}°C</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { SelectedWeatherCard };
