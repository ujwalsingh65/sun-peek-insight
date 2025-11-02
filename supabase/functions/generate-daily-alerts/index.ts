import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherData {
  temperature: number;
  cloudCover: number;
  windSpeed: number;
  weatherCode: number;
}

interface Alert {
  alert_type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch weather data
    const weatherResponse = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=19.12&longitude=72.89&current=temperature_2m,cloud_cover,wind_speed_10m,weather_code&timezone=auto'
    );
    const weatherData = await weatherResponse.json();
    
    const weather: WeatherData = {
      temperature: weatherData.current.temperature_2m,
      cloudCover: weatherData.current.cloud_cover,
      windSpeed: weatherData.current.wind_speed_10m,
      weatherCode: weatherData.current.weather_code,
    };

    // Fetch historical production data (last 7 days)
    const historyResponse = await fetch(
      'https://archive-api.open-meteo.com/v1/archive?latitude=19.12&longitude=72.89&start_date=' +
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] +
      '&end_date=' + new Date().toISOString().split('T')[0] +
      '&hourly=temperature_2m,cloud_cover&timezone=auto'
    );
    const historyData = await historyResponse.json();

    // Calculate average production for the week
    const calculateProduction = (temp: number, clouds: number, hour: number): number => {
      if (hour < 6 || hour > 18) return 0;
      const timeEfficiency = hour === 12 ? 1 : (1 - Math.abs(12 - hour) / 6);
      const weatherEfficiency = (100 - clouds) / 100;
      return 5000 * timeEfficiency * weatherEfficiency;
    };

    let weekTotal = 0;
    const hours = historyData.hourly.time.length;
    for (let i = 0; i < hours; i++) {
      const hour = new Date(historyData.hourly.time[i]).getHours();
      const clouds = historyData.hourly.cloud_cover[i];
      weekTotal += calculateProduction(historyData.hourly.temperature_2m[i], clouds, hour);
    }
    const avgDailyProduction = weekTotal / 7;

    // Generate alerts based on conditions
    const alerts: Alert[] = [];

    // Weather-based alerts
    if (weather.cloudCover > 80) {
      alerts.push({
        alert_type: 'weather',
        severity: 'warning',
        title: 'High Cloud Cover Expected',
        message: `Cloud cover is ${weather.cloudCover}%. Solar production may be reduced today. Expected output: ${Math.round(avgDailyProduction * 0.3)} kWh.`,
      });
    }

    if (weather.weatherCode >= 80 && weather.weatherCode <= 99) {
      alerts.push({
        alert_type: 'weather',
        severity: 'critical',
        title: 'Severe Weather Alert',
        message: 'Rain or storms detected. System monitoring for potential issues. Production significantly impacted.',
      });
    }

    if (weather.cloudCover < 30 && weather.weatherCode < 3) {
      alerts.push({
        alert_type: 'weather',
        severity: 'info',
        title: 'Optimal Conditions Today',
        message: `Clear skies detected! Expected high production: ${Math.round(avgDailyProduction * 1.2)} kWh. Great day for solar energy!`,
      });
    }

    // Temperature alerts
    if (weather.temperature > 35) {
      alerts.push({
        alert_type: 'performance',
        severity: 'warning',
        title: 'High Temperature Warning',
        message: `Temperature is ${weather.temperature}°C. Panel efficiency may decrease by 10-15% due to heat.`,
      });
    }

    // Wind alerts
    if (weather.windSpeed > 40) {
      alerts.push({
        alert_type: 'maintenance',
        severity: 'warning',
        title: 'Strong Wind Alert',
        message: `Wind speed ${weather.windSpeed} km/h. Check panel mounting and connections after wind subsides.`,
      });
    }

    // Production trend alert
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour <= 18) {
      const expectedNow = calculateProduction(weather.temperature, weather.cloudCover, currentHour);
      if (expectedNow < avgDailyProduction * 0.1) {
        alerts.push({
          alert_type: 'performance',
          severity: 'warning',
          title: 'Low Production Alert',
          message: 'Current production is below expected levels. Weather conditions may be impacting output.',
        });
      }
    }

    // Clear old alerts (older than 7 days)
    await supabase
      .from('alerts')
      .delete()
      .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // Insert new alerts
    if (alerts.length > 0) {
      const { error } = await supabase
        .from('alerts')
        .insert(alerts);

      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        alertsGenerated: alerts.length,
        alerts: alerts 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
