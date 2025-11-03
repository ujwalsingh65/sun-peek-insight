import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Settings, Sun } from "lucide-react";

interface SolarPanelSetupProps {
  onSizeSet: (size: number) => void;
}

export const SolarPanelSetup = ({ onSizeSet }: SolarPanelSetupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelSize, setPanelSize] = useState(5);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const storedSize = localStorage.getItem("solarPanelSize");
    if (!storedSize) {
      setIsOpen(true);
    } else {
      setPanelSize(parseFloat(storedSize));
      onSizeSet(parseFloat(storedSize));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("solarPanelSize", panelSize.toString());
    onSizeSet(panelSize);
    setIsOpen(false);
    setShowSettings(true);
  };

  const handleReconfigure = () => {
    setIsOpen(true);
  };

  return (
    <>
      {showSettings && (
        <button
          onClick={handleReconfigure}
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
              Configure Your Solar System
            </DialogTitle>
            <DialogDescription>
              Enter your solar panel system capacity to get accurate production estimates and savings calculations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Label htmlFor="panel-size" className="text-base font-semibold">
                System Capacity (kW)
              </Label>
              
              <div className="flex items-center gap-4">
                <Slider
                  id="panel-size"
                  min={1}
                  max={20}
                  step={0.5}
                  value={[panelSize]}
                  onValueChange={(value) => setPanelSize(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  max={20}
                  step={0.5}
                  value={panelSize}
                  onChange={(e) => setPanelSize(parseFloat(e.target.value) || 1)}
                  className="w-24"
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Typical residential systems range from 3-10 kW
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">System Type:</span>
                <span className="font-medium">
                  {panelSize < 3 ? "Small" : panelSize < 7 ? "Medium" : panelSize < 12 ? "Large" : "Industrial"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Panels:</span>
                <span className="font-medium">{Math.ceil(panelSize / 0.4)} panels</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily Production (avg):</span>
                <span className="font-medium">{(panelSize * 4).toFixed(1)} kWh</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full"
            size="lg"
          >
            Save Configuration
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
