import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, TrendingUp, Zap, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SavingsData {
  total_energy_kwh: number;
  total_savings_inr: number;
  avg_rate: number;
}

export const CostSavingsCalculator = () => {
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
      const { data, error } = await supabase.rpc('calculate_monthly_savings');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setSavingsData({
          total_energy_kwh: parseFloat(String(data[0].total_energy_kwh || 0)),
          total_savings_inr: parseFloat(String(data[0].total_savings_inr || 0)),
          avg_rate: parseFloat(String(data[0].avg_rate || 8.50)),
        });
      } else {
        // Use mock data for demonstration
        setSavingsData({
          total_energy_kwh: 742,
          total_savings_inr: 6307,
          avg_rate: 8.50,
        });
      }
    } catch (error) {
      console.error('Error fetching savings:', error);
      toast({
        title: "Error",
        description: "Failed to load savings data",
        variant: "destructive",
      });
      // Fallback to mock data
      setSavingsData({
        total_energy_kwh: 742,
        total_savings_inr: 6307,
        avg_rate: 8.50,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-secondary" />
            Cost Savings Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading savings data...</p>
        </CardContent>
      </Card>
    );
  }

  const dailyAverage = savingsData ? (savingsData.total_savings_inr / 30).toFixed(2) : 0;
  const yearlyProjection = savingsData ? (savingsData.total_savings_inr * 12).toFixed(2) : 0;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-secondary" />
          Cost Savings Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on Mumbai electricity rates (₹{savingsData?.avg_rate.toFixed(2)}/kWh)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Savings */}
        <div className="p-6 bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent rounded-xl border border-secondary/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">This Month's Savings</p>
              <p className="text-4xl font-bold text-foreground">
                ₹{savingsData?.total_savings_inr.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-xl">
              <TrendingUp className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">
              {savingsData?.total_energy_kwh.toFixed(2)} kWh generated
            </span>
          </div>
        </div>

        {/* Daily & Yearly Projections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted-foreground">Daily Average</p>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{dailyAverage}</p>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <p className="text-xs text-muted-foreground">Yearly Projection</p>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{yearlyProjection}</p>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-border/50">
          <p className="text-sm font-medium mb-3">How much you're saving:</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grid electricity cost</span>
              <span className="font-semibold text-destructive">₹{savingsData?.total_savings_inr.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Your solar cost</span>
              <span className="font-semibold text-green-500">₹0.00</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between">
              <span className="font-medium">Net savings</span>
              <span className="font-bold text-secondary">₹{savingsData?.total_savings_inr.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
            Environmental Impact
          </p>
          <p className="text-xs text-muted-foreground">
            You've offset approximately {((savingsData?.total_energy_kwh || 0) * 0.82).toFixed(2)} kg of CO₂ this month! 🌱
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
