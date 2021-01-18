import { ChangeEvent, Component } from 'react';
import { ForeCastData } from '../../components/WeatherCard/interfaces';
import { Env } from '../../utils';
import { ForeCast } from './components';
import { HighlightedWeather } from './components/HighlightedWeather';
import { WeatherData } from './interfaces';

interface ActiveWeather extends WeatherData {
  isForeCast: boolean;
}

interface ComponentState {
  city: string;
  activeWeather: ActiveWeather;
  currentWeather: WeatherData | {};
  foreCasts: ForeCastData[];
}

interface CurrentWeatherApiResponse {
  coord: { lon: number; lat: number };
}

class WeatherLayout extends Component {
  state: ComponentState = {
    city: '',
    activeWeather: {
      isForeCast: false,
      description: 'fetching...',
      temperature: 0,
      temperatureMin: 0,
      temperatureMax: 0,
      day: '',
      iconId: '',
    },
    currentWeather: {},
    foreCasts: [],
  };

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleEnterHit);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleEnterHit);
  }

  fetchCurrentWeather(): Promise<Response> {
    return fetch(`${Env.weatherApiUrl}/weather?q=${this.state.city}&appid=${Env.weatherApiKey}`);
  }

  fetchForeCastWeather(lon: number, lat: number): Promise<Response> {
    return fetch(
      `${Env.weatherApiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${Env.weatherApiKey}`
    );
  }

  async fetchWeather() {
    const currentWeatherResponse = await this.fetchCurrentWeather();
    const currentWeatherData: CurrentWeatherApiResponse = await currentWeatherResponse.json();
    const { lon, lat } = currentWeatherData.coord;

    const foreCastWeatherResponse = await this.fetchForeCastWeather(lon, lat);
    const foreCastWeather = await foreCastWeatherResponse.json();

    console.log('currentWeather: ', currentWeatherData);
    console.log('foreCastWeather: ', foreCastWeather);
  }

  handleEnterHit = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.fetchWeather();
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
        <HighlightedWeather onWeatherHighlight={this.handleWeatherHighlight} activeWeather={activeWeather} />
        <ForeCast onWeatherHighlight={this.handleWeatherHighlight} foreCasts={foreCasts} />
        <footer>Weather App</footer>
      </div>
    );
  }
}

export { WeatherLayout };
