import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { 
  Sun, 
  Wind, 
  Zap, 
  Waves, 
  Sparkles, 
  Satellite 
} from "lucide-react";
import { SolarFlareViz } from "@/components/explore/SolarFlareViz";
import { CMEViz } from "@/components/explore/CMEViz";
import { SolarWindViz } from "@/components/explore/SolarWindViz";
import { GeomagneticStormViz } from "@/components/explore/GeomagneticStormViz";
import { AuroraViz } from "@/components/explore/AuroraViz";
import { TechImpactViz } from "@/components/explore/TechImpactViz";

const Explore = () => {
  const [solarFlareIntensity, setSolarFlareIntensity] = useState([50]);
  const [cmeSpeed, setCmeSpeed] = useState([50]);
  const [solarWindSpeed, setSolarWindSpeed] = useState([50]);
  const [stormIntensity, setStormIntensity] = useState([50]);
  const [auroraIntensity, setAuroraIntensity] = useState([50]);
  const [techImpactLevel, setTechImpactLevel] = useState([50]);

  const exploreTopics = [
    {
      id: "solar-flare",
      label: "Solar Flare",
      icon: Sun,
      title: "Solar Flares",
      description: "Sudden, intense bursts of radiation from the Sun's surface caused by magnetic energy release.",
      intensity: solarFlareIntensity,
      setIntensity: setSolarFlareIntensity,
      component: SolarFlareViz,
      impacts: [
        "Radio blackouts on sunlit side of Earth",
        "GPS signal disruption",
        "Radiation exposure for astronauts",
        "Satellite electronics damage"
      ]
    },
    {
      id: "cme",
      label: "CME",
      icon: Waves,
      title: "Coronal Mass Ejections",
      description: "Massive eruptions of plasma and magnetic field from the Sun's corona into space.",
      intensity: cmeSpeed,
      setIntensity: setCmeSpeed,
      component: CMEViz,
      impacts: [
        "Geomagnetic storms when hitting Earth",
        "Power grid fluctuations",
        "Satellite orbit changes",
        "Aurora displays at high latitudes"
      ]
    },
    {
      id: "solar-wind",
      label: "Solar Wind",
      icon: Wind,
      title: "Solar Wind",
      description: "Continuous stream of charged particles flowing from the Sun throughout the solar system.",
      intensity: solarWindSpeed,
      setIntensity: setSolarWindSpeed,
      component: SolarWindViz,
      impacts: [
        "Shapes Earth's magnetosphere",
        "Creates auroras at poles",
        "Affects satellite drag",
        "Influences space weather patterns"
      ]
    },
    {
      id: "geomagnetic",
      label: "Geomagnetic Storms",
      icon: Zap,
      title: "Geomagnetic Storms",
      description: "Disturbances in Earth's magnetosphere caused by solar wind and CME interactions.",
      intensity: stormIntensity,
      setIntensity: setStormIntensity,
      component: GeomagneticStormViz,
      impacts: [
        "Power grid voltage irregularities",
        "Pipeline corrosion acceleration",
        "Spacecraft charging issues",
        "Navigation system errors"
      ]
    },
    {
      id: "auroras",
      label: "Auroras",
      icon: Sparkles,
      title: "Auroras (Northern & Southern Lights)",
      description: "Beautiful light displays in polar skies caused by solar particles colliding with Earth's atmosphere.",
      intensity: auroraIntensity,
      setIntensity: setAuroraIntensity,
      component: AuroraViz,
      impacts: [
        "Natural light shows at high latitudes",
        "Indicator of geomagnetic activity",
        "Visible during strong solar storms",
        "Colors depend on atmospheric gases"
      ]
    },
    {
      id: "tech-impacts",
      label: "Tech Impacts",
      icon: Satellite,
      title: "Technology Impacts",
      description: "How space weather affects our modern technology and infrastructure on Earth and in space.",
      intensity: techImpactLevel,
      setIntensity: setTechImpactLevel,
      component: TechImpactViz,
      impacts: [
        "GPS accuracy reduction",
        "Communication satellite disruption",
        "Airline route diversions",
        "Power transformer damage"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Solar Weather Explorer
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and interact with different space weather phenomena through 3D visualizations
          </p>
        </div>

        <Tabs defaultValue="solar-flare" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {exploreTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <TabsTrigger 
                  key={topic.id} 
                  value={topic.id}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{topic.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {exploreTopics.map((topic) => {
            const VizComponent = topic.component;
            return (
              <TabsContent key={topic.id} value={topic.id} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* 3D Visualization */}
                  <div className="lg:col-span-2">
                    <Card className="glass p-6">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <VizComponent intensity={topic.intensity[0]} />
                      </div>
                    </Card>
                  </div>

                  {/* Info & Controls */}
                  <div className="space-y-6">
                    <Card className="glass p-6">
                      <h2 className="text-2xl font-bold mb-3 text-primary">
                        {topic.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {topic.description}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Intensity Level: {topic.intensity[0]}%
                          </label>
                          <Slider
                            value={topic.intensity}
                            onValueChange={topic.setIntensity}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </Card>

                    <Card className="glass p-6">
                      <h3 className="text-lg font-bold mb-4 text-secondary">
                        Effects & Impacts
                      </h3>
                      <ul className="space-y-3">
                        {topic.impacts.map((impact, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{impact}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;
