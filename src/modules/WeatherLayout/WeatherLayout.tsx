import { ChangeEvent, Component } from 'react';
import { CurrentWeather, ForeCast } from './components';

interface ComponentState {
  city: string;
}

class WeatherLayout extends Component {
  state: ComponentState = {
    city: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEnterHit);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEnterHit);
  }

  handleEnterHit = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('submit city');
    }
  };

  handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ city: event.target.value });
  };

  render() {
    const { city } = this.state;

    return (
      <div>
        <header>Weather forecast</header>
        <input value={city} onChange={this.handleCityChange} />
        <ForeCast />
        <CurrentWeather />
        <footer>Weather App</footer>
      </div>
    );
  }
}

export { WeatherLayout };
