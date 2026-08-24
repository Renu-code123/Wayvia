import { WeatherCondition } from '@/types/trip';

export async function fetchLiveWeather(lat: number, lng: number): Promise<WeatherCondition> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability,temperature_2m,weather_code&forecast_days=3`;
    const response = await fetch(url, { next: { revalidate: 600 } });
    if (!response.ok) {
      throw new Error(`Open-Meteo failed with status ${response.status}`);
    }
    const data = await response.json();
    const current = data.current;
    const hourly = data.hourly;

    const hourlyForecast = (hourly?.time || []).slice(0, 12).map((t: string, idx: number) => ({
      time: t.split('T')[1] || t,
      temp: hourly.temperature_2m[idx] || 20,
      pop: hourly.precipitation_probability[idx] || 0,
      code: hourly.weather_code[idx] || 0,
    }));

    const maxPopNext6Hours = Math.max(...(hourly?.precipitation_probability?.slice(0, 6) || [10]));

    return {
      temperature: Math.round(current?.temperature_2m ?? 21),
      precipitationProbability: maxPopNext6Hours,
      precipitationMm: current?.precipitation ?? 0,
      weatherCode: current?.weather_code ?? 0,
      weatherDescription: getWeatherCodeDescription(current?.weather_code ?? 0),
      windSpeed: Math.round(current?.wind_speed_10m ?? 12),
      hourlyForecast,
    };
  } catch (err) {
    console.warn('Using robust fallback weather data:', err);
    return getFallbackWeather();
  }
}

export function getWeatherCodeDescription(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Light Drizzle';
  if (code >= 61 && code <= 65) return 'Heavy Rain';
  if (code >= 71 && code <= 77) return 'Snow Fall';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}

export function getFallbackWeather(): WeatherCondition {
  return {
    temperature: 22,
    precipitationProbability: 15,
    precipitationMm: 0,
    weatherCode: 1,
    weatherDescription: 'Partly Cloudy',
    windSpeed: 11,
    hourlyForecast: [
      { time: '09:00', temp: 19, pop: 10, code: 1 },
      { time: '12:00', temp: 23, pop: 15, code: 2 },
      { time: '15:00', temp: 24, pop: 20, code: 2 },
      { time: '18:00', temp: 21, pop: 10, code: 1 },
      { time: '21:00', temp: 18, pop: 5, code: 0 },
    ],
  };
}
