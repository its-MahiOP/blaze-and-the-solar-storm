import { Telescope, BookOpen, LineChart, Gamepad2 } from "lucide-react";
import { ModeCard } from "@/components/ModeCard";
import spaceBackground from "@/assets/space-background.jpg";

const Home = () => {
  const modes = [
    {
      title: "3D Solar System",
      description: "Explore interactive 3D visualizations of space weather events, solar flares, and CME impacts on Earth in real-time.",
      icon: Telescope,
      path: "/simulation",
      gradient: "linear-gradient(135deg, hsl(25, 95%, 55%) 0%, hsl(40, 100%, 60%) 100%)",
      delay: 0,
    },
    {
      title: "Blaze's Story",
      description: "Follow the journey of a CME named Blaze from the Sun to Earth through an interactive educational narrative.",
      icon: BookOpen,
      path: "/story",
      gradient: "linear-gradient(135deg, hsl(180, 80%, 50%) 0%, hsl(270, 70%, 60%) 100%)",
      delay: 100,
    },
    {
      title: "Data Dashboard",
      description: "Analyze real-time solar wind data, flare intensities, and their impacts on GPS, communications, and power grids.",
      icon: LineChart,
      path: "/dashboard",
      gradient: "linear-gradient(135deg, hsl(270, 70%, 60%) 0%, hsl(140, 80%, 50%) 100%)",
      delay: 200,
    },
    {
      title: "Track the Storm",
      description: "Test your knowledge in a gamified mission to predict auroras, protect satellites, and save Earth's infrastructure.",
      icon: Gamepad2,
      path: "/game",
      gradient: "linear-gradient(135deg, hsl(140, 80%, 50%) 0%, hsl(25, 95%, 55%) 100%)",
      delay: 300,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${spaceBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-12">
          <div className="text-center space-y-6 animate-float">
            <h1 className="text-6xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Space Weather
              </span>
              <br />
              <span className="text-foreground">Explorer</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Embark on an educational journey through space weather phenomena. 
              Explore solar flares, coronal mass ejections, and their fascinating effects on Earth.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              <span className="text-sm text-muted-foreground font-medium">
                NASA Space Apps Challenge 2025
              </span>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="container mx-auto px-6 py-8">
          <div className="glass p-8 rounded-2xl border-2 border-primary/20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Understanding Space Weather
            </h2>
            <p className="text-muted-foreground leading-relaxed text-center">
              Space weather refers to conditions on the Sun and in the solar wind, magnetosphere, 
              ionosphere, and thermosphere that can influence the performance of technology we use 
              every day. Learn how <span className="text-primary font-semibold">solar flares</span>, {" "}
              <span className="text-secondary font-semibold">coronal mass ejections (CMEs)</span>, and {" "}
              <span className="text-accent font-semibold">solar wind</span> affect our planet and create 
              beautiful auroras while impacting satellites, GPS, and power grids.
            </p>
          </div>
        </section>

        {/* Mode Selection Grid */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your <span className="text-primary">Experience</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {modes.map((mode) => (
              <ModeCard key={mode.path} {...mode} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center">
          <div className="glass p-6 rounded-xl inline-block">
            <p className="text-sm text-muted-foreground">
              Built for the{" "}
              <span className="text-primary font-semibold">
                NASA Space Apps Challenge 2025
              </span>
              <br />
              Theme: Stellar Stories - Space Weather Through the Eyes of Earthlings
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
