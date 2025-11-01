import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  cloudCover: number;
  windSpeed: number;
}

interface SolarProduction {
  currentOutput: number;
  todayTotal: number;
  efficiency: number;
  hourlyData: { time: string; energy: number }[];
}

export const useSolarProduction = () => {
  const [production, setProduction] = useState<SolarProduction>({
    currentOutput: 0,
    todayTotal: 0,
    efficiency: 0,
    hourlyData: [],
  });
  const [loading, setLoading] = useState(true);

  const calculateSolarOutput = (
    weather: WeatherData,
    hour: number
  ): number => {
    // Base system capacity in kW
    const SYSTEM_CAPACITY = 5.0;

    // Calculate sun intensity based on time of day (peak at noon)
    const getSunIntensity = (h: number): number => {
      if (h < 6 || h > 20) return 0;
      if (h >= 11 && h <= 14) return 1.0; // Peak hours
      if (h >= 9 && h <= 16) return 0.85;
      if (h >= 7 && h <= 18) return 0.6;
      return 0.3;
    };

    const sunIntensity = getSunIntensity(hour);

    // Cloud cover impact (0-100% clouds reduces output)
    const cloudFactor = (100 - weather.cloudCover) / 100;

    // Temperature impact (optimal at 25°C, slight reduction above)
    const tempFactor =
      weather.temperature <= 25
        ? 1.0
        : 1.0 - (weather.temperature - 25) * 0.004;

    // Calculate output
    const output =
      SYSTEM_CAPACITY * sunIntensity * cloudFactor * tempFactor;

    return Math.max(0, output);
  };

  const fetchWeatherAndCalculate = async () => {
    try {
      setLoading(true);

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloud_cover,wind_speed_10m&timezone=auto`
      );
      const data = await response.json();

      const weather: WeatherData = {
        temperature: data.current.temperature_2m,
        cloudCover: data.current.cloud_cover,
        windSpeed: data.current.wind_speed_10m,
      };

      const currentHour = new Date().getHours();
      const currentOutput = calculateSolarOutput(weather, currentHour);

      // Calculate today's total (sum from 6AM to current hour)
      let todayTotal = 0;
      const hourlyData: { time: string; energy: number }[] = [];

      for (let h = 6; h <= Math.min(currentHour, 20); h++) {
        const output = calculateSolarOutput(weather, h);
        todayTotal += output;
        hourlyData.push({
          time: `${h % 12 || 12}${h < 12 ? "AM" : "PM"}`,
          energy: parseFloat(output.toFixed(2)),
        });
      }

      // Add forecast for rest of the day
      for (let h = currentHour + 1; h <= 20; h++) {
        const output = calculateSolarOutput(weather, h);
        hourlyData.push({
          time: `${h % 12 || 12}${h < 12 ? "AM" : "PM"}`,
          energy: parseFloat(output.toFixed(2)),
        });
      }

      const efficiency = Math.round((100 - weather.cloudCover) * 0.85);

      setProduction({
        currentOutput: parseFloat(currentOutput.toFixed(2)),
        todayTotal: parseFloat(todayTotal.toFixed(1)),
        efficiency,
        hourlyData,
      });
    } catch (error) {
      console.error("Error calculating solar production:", error);
      // Fallback to default values
      setProduction({
        currentOutput: 3.2,
        todayTotal: 24.5,
        efficiency: 75,
        hourlyData: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherAndCalculate();

    // Refresh every 15 minutes
    const interval = setInterval(fetchWeatherAndCalculate, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { production, loading, refresh: fetchWeatherAndCalculate };
};
