import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import sunClose from "@/assets/sun-close.jpg";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

interface StoryPage {
  title: string;
  content: string;
  image?: string;
  choices?: { text: string; next: number }[];
}

const storyPages: StoryPage[] = [
  {
    title: "🌞 Born on the Sun",
    content: "Hi! I'm Blaze, a Coronal Mass Ejection! I was just born when the Sun had a BIG sneeze - a massive solar flare! Imagine billions of tons of hot, glowing plasma and magnetic energy bursting out into space. That's me! I'm carrying the Sun's energy, zooming through the cosmos at over 1,000 kilometers per second. That's SUPER fast - like a million miles per hour! Are you ready to travel with me on this incredible adventure?",
    image: sunClose,
    choices: [
      { text: "Let's go! Tell me more about solar flares!", next: 1 },
      { text: "Wow! What makes you so powerful?", next: 2 },
    ],
  },
  {
    title: "☀️ The Sun's Big Sneeze",
    content: "When the Sun gets really active, its magnetic fields twist and tangle like spaghetti! Sometimes they snap - BOOM! That's a solar flare. It releases huge amounts of energy as light and radiation. And that's when CMEs like me are born! We're like the Sun's messengers, carrying its power across space. The Sun has these sneezes more often during its 'active' years - about every 11 years in the solar cycle.",
    choices: [
      { text: "Fascinating! Now let's start the journey to Earth!", next: 3 },
      { text: "What happens if you're really strong?", next: 4 },
    ],
  },
  {
    title: "💪 My Power Level",
    content: "Solar flares are classified as C, M, or X class - with X being the strongest! The bigger the flare, the more powerful CMEs like me become. If I come from an X-class flare, I can create major geomagnetic storms on Earth. But don't worry - Earth has a protective magnetic shield called the magnetosphere. It's like a superhero force field! Still, my impact can affect satellites, GPS, power grids, and create AMAZING auroras!",
    choices: [
      { text: "Amazing! Let's continue the journey!", next: 3 },
    ],
  },
  {
    title: "🚀 Journey Through Space",
    content: "I'm now zooming through the solar wind - a constant stream of particles flowing from the Sun. It's like surfing on a river of energy! As I pass Mercury and Venus, I'm getting closer to Earth. My journey takes about 31 hours, but sometimes I can be faster or slower depending on how strong the solar flare was. Down on Earth, scientists at NASA and NOAA are watching me with their satellites!",
    choices: [
      { text: "How do they track you?", next: 5 },
      { text: "What happens when you reach Earth?", next: 6 },
    ],
  },
  {
    title: "🛰️ The Strongest CMEs",
    content: "When I come from a really powerful flare, I travel even FASTER - sometimes up to 3,000 kilometers per second! The strongest CMEs can cause major space weather events. But guess what? Scientists can see me coming! They track my speed, direction, and strength. This gives them time to warn astronauts, pilots, power grid operators, and satellite companies. Pretty cool, right?",
    choices: [
      { text: "Yes! How do they track you?", next: 5 },
      { text: "Let's see what happens at Earth!", next: 6 },
    ],
  },
  {
    title: "🔭 Scientists Are Watching",
    content: "NASA scientists at the Space Weather Prediction Center spotted me as soon as I left the Sun! They use amazing satellites like SOHO, STEREO, and the Solar Dynamics Observatory. These satellites take pictures of me and measure my speed and power. Dr. Martinez, a brilliant space weather scientist, is looking at her screens right now. She's sending alerts to airlines, power companies, and astronauts. Thanks to this early warning system, everyone can prepare!",
    choices: [
      { text: "That's smart! Now show me Earth's impact!", next: 6 },
    ],
  },
  {
    title: "🌍 Arriving at Earth",
    content: "I'm here! WHOOSH! I just collided with Earth's magnetosphere - its invisible magnetic shield. The impact is creating BEAUTIFUL auroras near the North and South Poles! People see green, purple, pink, and red lights dancing across the sky. It's magical! But my arrival also affects technology. Depending on my strength, I might cause GPS signals to wobble, radio communications to crackle, and power grids to fluctuate.",
    choices: [
      { text: "Show me how you affect satellites!", next: 7 },
      { text: "What happens to pilots and planes?", next: 8 },
      { text: "How do you impact people on Earth?", next: 9 },
    ],
  },
  {
    title: "📡 Stella the Satellite Wobbles",
    content: "Meet Stella, a GPS satellite orbiting Earth! When I arrive, Stella feels my charged particles pushing against her. Her signals start to wobble a bit - nothing dangerous, but GPS accuracy drops from a few meters to maybe 10-20 meters. For most people, that's okay! But for precision farming, airplane navigation, and surveying, it can be a problem. Stella sends an alert: 'Space weather event detected!' Her operators know to expect some signal delays.",
    choices: [
      { text: "Interesting! What about astronauts?", next: 10 },
      { text: "Show me impacts on people below!", next: 9 },
    ],
  },
  {
    title: "✈️ Captain Sarah Changes Course",
    content: "Captain Sarah is flying from New York to London when air traffic control sends her a message: 'Geomagnetic storm in progress - avoid polar routes.' Because of me, radio communications near the poles might experience blackouts. Sarah calmly adjusts her flight path, staying at lower latitudes where signals are stronger. She makes an announcement: 'Folks, we're taking a slightly different route today due to space weather. Look out the windows - you might see beautiful auroras!' Passengers press their faces to the glass in wonder.",
    choices: [
      { text: "Amazing! What about astronauts?", next: 10 },
      { text: "Show me Earth impacts!", next: 9 },
    ],
  },
  {
    title: "🌾 Life on Earth During My Visit",
    content: "Let me show you how I affect different people! In Canada, Farmer Tom's GPS-guided tractor acts a bit strange - the signals are fuzzy. He smiles and takes a break, knowing it's just space weather. In Texas, power grid operators watch their systems closely as voltage fluctuates slightly. In Norway, children play outside watching the auroras I created - green lights dancing like magic! Everyone is safe because scientists warned them I was coming.",
    choices: [
      { text: "What about astronauts in space?", next: 10 },
      { text: "Tell me more about auroras!", next: 11 },
    ],
  },
  {
    title: "🧑‍🚀 Astronauts Take Shelter",
    content: "On the International Space Station, alarm lights flash! Astronauts Maria and James receive an alert: 'CME impact imminent - take shelter in protected module.' They quickly move to the station's most shielded area. Up here, without Earth's atmosphere, they're more exposed to radiation. But they're safe in their special shelter! They postpone their spacewalk and instead take stunning photos of the auroras glowing below Earth. 'Look at those greens and purples!' Maria exclaims. 'Blaze put on quite a show!'",
    choices: [
      { text: "Beautiful! Tell me about auroras!", next: 11 },
      { text: "What happens as your journey ends?", next: 12 },
    ],
  },
  {
    title: "🌈 The Aurora Gift",
    content: "Auroras are my special gift to Earth! When my charged particles collide with oxygen and nitrogen atoms in Earth's atmosphere, they light up! Oxygen creates green and red auroras. Nitrogen makes blue and purple ones. The lights appear near the poles because Earth's magnetic field funnels my particles there. In Norway, Emma and her family watch the sky dance with shimmering curtains of light. 'It's like magic!' Emma whispers. Her dad smiles: 'It's science, sweetie - and it IS magical!'",
    choices: [
      { text: "That's beautiful! How does your journey end?", next: 12 },
    ],
  },
  {
    title: "👋 My Journey Ends",
    content: "As my energy spreads through Earth's magnetosphere, I slowly fade away. I've traveled 150 million kilometers from the Sun - that's 93 million miles! I've created beautiful auroras, helped scientists learn more about space weather, and reminded everyone how connected Earth is to the Sun. Technology mostly survived with just minor hiccups because humans were prepared! More CMEs like me are always on the way - the Sun never stops being active. Thanks for joining me on this adventure! Now you understand how space weather affects our incredible planet. Keep looking up! 🌟",
  },
];

const Story = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChoice = (nextPage: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const page = storyPages[currentPage];

  // Trigger content animation on page change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
          <ambientLight intensity={0.2} />
        </Canvas>
      </div>

      {/* Animated particle overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blaze's Journey
              </span>
            </h1>
            <Sparkles className="h-8 w-8 text-accent animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An Interactive Story from the Sun to Earth
          </p>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass p-8 md:p-12 min-h-[500px] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse-glow" />
            
            {/* Background decoration */}
            {page.image && (
              <div 
                className="absolute inset-0 opacity-10 transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${page.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            {/* Sparkle effects */}
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 text-accent animate-pulse-glow" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            </div>

            {/* Content */}
            <div className={`relative z-10 space-y-6 transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              {/* Progress indicator */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {storyPages.length}
                </span>
                <div className="flex gap-1">
                  {storyPages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-8 rounded-full transition-all ${
                        idx === currentPage
                          ? "bg-primary"
                          : idx < currentPage
                          ? "bg-secondary"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Story title */}
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
                {page.title}
              </h2>

              {/* Story content */}
              <p className="text-lg leading-relaxed text-foreground/90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {page.content}
              </p>

              {/* Interactive choices */}
              {page.choices && page.choices.length > 0 && (
                <div className="space-y-3 pt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <p className="text-sm font-medium text-muted-foreground">
                    What would you like to learn about?
                  </p>
                  {page.choices.map((choice, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleChoice(choice.next)}
                      variant="outline"
                      className="w-full justify-start h-auto py-4 px-6 text-left glass hover:border-primary hover:bg-primary/10 hover:scale-[1.02] transition-all duration-300 hover:glow-solar group"
                      style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-base">{choice.text}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 animate-fade-in">
            <Button
              onClick={handlePrev}
              disabled={currentPage === 0}
              variant="outline"
              className="gap-2 hover:scale-105 transition-all hover:glow-aurora"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground animate-pulse">
              {currentPage === storyPages.length - 1
                ? "🌟 The End 🌟"
                : "Continue reading"}
            </span>

            <Button
              onClick={handleNext}
              disabled={currentPage === storyPages.length - 1}
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all hover:glow-solar"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
