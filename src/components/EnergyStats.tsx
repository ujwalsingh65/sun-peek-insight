import { Battery, Zap, TrendingUp, Sun, Leaf, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSolarProduction } from "@/hooks/useSolarProduction";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EnergyStatsProps {
  systemCapacity: number;
  azimuth?: number;
  tilt?: number;
}

export const EnergyStats = ({ systemCapacity, azimuth = 180, tilt = 19 }: EnergyStatsProps) => {
  const { production, loading } = useSolarProduction(systemCapacity, azimuth, tilt);
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);
  const { t } = useLanguage();

  const co2Saved = parseFloat((production.todayTotal * 0.82).toFixed(1));

  const stats = [
    {
      title: t("currentOutput"),
      value: loading ? "..." : `${production.currentOutput} kW`,
      icon: Zap,
      trend: "+12%",
      trendUp: true,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      info: t("realTimePower"),
    },
    {
      title: t("todaysProduction"),
      value: loading ? "..." : `${production.todayTotal} kWh`,
      icon: Sun,
      trend: "+8%",
      trendUp: true,
      color: "text-accent",
      bgColor: "bg-accent/10",
      info: t("accumulatedEnergy"),
    },
    {
      title: t("systemEfficiency"),
      value: loading ? "..." : `${production.efficiency}%`,
      icon: Battery,
      trend: "+5%",
      trendUp: true,
      color: "text-primary",
      bgColor: "bg-primary/10",
      info: t("panelPerformance"),
    },
    {
      title: t("co2Saved"),
      value: loading ? "..." : `${co2Saved} kg`,
      icon: Leaf,
      trend: "+15%",
      trendUp: true,
      color: "text-accent",
      bgColor: "bg-accent/10",
      info: "CO₂ emissions avoided by using solar energy today.",
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 card-glow overflow-visible"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1">
                  <Tooltip open={openTooltip === index} onOpenChange={(open) => setOpenTooltip(open ? index : null)}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.preventDefault(); setOpenTooltip(openTooltip === index ? null : index); }}
                        className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-3 bg-popover border border-border z-[60]">
                      <p className="text-xs text-muted-foreground leading-relaxed">{stat.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-medium mb-1">{stat.title}</p>
              {loading ? (
                <Skeleton className="h-7 w-20" />
              ) : (
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    stat.trendUp ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10"
                  }`}>
                    {stat.trendUp ? "↑" : "↓"} {stat.trend}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
};
