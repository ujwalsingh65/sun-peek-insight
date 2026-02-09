import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Settings, Sun, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SolarPanelSetupProps {
  panelSize: number; // always in kW
  hasConfig: boolean;
  loading: boolean;
  onSave: (size: number) => Promise<boolean>;
  inline?: boolean;
}

type Unit = "kW" | "W";

export const SolarPanelSetup = ({ 
  panelSize: initialSize, 
  hasConfig, 
  loading,
  onSave,
  inline = false,
}: SolarPanelSetupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>("kW");
  const [panelSize, setPanelSize] = useState(initialSize); // always stored in kW internally
  const [saving, setSaving] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading && !hasConfig && !inline) {
      setIsOpen(true);
    }
  }, [loading, hasConfig, inline]);

  useEffect(() => {
    setPanelSize(initialSize);
    // Auto-select watts if capacity < 1 kW
    if (initialSize < 1 && initialSize > 0) {
      setUnit("W");
    }
  }, [initialSize]);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(panelSize);
    setSaving(false);
    if (success) setIsOpen(false);
  };

  // Convert kW to display value based on unit
  const toDisplayValue = (kw: number): number => {
    return unit === "W" ? Math.round(kw * 1000) : kw;
  };

  // Convert display value back to kW
  const fromDisplayValue = (val: number): number => {
    return unit === "W" ? val / 1000 : val;
  };

  const displayValue = toDisplayValue(panelSize);

  const sliderMin = unit === "W" ? 1 : 1;
  const sliderMax = unit === "W" ? 100000 : 100;
  const sliderStep = unit === "W" ? 1 : 0.5;
  const inputStep = unit === "W" ? 1 : 0.5;

  const handleSliderChange = (value: number[]) => {
    setPanelSize(fromDisplayValue(value[0]));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    if (isNaN(raw)) return;
    const clamped = Math.min(sliderMax, Math.max(sliderMin, raw));
    setPanelSize(fromDisplayValue(clamped));
  };

  const handleUnitSwitch = (newUnit: Unit) => {
    setUnit(newUnit);
  };

  const getSystemType = (sizeKw: number) => {
    if (sizeKw < 1) return t("systemTypeTiny") || "Micro System";
    if (sizeKw < 3) return t("systemTypeSmall");
    if (sizeKw < 7) return t("systemTypeMedium");
    if (sizeKw < 12) return t("systemTypeLarge");
    if (sizeKw < 50) return t("systemTypeCommercial");
    return t("systemTypeIndustrial");
  };

  const formatCapacity = (kw: number) => {
    if (kw < 1) return `${Math.round(kw * 1000)} W`;
    return `${kw} kW`;
  };

  const formContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="panel-size" className="text-base font-semibold">
            {t("systemCapacityKw")}
          </Label>
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => handleUnitSwitch("W")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                unit === "W"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              W
            </button>
            <button
              type="button"
              onClick={() => handleUnitSwitch("kW")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                unit === "kW"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              kW
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Slider
            id="panel-size"
            min={sliderMin} max={sliderMax} step={sliderStep}
            value={[displayValue]}
            onValueChange={handleSliderChange}
            className="flex-1"
          />
          <div className="flex items-center gap-1">
            <Input
              type="number" min={sliderMin} max={sliderMax} step={inputStep}
              value={displayValue}
              onChange={handleInputChange}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground font-medium w-6">{unit}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {unit === "W" ? (t("typicalRangeWatts") || "Range: 1 W – 100,000 W") : t("typicalRange")}
        </p>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("systemType")}</span>
          <span className="font-medium">{getSystemType(panelSize)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("estimatedPanels")}:</span>
          <span className="font-medium">{Math.max(1, Math.ceil(panelSize / 0.4))} {t("panels")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("dailyProductionAvg")}</span>
          <span className="font-medium">
            {panelSize < 1
              ? `${(panelSize * 4000).toFixed(0)} Wh`
              : `${(panelSize * 4).toFixed(1)} kWh`}
          </span>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full" size="lg" disabled={saving}>
        {saving ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t("saving")}</>
        ) : (
          t("saveConfiguration")
        )}
      </Button>
    </div>
  );

  if (inline) {
    return (
      <Card className="border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sun className="h-6 w-6 text-secondary" />
            {t("configureSystem")}
          </CardTitle>
          <CardDescription>{t("configureDesc")}</CardDescription>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    );
  }

  return (
    <>
      {hasConfig && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Reconfigure solar panel size"
        >
          <Settings className="h-6 w-6" />
        </button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sun className="h-6 w-6 text-secondary" />
              {t("configureSystem")}
            </DialogTitle>
            <DialogDescription>{t("configureDesc")}</DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    </>
  );
};
