class Env {
  public static readonly weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL || '';
  public static readonly weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY || '';
  public static readonly weatherIconsUrl = process.env.REACT_APP_ICONS_URL || '';
}

export { Env };
