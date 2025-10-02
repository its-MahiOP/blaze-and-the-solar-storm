import { Link, useLocation } from "react-router-dom";
import { Rocket, BookOpen, Eye, Globe, Gamepad2, Compass } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Rocket },
    { path: "/story", label: "Blaze's Story", icon: BookOpen },
    { path: "/impacts", label: "Impact Visualization", icon: Eye },
    { path: "/simulation", label: "3D Solar System", icon: Globe },
    { path: "/game", label: "Track the Storm", icon: Gamepad2 },
    { path: "/explore", label: "Explore", icon: Compass },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Rocket className="h-6 w-6 text-primary group-hover:animate-pulse-glow transition-all" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Space Weather Explorer
            </span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
