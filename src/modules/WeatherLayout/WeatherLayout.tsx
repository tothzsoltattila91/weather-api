import { Component } from 'react';
import { CurrentWeather, ForeCast } from './components';

interface ComponentState {
  isForeCast: boolean;
}

class WeatherLayout extends Component {
  public state: ComponentState = {
    isForeCast: false,
  };

  private handleViewChange = () => {
    this.setState({ isForeCast: !this.state.isForeCast });
  };

  render() {
    const { isForeCast } = this.state;

    return (
      <div>
        <header>{isForeCast ? 'Weather forecast' : 'Current Weather'}</header>;
        <button onClick={this.handleViewChange}>{isForeCast ? 'Get current weather' : 'Get weather forecast'}</button>
        {isForeCast ? <ForeCast /> : <CurrentWeather />}
        <footer>Weather App</footer>
      </div>
    );
  }
}

export { WeatherLayout };
