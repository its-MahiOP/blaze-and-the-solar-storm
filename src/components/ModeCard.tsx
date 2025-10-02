import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ModeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
  delay?: number;
}

export const ModeCard = ({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  gradient,
  delay = 0 
}: ModeCardProps) => {
  return (
    <Link to={path} className="block group">
      <Card 
        className="glass hover:scale-105 transition-all duration-300 p-8 h-full border-2 border-transparent hover:border-primary/50 relative overflow-hidden"
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: gradient }}
        />
        
        {/* Icon with glow effect */}
        <div className="relative z-10 mb-6">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:animate-pulse-glow">
            <Icon className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </div>
      </Card>
    </Link>
  );
};
