import { Navigation } from "@/components/Navigation";
import { SolarDataChart } from "@/components/SolarDataChart";
import { Activity, Satellite, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Data Dashboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor real-time solar activity and analyze its impact on Earth's systems
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="glass p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Solar Activity</p>
                <p className="text-3xl font-bold text-primary">M5.4</p>
              </div>
              <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
            </div>
            <p className="text-xs text-muted-foreground">
              Current solar flare classification
            </p>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Geomagnetic Field</p>
                <p className="text-3xl font-bold text-secondary">Kp 6</p>
              </div>
              <Activity className="h-8 w-8 text-secondary animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground">
              Minor geomagnetic storm conditions
            </p>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Satellite Health</p>
                <p className="text-3xl font-bold text-accent">98%</p>
              </div>
              <Satellite className="h-8 w-8 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">
              Systems operational and protected
            </p>
          </Card>
        </div>

        {/* Main Chart */}
        <div className="mb-12">
          <SolarDataChart />
        </div>

        {/* Impact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Solar Flare Classifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">C-Class (1-9)</p>
                  <p className="text-xs text-muted-foreground">
                    Minor impact, minimal disruption to Earth
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">M-Class (1-9)</p>
                  <p className="text-xs text-muted-foreground">
                    Moderate impact, can cause radio blackouts at poles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">X-Class (1+)</p>
                  <p className="text-xs text-muted-foreground">
                    Major impact, widespread communications disruption
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-secondary" />
              Earth Impact Zones
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-3 w-3 rounded-full bg-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">GPS & Navigation</p>
                  <p className="text-xs text-muted-foreground">
                    Signal delays and accuracy reduction
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-3 w-3 rounded-full bg-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Power Grids</p>
                  <p className="text-xs text-muted-foreground">
                    Voltage fluctuations in high-latitude regions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-3 w-3 rounded-full bg-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Radio Communications</p>
                  <p className="text-xs text-muted-foreground">
                    HF radio blackouts on sunlit side of Earth
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
