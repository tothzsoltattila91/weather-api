import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { WeatherData } from '../../../modules/ForeCast/interfaces';

interface BarProperties {
  name: string;
  dataKey: string;
  color: string;
}

interface ComponentProps {
  chartData: Array<WeatherData>;
  bars: Array<BarProperties>;
  size: { width: number; height: number };
  labelPostfix: string;
}

function WeatherBarChart({ chartData, bars, labelPostfix, size: { width, height } }: ComponentProps) {
  return (
    <BarChart
      width={width}
      height={height}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis tickFormatter={(data) => `${data}${labelPostfix}`}/>
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      {bars.map((bar: BarProperties) => (
        <Bar key={bar.name} dataKey={bar.dataKey} name={bar.name} fill={bar.color} />
      ))}
    </BarChart>
  );
}

export { WeatherBarChart };
