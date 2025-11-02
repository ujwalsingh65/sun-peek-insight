import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Alert = {
  id: string;
  alert_type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export const AlertsWidget = () => {
  // Trigger alert generation on component mount
  const { data: alerts, isLoading, refetch } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      // Generate fresh alerts
      try {
        await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-daily-alerts`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );
      } catch (error) {
        console.error('Error generating alerts:', error);
      }

      // Fetch alerts from database
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Alert[];
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, "destructive" | "default" | "secondary"> = {
      critical: "destructive",
      warning: "default",
      info: "secondary",
    };
    return (
      <Badge variant={variants[severity] || "secondary"} className="capitalize">
        {severity}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : alerts && alerts.length > 0 ? (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  {getSeverityBadge(alert.severity)}
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(alert.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No alerts at this time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
