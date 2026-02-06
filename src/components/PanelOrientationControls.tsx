import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Compass, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface PanelOrientationControlsProps {
  azimuth: number;
  tilt: number;
  onAzimuthChange: (value: number) => void;
  onTiltChange: (value: number) => void;
  efficiency: number;
}

export const PanelOrientationControls = ({
  azimuth,
  tilt,
  onAzimuthChange,
  onTiltChange,
  efficiency,
}: PanelOrientationControlsProps) => {
  const { t } = useLanguage();

  const getDirectionLabel = (degrees: number) => {
    if (degrees >= 337.5 || degrees < 22.5) return "N";
    if (degrees >= 22.5 && degrees < 67.5) return "NE";
    if (degrees >= 67.5 && degrees < 112.5) return "E";
    if (degrees >= 112.5 && degrees < 157.5) return "SE";
    if (degrees >= 157.5 && degrees < 202.5) return "S";
    if (degrees >= 202.5 && degrees < 247.5) return "SW";
    if (degrees >= 247.5 && degrees < 292.5) return "W";
    return "NW";
  };

  const getEfficiencyStatus = (eff: number) => {
    if (eff >= 95) return { label: t("optimal"), color: "bg-green-500" };
    if (eff >= 80) return { label: t("good"), color: "bg-blue-500" };
    if (eff >= 60) return { label: t("fair"), color: "bg-yellow-500" };
    return { label: t("poor"), color: "bg-red-500" };
  };

  const status = getEfficiencyStatus(efficiency);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("panelOrientation")}</CardTitle>
          <Badge variant="outline" className="gap-2">
            <div className={`h-2 w-2 rounded-full ${status.color}`} />
            {status.label} ({efficiency.toFixed(0)}%)
          </Badge>
        </div>
        <CardDescription>
          {t("orientationDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              {t("directionAzimuth")}
            </Label>
            <span className="text-sm font-medium">
              {azimuth}° ({getDirectionLabel(azimuth)})
            </span>
          </div>
          <Slider
            value={[azimuth]}
            onValueChange={(values) => onAzimuthChange(values[0])}
            min={0}
            max={360}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            0° = North, 90° = East, 180° = South, 270° = West
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t("tiltAngle")}
            </Label>
            <span className="text-sm font-medium">{tilt}°</span>
          </div>
          <Slider
            value={[tilt]}
            onValueChange={(values) => onTiltChange(values[0])}
            min={0}
            max={90}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            0° = Horizontal, 90° = Vertical
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium">💡 {t("optimalSettings")}</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• {t("directionSouth")}</li>
            <li>• {t("tiltLatitude")}</li>
            <li>• {t("efficiencyOptimal")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
