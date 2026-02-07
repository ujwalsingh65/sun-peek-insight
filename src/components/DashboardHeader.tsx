import { useState } from "react";
import { Sun, LogOut, Menu, X, LayoutDashboard, BarChart3, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardHeaderProps {
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardHeader = ({ onLogout, activeTab, onTabChange }: DashboardHeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: "dashboard", label: t("navDashboard"), icon: LayoutDashboard },
    { id: "reports", label: t("navReports"), icon: BarChart3 },
    { id: "settings", label: t("navSettings"), icon: Settings },
    { id: "help", label: t("navHelp"), icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-secondary shadow-glow">
              <Sun className="h-5 w-5 text-secondary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Sun Peek Insight
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Button onClick={onLogout} variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border/40 pt-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setMobileOpen(false); }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <Button onClick={onLogout} variant="ghost" size="sm" className="w-full justify-start text-muted-foreground mt-2">
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
