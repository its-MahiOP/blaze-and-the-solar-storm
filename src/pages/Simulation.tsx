import { Navigation } from "@/components/Navigation";
import { SolarSystem3D } from "@/components/SolarSystem3D";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const Simulation = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              3D Solar System
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interact with our Sun-Earth system in 3D. Launch solar flares and watch 
            coronal mass ejections travel through space!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Visualization - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SolarSystem3D />
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-3 mb-4">
                <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">How It Works</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="text-primary font-semibold">Click the Sun</span> to 
                      trigger a solar flare and launch a coronal mass ejection (CME).
                    </p>
                    <p>
                      <span className="text-secondary font-semibold">Watch the CME travel</span> from 
                      the Sun to Earth, simulating the real journey that takes about 31 hours.
                    </p>
                    <p>
                      <span className="text-accent font-semibold">Auroras appear</span> when 
                      the CME impacts Earth's magnetic field, creating beautiful light displays 
                      at the poles.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">
                What is a CME?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A <strong>Coronal Mass Ejection (CME)</strong> is a large expulsion of 
                plasma and magnetic field from the Sun's corona. When directed at Earth, 
                CMEs can trigger geomagnetic storms.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">
                    Speed: 250-3,000 km/s
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">
                    Travel time: 15-18 hours (fast) to 2-4 days (slow)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">
                    Impact: GPS, power grids, satellites, auroras
                  </span>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <h3 className="text-xl font-bold mb-4 text-secondary">
                Controls
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Orbit:</strong> Click and drag
                </div>
                <div>
                  <strong className="text-foreground">Zoom:</strong> Scroll wheel
                </div>
                <div>
                  <strong className="text-foreground">Pan:</strong> Right-click and drag
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
