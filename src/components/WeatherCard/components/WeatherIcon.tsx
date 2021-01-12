interface ComponentProps {
  iconId: string;
}

function WeatherIcon(props: ComponentProps) {
  return <div>{props.iconId}</div>;
}

export { WeatherIcon };
