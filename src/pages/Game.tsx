import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Shield, Target, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

const missions: Mission[] = [
  {
    id: 1,
    title: "Predict Aurora Visibility",
    description: "A CME is heading toward Earth with a speed of 800 km/s. Will auroras be visible in Alaska tonight?",
    difficulty: "Easy",
    points: 100,
  },
  {
    id: 2,
    title: "Protect the Satellite",
    description: "An X-class solar flare has been detected! Choose the correct protective measures for satellites in orbit.",
    difficulty: "Medium",
    points: 250,
  },
  {
    id: 3,
    title: "Power Grid Emergency",
    description: "Geomagnetic storm warning! Help power grid operators decide which regions need immediate protection.",
    difficulty: "Hard",
    points: 500,
  },
];

const Game = () => {
  const [score, setScore] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const handleMissionComplete = (missionId: number, success: boolean) => {
    if (success) {
      const mission = missions.find((m) => m.id === missionId);
      if (mission && !completedMissions.includes(missionId)) {
        setScore(score + mission.points);
        setCompletedMissions([...completedMissions, missionId]);
        toast.success("Mission Complete!", {
          description: `You earned ${mission.points} points!`,
        });
      }
    } else {
      toast.error("Mission Failed", {
        description: "Try again to master space weather prediction!",
      });
    }
    setSelectedMission(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Track the Storm
              </span>
            </h1>
            <Shield className="h-8 w-8 text-secondary animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Test your space weather knowledge! Complete missions to protect Earth's infrastructure
          </p>
        </div>

        {/* Score Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Trophy className="h-12 w-12 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Your Score</p>
                  <p className="text-4xl font-bold text-primary">{score}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Missions Completed</p>
                <p className="text-2xl font-bold text-secondary">
                  {completedMissions.length} / {missions.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mission Selection or Active Mission */}
        <div className="max-w-4xl mx-auto">
          {!selectedMission ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-8">
                Choose Your <span className="text-primary">Mission</span>
              </h2>
              {missions.map((mission) => {
                const isCompleted = completedMissions.includes(mission.id);
                return (
                  <Card
                    key={mission.id}
                    className={`glass p-6 transition-all ${
                      isCompleted
                        ? "opacity-60"
                        : "hover:scale-105 hover:border-primary/50 cursor-pointer"
                    }`}
                    onClick={() => !isCompleted && setSelectedMission(mission)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-bold">{mission.title}</h3>
                          {isCompleted && (
                            <span className="text-sm bg-green-500/20 text-green-500 px-3 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {mission.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${getDifficultyColor(mission.difficulty)}`}>
                            {mission.difficulty}
                          </span>
                          <span className="text-muted-foreground">
                            {mission.points} points
                          </span>
                        </div>
                      </div>
                      {!isCompleted && (
                        <Button
                          variant="outline"
                          className="ml-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMission(mission);
                          }}
                        >
                          Start Mission
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="glass p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedMission.title}</h3>
                    <p className="text-muted-foreground mb-4">{selectedMission.description}</p>
                    <span className={`font-medium ${getDifficultyColor(selectedMission.difficulty)}`}>
                      Difficulty: {selectedMission.difficulty}
                    </span>
                  </div>
                </div>

                {/* Mission-specific content would go here */}
                <div className="bg-muted/30 p-6 rounded-lg border border-primary/20">
                  <p className="text-sm text-center text-muted-foreground mb-6">
                    Interactive mission content would be displayed here. This is a demonstration of 
                    the game structure where you would make choices and solve space weather challenges.
                  </p>
                  
                  {/* Example choices */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-4"
                      onClick={() => handleMissionComplete(selectedMission.id, true)}
                    >
                      Option A: Correct Answer (Demo)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-4"
                      onClick={() => handleMissionComplete(selectedMission.id, false)}
                    >
                      Option B: Incorrect Answer (Demo)
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedMission(null)}
                  >
                    Cancel Mission
                  </Button>
                  <p className="text-sm text-muted-foreground self-center">
                    Potential reward: {selectedMission.points} points
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Coming Soon Note */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="glass p-6 border-accent/30">
            <p className="text-center text-sm text-muted-foreground">
              <span className="text-accent font-semibold">More missions coming soon!</span> Future 
              updates will include advanced challenges, leaderboards, and multiplayer modes.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Game;
