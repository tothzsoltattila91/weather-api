import { ChangeEvent, Component } from "react";
import { ForeCastData } from "../../components/WeatherCard/interfaces";
import { ForeCast } from "./components";
import { HighlightedWeather } from "./components/HighlightedWeather";
import { WeatherData } from "./interfaces";

interface ActiveWeather extends WeatherData {
  isForeCast: boolean;
}

interface ComponentState {
  city: string;
  activeWeather: ActiveWeather | {};
  currentWeather: WeatherData | {};
  foreCasts: ForeCastData[];
}

class WeatherLayout extends Component {
  state: ComponentState = {
    city: "",
    activeWeather: {},
    currentWeather: {},
    foreCasts: [],
  };

  componentDidMount(): void {
    window.addEventListener("keydown", this.handleEnterHit);
  }

  componentWillUnmount(): void {
    window.removeEventListener("keydown", this.handleEnterHit);
  }

  handleEnterHit = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      console.log("submit city");
    }
  };

  handleCityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ city: event.target.value });
  };

  handleWeatherHighlight = (index?: number): void => {
    const activeWeather = index
      ? { ...this.state.foreCasts[index], isForeCast: true }
      : { ...this.state.currentWeather, isForeCast: false };

    this.setState({ activeWeather });
  };

  render() {
    const { activeWeather, city, foreCasts } = this.state;

    return (
      <div>
        <header>Weather forecast</header>
        <input value={city} onChange={this.handleCityChange} />
        <HighlightedWeather
          onWeatherHighlight={this.handleWeatherHighlight}
          activeWeather={activeWeather}
        />
        <ForeCast
          onWeatherHighlight={this.handleWeatherHighlight}
          foreCasts={foreCasts}
        />
        <footer>Weather App</footer>
      </div>
    );
  }
}

export { WeatherLayout };
