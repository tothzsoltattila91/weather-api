import { ForeCastData } from "../interfaces";
import { WeatherIcon } from "./WeatherIcon";

function ForeCastWeatherCard(props: ForeCastData) {
  const { iconId, temperatureMin, temperatureMax, day } = props;

  return (
    <div>
      <div>{day}</div>
      <WeatherIcon iconId={iconId} />
      <div>
        <span>{temperatureMin}°</span>
        <span>{temperatureMax}°</span>
      </div>
    </div>
  );
}

export { ForeCastWeatherCard };
