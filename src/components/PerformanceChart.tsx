import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useSolarProduction } from "@/hooks/useSolarProduction";
import { Skeleton } from "@/components/ui/skeleton";

export const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("day");
  const { production, loading } = useSolarProduction();

  const weeklyData = [
    { day: "Mon", energy: 28 },
    { day: "Tue", energy: 32 },
    { day: "Wed", energy: 26 },
    { day: "Thu", energy: 35 },
    { day: "Fri", energy: 30 },
    { day: "Sat", energy: 33 },
    { day: "Sun", energy: 29 },
  ];

  const monthlyData = [
    { week: "Week 1", energy: 185 },
    { week: "Week 2", energy: 210 },
    { week: "Week 3", energy: 195 },
    { week: "Week 4", energy: 220 },
  ];

  const data =
    timeRange === "day"
      ? production.hourlyData
      : timeRange === "week"
      ? weeklyData
      : monthlyData;

  const dataKey =
    timeRange === "day" ? "time" : timeRange === "week" ? "day" : "week";

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Energy Production {timeRange === "day" && "(Weather-Based)"}
          </CardTitle>
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {loading && timeRange === "day" ? (
          <Skeleton className="w-full h-[300px]" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35 100% 55%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(35 100% 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey={dataKey}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: "kWh", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="energy"
              stroke="hsl(35 100% 55%)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#energyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
