import { ChangeEvent, Component, FormEvent } from 'react';
import { Spinner } from '../../components/Spinner';
import { WeatherChart } from '../../components/WeatherChart';
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
  cityOfForeCast: string;
  errorMessage: string | null;
}

class ForeCast extends Component {
  state: ComponentState = {
    city: '',
    foreCasts: [],
    cityOfForeCast: '',
    isLoading: false,
    selectedWeather: null,
    errorMessage: null,
  };

  async fetchWeather() {
    try {
      const foreCasts = await fetchForeCasts(this.state.city);

      this.setState({ foreCasts, selectedWeather: foreCasts[0], isLoading: false, errorMessage: null });
    } catch (error) {
      console.warn(error);
      this.setState({ foreCasts: [], selectedWeather: null, isLoading: false, errorMessage: error.message });
    }
  }

  submitCity = (event: FormEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true, cityOfForeCast: this.state.city }, () => this.fetchWeather());
  };

  handleCityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(this.state.errorMessage) {
      this.setState({ city: event.currentTarget.value, errorMessage: null });
    } else {
      this.setState({ city: event.currentTarget.value });
    }
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

  renderWeatherData = () => {
    const { foreCasts, selectedWeather, cityOfForeCast } = this.state;

    return (
      <>
        {selectedWeather && (
          <>
            <SelectedWeatherCard cityOfForeCast={cityOfForeCast} selectedWeather={selectedWeather} />
            {foreCasts.length > 0 && (
              <>
                <div className="foreCasts">
                  {foreCasts.map((foreCast: WeatherData) => (
                    <ForeCastWeatherCard
                      key={foreCast.id}
                      foreCast={foreCast}
                      isActive={foreCast.id === selectedWeather.id}
                      onClick={() => this.setSelectedWeather(foreCast)}
                    />
                  ))}
                </div>
                <WeatherChart chartData={foreCasts} />
              </>
            )}
          </>
        )}
      </>
    );
  };

  render() {
    const { foreCasts, isLoading, errorMessage } = this.state;

    return (
      <div>
        <header>
          <div className="headerText">Weather forecast</div>
        </header>
        <div className="weatherLayout">
          {this.renderForm()}
          {isLoading ? (
            <Spinner />
          ) : (
            <>
             {foreCasts.length === 0 && (
                <div className="noCity" style={{color: errorMessage ? '#ED4337' : '#E6ECEB'}}>
                  {errorMessage
                    ? errorMessage
                    : "To display data search for a city."
                  }
                </div>
              )}
              {this.renderWeatherData()}
            </>
          )}
        </div>
        <div className="footer">
          <a href="https://github.com/tothzsoltattila91/weather-client" rel="noreferrer" target="_blank">
            Check it on github!
          </a>
        </div>
      </div>
    );
  }
}

export { ForeCast };
