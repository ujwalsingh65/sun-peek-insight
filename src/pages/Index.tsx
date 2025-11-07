import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EnergyStats } from "@/components/EnergyStats";
import { PerformanceChart } from "@/components/PerformanceChart";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CostSavingsCalculator } from "@/components/CostSavingsCalculator";
import { AlertsWidget } from "@/components/AlertsWidget";
import { SolarPanelSetup } from "@/components/SolarPanelSetup";
import { SolarPanel3D } from "@/components/SolarPanel3D";
import { PanelOrientationControls } from "@/components/PanelOrientationControls";
import { Button } from "@/components/ui/button";
import { Sun, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getEfficiencyPercentage } from "@/utils/solarCalculations";
import solarHero from "@/assets/solar-panels-hero.jpg";

const Index = () => {
  const [panelSize, setPanelSize] = useState(5);
  const [azimuth, setAzimuth] = useState(180); // Default: South-facing
  const [tilt, setTilt] = useState(19); // Default: Mumbai latitude
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load orientation settings from localStorage
  useEffect(() => {
    const storedAzimuth = localStorage.getItem("panelAzimuth");
    const storedTilt = localStorage.getItem("panelTilt");
    
    if (storedAzimuth) setAzimuth(parseFloat(storedAzimuth));
    if (storedTilt) setTilt(parseFloat(storedTilt));
  }, []);

  // Save orientation settings to localStorage
  const handleAzimuthChange = (value: number) => {
    setAzimuth(value);
    localStorage.setItem("panelAzimuth", value.toString());
  };

  const handleTiltChange = (value: number) => {
    setTilt(value);
    localStorage.setItem("panelTilt", value.toString());
  };

  const efficiency = getEfficiencyPercentage(azimuth, tilt);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Sun className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SolarPanelSetup onSizeSet={setPanelSize} />
      
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/20 backdrop-blur-sm rounded-2xl border border-secondary/30">
                <Sun className="h-8 w-8 text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Solar Scope
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-background/20 backdrop-blur-sm border-secondary/30 text-primary-foreground hover:bg-background/40"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
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
        <div className="mb-6 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Sun className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">System Capacity</p>
              <p className="text-xl font-bold">{panelSize} kW</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Estimated Panels</p>
            <p className="text-xl font-bold">{Math.ceil(panelSize / 0.4)} panels</p>
          </div>
        </div>

        {/* 3D Panel Visualization and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <SolarPanel3D azimuth={azimuth} tilt={tilt} />
          </div>
          <div>
            <PanelOrientationControls
              azimuth={azimuth}
              tilt={tilt}
              onAzimuthChange={handleAzimuthChange}
              onTiltChange={handleTiltChange}
              efficiency={efficiency}
            />
          </div>
        </div>

        <EnergyStats systemCapacity={panelSize} azimuth={azimuth} tilt={tilt} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PerformanceChart systemCapacity={panelSize} azimuth={azimuth} tilt={tilt} />
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CostSavingsCalculator systemCapacity={panelSize} />
          </div>
          <div>
            <AlertsWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
