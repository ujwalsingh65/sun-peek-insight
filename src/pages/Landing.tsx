import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, BarChart3, Wifi, Shield, ArrowRight, Zap, Leaf } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Logo + Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-secondary" />
            Smart Solar Monitoring Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            <span className="block">Harness the</span>
            <span className="block gradient-text">Power of the Sun</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Monitor, analyze, and optimize your solar panel performance in real-time. 
            Compare IoT device data with simulated output and receive intelligent fault alerts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/auth")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl border-border/50"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8">
            {[
              { value: "99.5%", label: "Uptime" },
              { value: "10%", label: "Fault Threshold" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete solar monitoring solution with real-time analytics, IoT integration, and smart alerting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sun,
                title: "Real-Time Dashboard",
                desc: "Live energy production stats, weather data, and system efficiency metrics at a glance.",
                color: "text-secondary",
              },
              {
                icon: Wifi,
                title: "IoT Device Integration",
                desc: "Connect your solar panels via MQTT/IoT gateway. Compare actual vs simulated output.",
                color: "text-primary",
              },
              {
                icon: BarChart3,
                title: "Smart Reports",
                desc: "Daily comparison reports at 7 PM with hourly breakdowns and efficiency analysis.",
                color: "text-accent",
              },
              {
                icon: Shield,
                title: "Fault Detection",
                desc: "Instant alerts when production deviates >10% from expected. Never miss a panel issue.",
                color: "text-destructive",
              },
              {
                icon: Leaf,
                title: "Environmental Impact",
                desc: "Track CO₂ offset, trees equivalent, and coal avoided with your clean energy.",
                color: "text-accent",
              },
              {
                icon: Zap,
                title: "Auto-Optimization",
                desc: "GPS-based panel orientation detection for maximum energy capture at your location.",
                color: "text-secondary",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border/50 bg-card card-glow"
              >
                <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to Optimize Your Solar Energy?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join Sun Peek Insight and start monitoring your solar panels with precision.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 rounded-xl shadow-lg"
            onClick={() => navigate("/auth")}
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-secondary" />
            <span className="font-semibold text-foreground">Sun Peek Insight</span>
          </div>
          <div className="flex gap-6">
            <button onClick={() => navigate("/privacy-policy")} className="hover:text-foreground transition-colors">Privacy Policy</button>
            <button onClick={() => navigate("/terms-of-service")} className="hover:text-foreground transition-colors">Terms of Service</button>
          </div>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
