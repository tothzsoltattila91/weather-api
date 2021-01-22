import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { WeatherData } from '../../../modules/ForeCast/interfaces';

interface ComponentProps {
  chartData: Array<WeatherData>;
  areas: Array<{ dataKey: string; color: string }>;
  size: { width: number; height: number };
}

function WeatherAreaChart({ chartData, areas, size: { width, height } }: ComponentProps) {
  return (
    <AreaChart
      width={width}
      height={height}
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
        <Area key={area.dataKey} type="monotone" dataKey={area.dataKey} stroke={area.color} fill={area.color} />
      ))}
    </AreaChart>
  );
}

export { WeatherAreaChart };
