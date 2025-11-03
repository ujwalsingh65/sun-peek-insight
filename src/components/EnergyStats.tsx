import { Battery, Zap, TrendingUp, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSolarProduction } from "@/hooks/useSolarProduction";
import { Skeleton } from "@/components/ui/skeleton";

interface EnergyStatsProps {
  systemCapacity: number;
}

export const EnergyStats = ({ systemCapacity }: EnergyStatsProps) => {
  const { production, loading } = useSolarProduction(systemCapacity);

  const stats = [
    {
      title: "Current Output",
      value: loading ? "..." : `${production.currentOutput} kW`,
      icon: Zap,
      trend: "+12%",
      color: "text-secondary",
    },
    {
      title: "Today's Production",
      value: loading ? "..." : `${production.todayTotal} kWh`,
      icon: Sun,
      trend: "+8%",
      color: "text-accent",
    },
    {
      title: "System Efficiency",
      value: loading ? "..." : `${production.efficiency}%`,
      icon: Battery,
      trend: "+5%",
      color: "text-primary",
    },
    {
      title: "Monthly Total",
      value: loading ? "..." : `${production.monthlyTotal} kWh`,
      icon: TrendingUp,
      trend: "+15%",
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {stat.title}
            </h3>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
