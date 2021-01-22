import React, { Component } from 'react';
import { WeatherData } from '../../modules/ForeCast/interfaces';
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
}

const TEMPERATURE_BARS = [
  { dataKey: 'temperatureMin', color: '#48484a', name: 'Minimum temperature' },
  { dataKey: 'temperatureMax', color: '#509ffb', name: 'Maximum temperature' },
];

const HUMIDITY_AREAS = [{ dataKey: 'humidity', color: '#509ffb' }];

class WeatherChart extends Component<ComponentProps> {
  state: ComponentState = {
    graphType: GraphType.TEMPERATURE,
  };

  setGraphType = (graphType: GraphType) => {
    this.setState({ graphType });
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
          <WeatherBarChart chartData={chartData} bars={TEMPERATURE_BARS} />
        ) : (
          <WeatherAreaChart chartData={chartData} areas={HUMIDITY_AREAS} />
        )}
      </div>
    );
  }
}

export { WeatherChart };
