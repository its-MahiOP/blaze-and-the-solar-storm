import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const SolarWind = ({ intensity }: { intensity: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  const particleCount = Math.floor(intensity * 5);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = -Math.random() * 10;
      velocities[i] = 0.02 + Math.random() * 0.03;
    }
    
    return { positions, velocities };
  }, [particleCount]);

  useFrame(() => {
    if (particlesRef.current && particlesRef.current.geometry.attributes.position) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += particles.velocities[i] * (intensity / 50);
        
        if (positions[i * 3 + 2] > 5) {
          positions[i * 3 + 2] = -10;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Sun */}
      <Sphere ref={sunRef} args={[1, 32, 32]} position={[0, 0, -8]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={0.6}
        />
      </Sphere>

      {/* Solar wind particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#FFD700"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      <pointLight position={[0, 0, -8]} intensity={2} color="#FDB813" distance={15} />
    </group>
  );
};

export const SolarWindViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-indigo-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <SolarWind intensity={intensity} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
