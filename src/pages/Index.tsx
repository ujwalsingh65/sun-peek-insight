import { EnergyStats } from "@/components/EnergyStats";
import { PerformanceChart } from "@/components/PerformanceChart";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CostSavingsCalculator } from "@/components/CostSavingsCalculator";
import { Sun } from "lucide-react";
import solarHero from "@/assets/solar-panels-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${solarHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-secondary/20 backdrop-blur-sm rounded-2xl border border-secondary/30">
              <Sun className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              Solar Scope
            </h1>
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Monitor your solar panel performance in real-time. Track energy
            production, weather conditions, and optimize your solar efficiency.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            <span>Live Monitoring Active</span>
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <EnergyStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CostSavingsCalculator />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
