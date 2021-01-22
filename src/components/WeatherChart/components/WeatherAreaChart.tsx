import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { WeatherData } from '../../../modules/WeatherLayout/interfaces';

interface ComponentProps {
  chartData: Array<WeatherData>;
  areas: Array<{ dataKey: string; color: string }>;
}

function WeatherAreaChart({ chartData, areas }: ComponentProps) {
  return (
    <AreaChart
      width={500}
      height={400}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      {areas.map((area: { dataKey: string; color: string }) => (
        <Area type="monotone" dataKey={area.dataKey} stroke={area.color} fill={area.color} />
      ))}
    </AreaChart>
  );
}

export { WeatherAreaChart };
