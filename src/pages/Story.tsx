import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import sunClose from "@/assets/sun-close.jpg";

interface StoryPage {
  title: string;
  content: string;
  image?: string;
  choices?: { text: string; next: number }[];
}

const storyPages: StoryPage[] = [
  {
    title: "Meet Blaze",
    content: "Hi! I'm Blaze, a Coronal Mass Ejection born from the Sun's corona. Today, I'm going on an incredible journey to Earth! The Sun just released me during a powerful solar flare, and now I'm zooming through space at over 1,000 kilometers per second. That's more than a million miles per hour! Are you ready to travel with me?",
    image: sunClose,
  },
  {
    title: "Leaving the Sun",
    content: "As I leave the Sun's surface, I carry billions of tons of plasma and magnetic fields with me. The Sun's corona is super hot - about 1 million degrees Celsius! I'm part of a massive cloud of charged particles, and together we're heading toward Earth. The journey will take about 31 hours. Let me tell you about all the amazing things I'll encounter along the way!",
  },
  {
    title: "Through the Solar Wind",
    content: "I'm now traveling through the solar wind - a constant stream of particles flowing from the Sun. It's like swimming in a river of energy! As I zoom past Mercury and Venus, I'm getting closer to Earth. The solar wind helps push me along, and my magnetic field is getting stronger. Down on Earth, scientists are watching me with their satellites and telescopes.",
    choices: [
      { text: "What happens when I reach Earth?", next: 3 },
      { text: "How do scientists track me?", next: 4 },
    ],
  },
  {
    title: "Arriving at Earth",
    content: "I've arrived! I'm now colliding with Earth's magnetosphere - its protective magnetic shield. The impact creates a beautiful light show called auroras near the North and South Poles. People on Earth see green, purple, and red lights dancing in the sky. But my arrival also causes some problems: GPS signals might get fuzzy, radio communications could be disrupted, and power grids need to be careful. Let me show you how I affect different people on Earth...",
  },
  {
    title: "Scientists Tracking Me",
    content: "NASA scientists at the Space Weather Prediction Center have been watching me since I left the Sun! They use satellites like SOHO and STEREO to track my journey. When they spotted me, they sent out alerts to airlines, power companies, and satellite operators. A scientist named Dr. Martinez is looking at her computer screen right now, watching my progress. Thanks to their early warning system, everyone on Earth can prepare for my arrival!",
  },
  {
    title: "Affecting a Pilot",
    content: "Captain Sarah is flying a plane from New York to London when I arrive. Because of me, she has to change her route! During strong geomagnetic storms like the one I'm causing, planes flying near the poles can experience radio blackouts. Sarah talks to air traffic control and adjusts her flight path to stay safe. She tells her passengers they might see beautiful auroras through the window!",
  },
  {
    title: "Impact on a Farmer",
    content: "Farmer Tom is working in his field in Canada when his GPS-guided tractor starts acting strange. His precision farming equipment depends on GPS satellites, and my arrival is interfering with the signals. Tom knows about space weather from his farming association's alerts. He decides to pause his work until I pass by. Tomorrow, when things are back to normal, his GPS will work perfectly again!",
  },
  {
    title: "Astronauts in Danger",
    content: "On the International Space Station, astronauts Maria and James receive an alert: take shelter! Without Earth's protective atmosphere, they're more exposed to my radiation. They move to the most shielded part of the station and postpone their planned spacewalk. Even though I might seem scary, they're safe inside. They take this opportunity to photograph the amazing auroras I'm creating below!",
  },
  {
    title: "Children Watching Auroras",
    content: "In Norway, Emma and her family bundle up and go outside to watch the auroras I've created. The sky is filled with shimmering green curtains of light, dancing and swirling. Emma's dad explains how I traveled from the Sun and how my charged particles are colliding with atoms in Earth's atmosphere, creating this magical display. Emma decides she wants to be a space scientist when she grows up!",
  },
  {
    title: "My Journey Ends",
    content: "As my energy spreads through Earth's magnetosphere, my journey comes to an end. I've traveled 150 million kilometers from the Sun! I've created beautiful auroras, taught people about space weather, and reminded everyone how connected Earth is to the Sun. But don't worry - more CMEs like me are always on their way. Every 11 years, the Sun goes through a solar cycle with lots of activity. Thanks for joining me on this adventure! Now you know how space weather affects our amazing planet. Keep looking up at the sky!",
  },
];

const Story = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleChoice = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = storyPages[currentPage];

  return (
    <div className="min-h-screen">
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
          <Card className="glass p-8 md:p-12 min-h-[500px] relative overflow-hidden">
            {/* Background decoration */}
            {page.image && (
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url(${page.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            {/* Content */}
            <div className="relative z-10 space-y-6">
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {page.title}
              </h2>

              {/* Story content */}
              <p className="text-lg leading-relaxed text-foreground/90">
                {page.content}
              </p>

              {/* Interactive choices */}
              {page.choices && page.choices.length > 0 && (
                <div className="space-y-3 pt-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    What would you like to learn about?
                  </p>
                  {page.choices.map((choice, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleChoice(choice.next)}
                      variant="outline"
                      className="w-full justify-start h-auto py-4 px-6 text-left glass hover:border-primary hover:bg-primary/10 transition-all"
                    >
                      <span className="text-base">{choice.text}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handlePrev}
              disabled={currentPage === 0}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentPage === storyPages.length - 1
                ? "The End"
                : "Continue reading"}
            </span>

            <Button
              onClick={handleNext}
              disabled={currentPage === storyPages.length - 1}
              className="gap-2 bg-gradient-to-r from-primary to-secondary"
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
