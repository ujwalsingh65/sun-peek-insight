import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ruler, Battery, IndianRupee, Calculator } from "lucide-react";

export const PanelSizeEstimator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [result, setResult] = useState<{ panels: number; capacity: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!l || !w) return;
    const roofArea = l * w;
    const usableArea = roofArea * 0.7; // 70% usable
    const panelArea = 1.7 * 1.0; // standard panel ~1.7m²
    const panels = Math.floor(usableArea / panelArea);
    const capacity = panels * 0.4; // ~400W per panel
    setResult({ panels, capacity: Math.round(capacity * 10) / 10 });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2"><Ruler className="h-5 w-5 text-secondary" /> Solar Panel Size Estimator</CardTitle>
        <p className="text-sm text-muted-foreground">Enter your roof dimensions to estimate the number of panels and maximum system capacity.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Length (meters)</label>
            <Input type="number" placeholder="e.g. 10" value={length} onChange={(e) => setLength(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Width (meters)</label>
            <Input type="number" placeholder="e.g. 8" value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate} className="w-full" size="sm"><Calculator className="mr-2 h-4 w-4" />Estimate</Button>
        {result && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-foreground">{result.panels}</p>
              <p className="text-xs text-muted-foreground">Panels</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-foreground">{result.capacity} kW</p>
              <p className="text-xs text-muted-foreground">Max Capacity</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const BatteryStorageCalculator = () => {
  const [dailyUsage, setDailyUsage] = useState("");
  const [backupHours, setBackupHours] = useState("");
  const [result, setResult] = useState<{ capacity: number; batteries: number } | null>(null);

  const calculate = () => {
    const usage = parseFloat(dailyUsage);
    const hours = parseFloat(backupHours);
    if (!usage || !hours) return;
    const hourlyUsage = usage / 24;
    const requiredKwh = hourlyUsage * hours;
    const batteryCapacity = requiredKwh / 0.8; // 80% DoD
    const batteries = Math.ceil(batteryCapacity / 5); // 5kWh per battery unit
    setResult({ capacity: Math.round(batteryCapacity * 10) / 10, batteries });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2"><Battery className="h-5 w-5 text-accent" /> Battery Storage Calculator</CardTitle>
        <p className="text-sm text-muted-foreground">Estimate the battery capacity you need for backup power.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Daily Usage (kWh)</label>
            <Input type="number" placeholder="e.g. 15" value={dailyUsage} onChange={(e) => setDailyUsage(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Backup Hours</label>
            <Input type="number" placeholder="e.g. 6" value={backupHours} onChange={(e) => setBackupHours(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate} className="w-full" size="sm"><Calculator className="mr-2 h-4 w-4" />Calculate</Button>
        {result && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-foreground">{result.capacity} kWh</p>
              <p className="text-xs text-muted-foreground">Required Capacity</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-foreground">{result.batteries}</p>
              <p className="text-xs text-muted-foreground">Battery Units (5kWh each)</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const SubsidyEstimator = () => {
  const [systemSize, setSystemSize] = useState("");
  const [installCost, setInstallCost] = useState("");
  const [result, setResult] = useState<{ subsidy: number; netCost: number; subsidyPercent: number } | null>(null);

  const calculate = () => {
    const size = parseFloat(systemSize);
    const cost = parseFloat(installCost);
    if (!size || !cost) return;

    // Indian PM Surya Ghar subsidy scheme (2024 rates)
    let subsidyPerKw: number;
    if (size <= 2) {
      subsidyPerKw = 30000; // ₹30,000/kW for first 2kW
    } else if (size <= 3) {
      subsidyPerKw = 18000; // ₹18,000/kW for 2-3kW
    } else {
      subsidyPerKw = 9000; // reduced beyond 3kW
    }

    let subsidy: number;
    if (size <= 2) {
      subsidy = size * 30000;
    } else if (size <= 3) {
      subsidy = 2 * 30000 + (size - 2) * 18000;
    } else {
      subsidy = 2 * 30000 + 1 * 18000 + (size - 3) * 9000;
    }

    // Cap at 78,000 for ≤3kW, further capped for larger
    subsidy = Math.min(subsidy, size <= 3 ? 78000 : 78000 + (size - 3) * 9000);
    subsidy = Math.min(subsidy, cost * 0.4); // max 40% of cost
    const netCost = cost - subsidy;
    const subsidyPercent = Math.round((subsidy / cost) * 100);
    setResult({ subsidy: Math.round(subsidy), netCost: Math.round(netCost), subsidyPercent });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2"><IndianRupee className="h-5 w-5 text-primary" /> Solar Subsidy Estimator</CardTitle>
        <p className="text-sm text-muted-foreground">Estimate government subsidy based on PM Surya Ghar scheme (India). Rates vary by state.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">System Size (kW)</label>
            <Input type="number" placeholder="e.g. 3" value={systemSize} onChange={(e) => setSystemSize(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Installation Cost (₹)</label>
            <Input type="number" placeholder="e.g. 200000" value={installCost} onChange={(e) => setInstallCost(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate} className="w-full" size="sm"><Calculator className="mr-2 h-4 w-4" />Estimate Subsidy</Button>
        {result && (
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-accent/10 rounded-lg text-center">
              <p className="text-xl font-bold text-accent">₹{result.subsidy.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">Subsidy</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-xl font-bold text-foreground">₹{result.netCost.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">Net Cost</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <p className="text-xl font-bold text-foreground">{result.subsidyPercent}%</p>
              <p className="text-xs text-muted-foreground">Covered</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
