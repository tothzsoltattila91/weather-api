import React, { Component } from 'react';
import { WeatherData } from '../../modules/ForeCast/interfaces';
import { MediaQueries } from '../../utils';
import { WeatherAreaChart, WeatherBarChart } from './components';

enum GraphType {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
}

interface ComponentProps {
  chartData: Array<WeatherData>;
}

interface ComponentState {
  graphType: GraphType;
  width: number;
}

const TEMPERATURE_BARS = [
  { dataKey: 'temperatureMin', color: '#48484a', name: 'Minimum temperature' },
  { dataKey: 'temperatureMax', color: '#509ffb', name: 'Maximum temperature' },
];

const HUMIDITY_AREAS = [{ dataKey: 'humidity', color: '#509ffb' }];

class WeatherChart extends Component<ComponentProps> {
  state: ComponentState = {
    graphType: GraphType.TEMPERATURE,
    width: 500,
  };

  componentDidMount() {
    window.addEventListener('resize', () => this.debounce(this.handleResize()));
    this.setState({ width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.debounce(this.handleResize()));
  }

  debounce = (fn: void) => {
    const timer = setTimeout(() => fn, 300);
    clearTimeout(timer);
  };

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  };

  setGraphType = (graphType: GraphType) => {
    this.setState({ graphType });
  };

  getChartSize = (): { width: number; height: number } => {
    const { width } = this.state;

    if (width > MediaQueries.LG) {
      return { width: width * 0.4, height: width * 0.3 };
    } else if (width > MediaQueries.MD) {
      return { width: width * 0.5, height: width * 0.4 };
    } else {
      return { width: width * 0.7, height: width * 0.5 };
    }
  };

  render() {
    const { chartData } = this.props;
    const { graphType } = this.state;

    return (
      <div>
        <button
          className="submitButton"
          style={{ background: graphType === GraphType.TEMPERATURE ? '#48484a' : '#509ffb' }}
          onClick={() => this.setGraphType(GraphType.TEMPERATURE)}
        >
          Temperature
        </button>
        <button
          className="submitButton"
          style={{ background: graphType === GraphType.HUMIDITY ? '#48484a' : '#509ffb' }}
          onClick={() => this.setGraphType(GraphType.HUMIDITY)}
        >
          Humidity
        </button>

        {graphType === GraphType.TEMPERATURE ? (
          <WeatherBarChart
            labelPostfix="°C"
            chartData={chartData}
            bars={TEMPERATURE_BARS}
            size={this.getChartSize()}
          />
        ) : (
          <WeatherAreaChart 
            labelPostfix="%"
            chartData={chartData}
            areas={HUMIDITY_AREAS}
            size={this.getChartSize()}
          />
        )}
      </div>
    );
  }
}

export { WeatherChart };
