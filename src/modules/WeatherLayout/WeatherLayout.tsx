import { ChangeEvent, Component, FormEvent } from 'react';
import { Spinner } from '../../components/Spinner';
import { SelectedWeatherCard } from './components';
import { ForeCastWeatherCard } from './components';
import { WeatherData } from './interfaces';
import { fetchForeCasts } from './rest';
import './styles.css';

interface ComponentState {
  city: string;
  selectedWeather: WeatherData | null;
  foreCasts: WeatherData[];
  isLoading: boolean;
}

class WeatherLayout extends Component {
  state: ComponentState = {
    city: '',
    foreCasts: [],
    isLoading: false,
    selectedWeather: null,
  };

  async fetchWeather() {
    try {
      const foreCasts = await fetchForeCasts(this.state.city);

      this.setState({ foreCasts, selectedWeather: foreCasts[0], isLoading: false });
    } catch (error) {
      console.warn(error);
      this.setState({ foreCasts: [], selectedWeather: null, isLoading: false });
    }
  }

  submitCity = (event: FormEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true }, () => this.fetchWeather());
  };

  handleCityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ city: event.target.value });
  };

  setSelectedWeather = (foreCast: WeatherData): void => {
    this.setState({ selectedWeather: foreCast });
  };

  renderForm = () => {
    return (
      <div>
        <form onSubmit={this.submitCity}>
          <div className="citySearch">
            <label>City Name </label>
            <div>
              <input
                placeholder="fill it with a city name"
                className="cityField"
                value={this.state.city}
                onChange={this.handleCityChange}
              />
              <button type="submit" className="submitButton">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    const { foreCasts, isLoading, selectedWeather } = this.state;

    return (
      <div>
        <header>Weather forecast</header>
        <div className="weatherLayout">
          {this.renderForm()}
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {foreCasts.length === 0 && <div className="cityNotFound">To display data search for a city.</div>}
              {selectedWeather && (
                <>
                  <SelectedWeatherCard selectedWeather={selectedWeather} />

                  {foreCasts.length > 0 && (
                    <div className="foreCasts">
                      {foreCasts.map((foreCast: WeatherData) => (
                        <ForeCastWeatherCard
                          foreCast={foreCast}
                          isActive={foreCast.id === selectedWeather.id}
                          onClick={() => this.setSelectedWeather(foreCast)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export { WeatherLayout };
