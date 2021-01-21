import { ChangeEvent, Component } from 'react';
import { Spinner } from '../../components/Spinner';
import { HighlightedWeatherCard } from '../../components/WeatherCard';
import { CityField, ForeCast } from './components';
import { WeatherData } from './interfaces';
import { fetchCurrentWeather, fetchForeCastWeather } from './rest';
import { formatCurrentWeatherData, formatForeCastWeatherData } from './utils';
import './styles.css';

interface ComponentState {
  city: string;
  highlightedWeather: WeatherData & { isForeCast: boolean };
  currentWeather: WeatherData | {};
  foreCasts: WeatherData[];
  isLoading: boolean;
  isFetched: boolean;
  activeWeather: number;
  cityIsNotExisting: boolean;
}

interface CurrentWeatherApiResponse {
  coord: { lon: number; lat: number };
}

class WeatherLayout extends Component {
  state: ComponentState = {
    city: '',
    highlightedWeather: {
      description: 'fetching...',
      temperature: 0,
      temperatureMin: 0,
      temperatureMax: 0,
      day: '',
      iconId: '',
      humidity: 0,
      windSpeed: 0,
      isForeCast: false,
    },
    currentWeather: {},
    foreCasts: [],
    isFetched: false,
    isLoading: false,
    activeWeather: 0,
    cityIsNotExisting: false,
  };

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleEnterHit);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleEnterHit);
  }

  async fetchWeather() {
    const currentWeatherResponse = await fetchCurrentWeather(this.state.city);
    if (currentWeatherResponse.status === 404) {
      this.setState({ isLoading: false, isFetched: false, cityIsNotExisting: true });
    } else {
      const currentWeatherData: CurrentWeatherApiResponse = await currentWeatherResponse.json();
      const { lon, lat } = currentWeatherData.coord;

      const foreCastWeatherResponse = await fetchForeCastWeather(lon, lat);
      const foreCastData = await foreCastWeatherResponse.json();

      const currentWeather = formatCurrentWeatherData(currentWeatherData);
      this.setState({
        currentWeather,
        foreCasts: formatForeCastWeatherData(foreCastData),
        highlightedWeather: currentWeather,
        isLoading: false,
        isFetched: true,
        cityIsNotExisting: false,
      });
    }
  }

  handleSearch = () => {
    if (this.state.city.length > 0) {
      this.setState({ isLoading: true }, () => this.fetchWeather());
    }
  };

  handleEnterHit = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleCityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ city: event.target.value });
  };

  handleWeatherHighlight = (index: number): void => {
    const highlightedWeather = index
      ? { ...this.state.foreCasts[index], isForeCast: true }
      : { ...this.state.currentWeather, isForeCast: false };

    this.setState({ highlightedWeather, activeWeather: index });
  };

  render() {
    const { highlightedWeather, city, foreCasts, isFetched, isLoading, activeWeather, cityIsNotExisting } = this.state;

    return (
      <div>
        <header>Weather forecast</header>
        <div className="weatherLayout">
          <CityField value={city} onFieldChange={this.handleCityChange} onSearch={this.handleSearch} />
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {cityIsNotExisting && <div className="cityNotFound">City is not found, try another one.</div>}
              {isFetched && <HighlightedWeatherCard {...highlightedWeather} />}
              {isFetched && (
                <ForeCast
                  activeWeather={activeWeather}
                  foreCasts={foreCasts}
                  onWeatherHighlight={this.handleWeatherHighlight}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export { WeatherLayout };
