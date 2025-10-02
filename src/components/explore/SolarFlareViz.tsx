import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const SolarFlare = ({ intensity }: { intensity: number }) => {
  const flareRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (flareRef.current) {
      flareRef.current.rotation.y += 0.005;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.01;
    }
  });

  const flareScale = 1 + (intensity / 100) * 0.5;
  const flareIntensity = intensity / 100;

  // Create particles
  const particleCount = Math.floor(intensity * 2);
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 1.5 + Math.random() * 2;
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <group ref={flareRef}>
      {/* Sun core */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Flare burst */}
      <Sphere args={[flareScale, 32, 32]} scale={[1, 1, 1]}>
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={flareIntensity}
          transparent
          opacity={0.3 + flareIntensity * 0.3}
        />
      </Sphere>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#FFD700"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Intense glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={flareIntensity * 3}
        color="#FF6B35"
        distance={10}
      />
    </group>
  );
};

export const SolarFlareViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-purple-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <SolarFlare intensity={intensity} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
