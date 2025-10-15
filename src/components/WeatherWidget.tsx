import { Cloud, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WeatherWidget = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gradient-to-br from-secondary/10 to-transparent rounded-xl">
          <div className="flex items-center gap-3">
            <Sun className="h-10 w-10 text-secondary" />
            <div>
              <p className="text-3xl font-bold">32°C</p>
              <p className="text-sm text-muted-foreground">Partly Cloudy</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Mumbai</p>
            <p className="text-lg font-bold text-secondary">10AM - 4PM</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Cloud className="h-6 w-6 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Cloud Cover</p>
              <p className="text-lg font-semibold">35%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Wind className="h-6 w-6 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Wind Speed</p>
              <p className="text-lg font-semibold">18 km/h</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-border/50">
          <p className="text-sm font-medium mb-1">Solar Efficiency</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-secondary to-accent rounded-full" />
            </div>
            <span className="text-sm font-bold text-secondary">85%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
