import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Zap } from "lucide-react";
import { toast } from "sonner";

// Sun component with pulsing animation
function Sun({ onFlare }: { onFlare: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere 
      ref={meshRef} 
      args={[2, 64, 64]} 
      position={[-8, 0, 0]}
      onClick={onFlare}
    >
      <meshStandardMaterial
        emissive="#ff6b00"
        emissiveIntensity={1.5}
        color="#ff8800"
      />
      {/* Sun glow */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={20} color="#ff6b00" />
    </Sphere>
  );
}

// Earth component with rotation and auroras
function Earth({ auroraIntensity = 0 }: { auroraIntensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const auroraRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (auroraRef.current && auroraIntensity > 0) {
      auroraRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[8, 0, 0]}>
      {/* Earth */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#2266dd"
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.1, 32, 32]}>
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Aurora effect */}
      {auroraIntensity > 0 && (
        <Sphere ref={auroraRef} args={[1.15, 32, 32]}>
          <meshBasicMaterial
            color="#00ffaa"
            transparent
            opacity={auroraIntensity * 0.3}
            side={THREE.BackSide}
          />
        </Sphere>
      )}
    </group>
  );
}

// CME particle traveling from Sun to Earth
function CME({ active, speed }: { active: boolean; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame(() => {
    if (active && meshRef.current && progress < 1) {
      setProgress((p) => Math.min(p + speed / 1000, 1));
      const x = -8 + progress * 16; // From sun (-8) to earth (8)
      meshRef.current.position.x = x;
    }
  });

  if (!active || progress >= 1) return null;

  return (
    <Sphere ref={meshRef} args={[0.2, 16, 16]} position={[-8, 0, 0]}>
      <meshBasicMaterial color="#ff3300" />
      <pointLight position={[0, 0, 0]} intensity={1} distance={2} color="#ff3300" />
    </Sphere>
  );
}

export const SolarSystem3D = () => {
  const [cmeActive, setCmeActive] = useState(false);
  const [cmeSpeed, setCmeSpeed] = useState(50);
  const [auroraIntensity, setAuroraIntensity] = useState(0);

  const handleFlare = () => {
    setCmeActive(true);
    toast.success("Solar Flare Detected! CME Launched", {
      description: "Watch the coronal mass ejection travel to Earth",
    });
    
    // Simulate CME impact after delay
    const travelTime = (31 * 60 * 60 * 1000) / (cmeSpeed * 100); // Scaled down
    setTimeout(() => {
      setAuroraIntensity(1);
      toast.info("CME Impact!", {
        description: "Beautiful auroras forming at Earth's poles",
      });
      
      // Reset after showing auroras
      setTimeout(() => {
        setCmeActive(false);
        setAuroraIntensity(0);
      }, 5000);
    }, Math.min(travelTime, 5000));
  };

  return (
    <div className="w-full h-full">
      {/* 3D Scene */}
      <div className="w-full h-[600px] rounded-2xl overflow-hidden border-2 border-primary/30 glow-solar">
        <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
          <color attach="background" args={["#000510"]} />
          <ambientLight intensity={0.1} />
          <Stars radius={300} depth={50} count={5000} factor={4} />
          
          <Sun onFlare={handleFlare} />
          <Earth auroraIntensity={auroraIntensity} />
          <CME active={cmeActive} speed={cmeSpeed} />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            minDistance={10}
            maxDistance={30}
          />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-4">
        <Button 
          onClick={handleFlare}
          disabled={cmeActive}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          size="lg"
        >
          <Zap className="mr-2 h-5 w-5" />
          {cmeActive ? "CME In Progress..." : "Launch Solar Flare"}
        </Button>

        <div className="glass p-4 rounded-xl space-y-2">
          <label className="text-sm font-medium">CME Speed: {cmeSpeed}%</label>
          <Slider
            value={[cmeSpeed]}
            onValueChange={(v) => setCmeSpeed(v[0])}
            min={25}
            max={100}
            step={25}
            disabled={cmeActive}
          />
          <p className="text-xs text-muted-foreground">
            Adjust the speed of the coronal mass ejection
          </p>
        </div>
      </div>
    </div>
  );
};
