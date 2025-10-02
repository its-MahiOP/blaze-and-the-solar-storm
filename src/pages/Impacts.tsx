import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ImpactEarth3D } from "@/components/ImpactEarth3D";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Satellite, 
  Radio, 
  Lightbulb, 
  Navigation as NavIcon,
  Users,
  AlertTriangle,
  Sparkles
} from "lucide-react";

interface ImpactIndicator {
  icon: React.ReactNode;
  label: string;
  status: string;
  severity: "low" | "medium" | "high";
}

const Impacts = () => {
  const [cmeIntensity, setCmeIntensity] = useState(50);
  const [solarWindSpeed, setSolarWindSpeed] = useState(400);
  
  // Calculate impact levels based on parameters
  const auroraIntensity = Math.min((cmeIntensity / 100) * (solarWindSpeed / 500), 1);
  const disruptionLevel = Math.min((cmeIntensity / 80) * (solarWindSpeed / 600), 1);
  
  const getFlareClass = (intensity: number): string => {
    if (intensity < 30) return "C-Class";
    if (intensity < 70) return "M-Class";
    return "X-Class";
  };
  
  const getImpactSeverity = (level: number): "low" | "medium" | "high" => {
    if (level < 0.3) return "low";
    if (level < 0.7) return "medium";
    return "high";
  };
  
  const impacts: ImpactIndicator[] = [
    {
      icon: <Satellite className="h-5 w-5" />,
      label: "Satellite Operations",
      status: disruptionLevel > 0.7 ? "Major disruptions" : disruptionLevel > 0.4 ? "Minor delays" : "Normal",
      severity: getImpactSeverity(disruptionLevel)
    },
    {
      icon: <NavIcon className="h-5 w-5" />,
      label: "GPS Navigation",
      status: disruptionLevel > 0.7 ? "Accuracy reduced 10-20m" : disruptionLevel > 0.4 ? "Slight variations" : "Normal",
      severity: getImpactSeverity(disruptionLevel)
    },
    {
      icon: <Radio className="h-5 w-5" />,
      label: "Radio Communications",
      status: disruptionLevel > 0.7 ? "HF blackouts" : disruptionLevel > 0.4 ? "Signal degradation" : "Clear",
      severity: getImpactSeverity(disruptionLevel)
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      label: "Power Grids",
      status: disruptionLevel > 0.7 ? "Voltage fluctuations" : disruptionLevel > 0.4 ? "Minor surges" : "Stable",
      severity: getImpactSeverity(disruptionLevel)
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Aviation",
      status: disruptionLevel > 0.7 ? "Polar route changes" : disruptionLevel > 0.4 ? "Monitoring" : "Normal ops",
      severity: getImpactSeverity(disruptionLevel)
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: "Aurora Visibility",
      status: auroraIntensity > 0.7 ? "Visible to latitude 45°" : auroraIntensity > 0.4 ? "Visible at poles" : "Minimal",
      severity: auroraIntensity > 0.5 ? "high" : auroraIntensity > 0.3 ? "medium" : "low"
    },
  ];
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Space Weather Impacts
              </span>
            </h1>
            <Zap className="h-8 w-8 text-accent animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore how solar activity affects Earth's technology, communications, and creates beautiful auroras
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Earth Visualization - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Live Earth Impact Visualization
              </h2>
              <div className="h-[500px] rounded-xl overflow-hidden border-2 border-primary/30 glow-solar">
                <ImpactEarth3D 
                  auroraIntensity={auroraIntensity}
                  disruptionLevel={disruptionLevel}
                  showSatellites={true}
                />
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                <p className="flex items-center justify-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Aurora activity at poles
                  <span className="mx-2">•</span>
                  <span className="inline-block h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  Magnetic field disruptions
                  <span className="mx-2">•</span>
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                  Satellites in orbit
                </p>
              </div>
            </Card>

            {/* Interactive Controls */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  CME Intensity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Flare Class:</span>
                    <Badge className={getSeverityColor(getImpactSeverity(cmeIntensity / 100))}>
                      {getFlareClass(cmeIntensity)}
                    </Badge>
                  </div>
                  <Slider
                    value={[cmeIntensity]}
                    onValueChange={(v) => setCmeIntensity(v[0])}
                    min={10}
                    max={100}
                    step={5}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (C-Class)</span>
                    <span>High (X-Class)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adjust the intensity of the coronal mass ejection to see different impact levels
                  </p>
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Radio className="h-5 w-5 text-secondary" />
                  Solar Wind Speed
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Speed:</span>
                    <Badge variant="outline">
                      {solarWindSpeed} km/s
                    </Badge>
                  </div>
                  <Slider
                    value={[solarWindSpeed]}
                    onValueChange={(v) => setSolarWindSpeed(v[0])}
                    min={300}
                    max={900}
                    step={50}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slow (300 km/s)</span>
                    <span>Fast (900 km/s)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Faster solar wind enhances CME impacts and aurora intensity
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Impact Indicators Panel */}
          <div className="space-y-6">
            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Real-Time Impact Status
              </h3>
              <div className="space-y-4">
                {impacts.map((impact, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-lg border transition-all ${getSeverityColor(impact.severity)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{impact.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm mb-1">{impact.label}</p>
                        <p className="text-xs opacity-90">{impact.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">
                Understanding Impacts
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">CME Intensity:</strong> Stronger solar flares create more powerful CMEs with greater potential for disruption.
                </p>
                <p>
                  <strong className="text-foreground">Solar Wind:</strong> Fast solar wind speeds enhance CME effects and push auroras to lower latitudes.
                </p>
                <p>
                  <strong className="text-foreground">Auroras:</strong> Created when charged particles collide with Earth's atmosphere, producing stunning light displays.
                </p>
                <p>
                  <strong className="text-foreground">Technology:</strong> Modern systems monitor space weather to protect infrastructure and maintain operations.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Impact Scenarios */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Who Gets <span className="text-primary">Affected?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass p-6 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Pilots & Airlines</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                During strong storms, polar flights may be rerouted due to radio blackouts. Passengers might see beautiful auroras through windows!
              </p>
            </Card>

            <Card className="glass p-6 hover:border-secondary/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Satellite className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold">Satellites & GPS</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                GPS accuracy can decrease during geomagnetic storms, affecting precision farming, surveying, and navigation systems.
              </p>
            </Card>

            <Card className="glass p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold">Power Grids</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                High-latitude power grids may experience voltage fluctuations. Operators monitor and protect systems during space weather events.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impacts;
