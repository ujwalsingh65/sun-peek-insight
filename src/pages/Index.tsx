import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EnergyStats } from "@/components/EnergyStats";
import { PerformanceChart } from "@/components/PerformanceChart";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CostSavingsCalculator } from "@/components/CostSavingsCalculator";
import { AlertsWidget } from "@/components/AlertsWidget";
import { SolarPanelSetup } from "@/components/SolarPanelSetup";
import { SolarPanel2D } from "@/components/SolarPanel2D";
import { PanelOrientationControls } from "@/components/PanelOrientationControls";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Sun, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSolarConfig } from "@/hooks/useSolarConfig";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEfficiencyPercentage } from "@/utils/solarCalculations";
import solarHero from "@/assets/solar-panels-hero.jpg";

const Index = () => {
  const { 
    config, 
    loading: configLoading, 
    hasConfig, 
    updatePanelSize,
    updateAzimuth,
    updateTilt 
  } = useSolarConfig();
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const efficiency = getEfficiencyPercentage(config.azimuth, config.tilt);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setAuthLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Sun className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SolarPanelSetup 
        panelSize={config.panelSize} 
        hasConfig={hasConfig} 
        loading={configLoading}
        onSave={updatePanelSize}
      />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${solarHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
          <div className="absolute inset-0 bg-gradient-glow" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/20 backdrop-blur-sm rounded-2xl border border-secondary/30 shadow-glow">
                <Sun className="h-8 w-8 text-secondary drop-shadow-lg" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground drop-shadow-lg">
                {t("appName")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-background/20 backdrop-blur-sm border-secondary/30 text-primary-foreground hover:bg-background/40"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("logout")}
              </Button>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-3xl mb-10 leading-relaxed drop-shadow">
            {t("heroSubtitle")}
          </p>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-secondary text-secondary-foreground rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow shadow-xl cursor-pointer">
            <span className="text-lg">{t("liveMonitoring")}</span>
            <div className="h-3 w-3 bg-green-400 rounded-full animate-glow shadow-lg" />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8 md:py-16 space-y-8">
        <div className="relative z-0 p-6 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-secondary rounded-xl shadow-glow">
              <Sun className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{t("systemCapacity")}</p>
              <p className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">{config.panelSize} kW</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-medium">{t("estimatedPanels")}</p>
            <p className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">{Math.ceil(config.panelSize / 0.4)} {t("panels")}</p>
          </div>
        </div>

        {/* 3D Panel Visualization and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative z-0 animate-slide-up">
            <SolarPanel2D azimuth={config.azimuth} tilt={config.tilt} />
          </div>
          <div className="relative z-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <PanelOrientationControls
              azimuth={config.azimuth}
              tilt={config.tilt}
              onAzimuthChange={(value) => updateAzimuth(value)}
              onTiltChange={(value) => updateTilt(value)}
              efficiency={efficiency}
            />
          </div>
        </div>

        <div className="relative z-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <EnergyStats systemCapacity={config.panelSize} azimuth={config.azimuth} tilt={config.tilt} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative z-0 lg:col-span-2">
            <PerformanceChart systemCapacity={config.panelSize} azimuth={config.azimuth} tilt={config.tilt} />
          </div>
          <div className="relative z-0">
            <WeatherWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative z-0 lg:col-span-2">
            <CostSavingsCalculator systemCapacity={config.panelSize} />
          </div>
          <div className="relative z-0">
            <AlertsWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
