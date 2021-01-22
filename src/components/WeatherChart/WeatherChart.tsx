import React, { Component } from 'react';
import { WeatherData } from '../../modules/WeatherLayout/interfaces';
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
  { dataKey: 'temperatureMax', color: '#ec6e4c', name: 'Maximum temperature' },
];

const HUMIDITY_AREAS = [{ dataKey: 'humidity', color: '#ec6e4c' }];

class WeatherChart extends Component<ComponentProps> {
  state: ComponentState = {
    graphType: GraphType.TEMPERATURE,
  };

  setGraphType = (graphType: GraphType) => {
    this.setState({ graphType });
  };

  render() {
    const { chartData } = this.props;

    return (
      <div>
        <button className="submitButton" onClick={() => this.setGraphType(GraphType.TEMPERATURE)} >
          Temperature
        </button>
        <button className="submitButton" onClick={() => this.setGraphType(GraphType.HUMIDITY)}>
          Humidity
        </button>
        {this.state.graphType === GraphType.TEMPERATURE ? (
          <WeatherBarChart chartData={chartData} bars={TEMPERATURE_BARS} />
        ) : (
          <WeatherAreaChart chartData={chartData} areas={HUMIDITY_AREAS} />
        )}
      </div>
    );
  }
}

export { WeatherChart };
