import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const Aurora = ({ intensity }: { intensity: number }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const northAurora1Ref = useRef<THREE.Mesh>(null);
  const northAurora2Ref = useRef<THREE.Mesh>(null);
  const northAurora3Ref = useRef<THREE.Mesh>(null);
  const southAurora1Ref = useRef<THREE.Mesh>(null);
  const southAurora2Ref = useRef<THREE.Mesh>(null);
  const southAurora3Ref = useRef<THREE.Mesh>(null);
  const solarWindRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    
    // Animate aurora curtains with wave effect
    if (northAurora1Ref.current) {
      northAurora1Ref.current.rotation.y += 0.008;
      const wave1 = Math.sin(time * 2) * 0.15;
      northAurora1Ref.current.scale.set(1 + wave1, 1 + wave1 * 0.5, 1 + wave1);
    }
    
    if (northAurora2Ref.current) {
      northAurora2Ref.current.rotation.y += 0.012;
      const wave2 = Math.sin(time * 2.5 + 1) * 0.12;
      northAurora2Ref.current.scale.set(1 + wave2, 1 + wave2 * 0.6, 1 + wave2);
    }

    if (northAurora3Ref.current) {
      northAurora3Ref.current.rotation.y += 0.015;
      const wave3 = Math.sin(time * 3 + 2) * 0.1;
      northAurora3Ref.current.scale.set(1 + wave3, 1 + wave3 * 0.7, 1 + wave3);
    }

    if (southAurora1Ref.current) {
      southAurora1Ref.current.rotation.y -= 0.008;
      const wave1 = Math.cos(time * 2) * 0.15;
      southAurora1Ref.current.scale.set(1 + wave1, 1 + wave1 * 0.5, 1 + wave1);
    }

    if (southAurora2Ref.current) {
      southAurora2Ref.current.rotation.y -= 0.012;
      const wave2 = Math.cos(time * 2.5 + 1) * 0.12;
      southAurora2Ref.current.scale.set(1 + wave2, 1 + wave2 * 0.6, 1 + wave2);
    }

    if (southAurora3Ref.current) {
      southAurora3Ref.current.rotation.y -= 0.015;
      const wave3 = Math.cos(time * 3 + 2) * 0.1;
      southAurora3Ref.current.scale.set(1 + wave3, 1 + wave3 * 0.7, 1 + wave3);
    }

    // Animate solar wind particles
    if (solarWindRef.current) {
      solarWindRef.current.rotation.y += 0.005;
    }
  });

  const auroraIntensity = intensity / 100;

  return (
    <group>
      {/* Solar Wind Particles */}
      <group ref={solarWindRef}>
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const distance = 3 + Math.random() * 2;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          const y = (Math.random() - 0.5) * 4;
          
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.03 + Math.random() * 0.03, 8, 8]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={1.5 * auroraIntensity}
                transparent
                opacity={0.6 + auroraIntensity * 0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* Earth with realistic colors */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          emissive="#0c2d5e"
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* North Aurora - Multiple colorful layers */}
      {/* Layer 1: Bright Green (oxygen at 100-250km) */}
      <mesh ref={northAurora1Ref} position={[0, 1.4, 0]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.6, 1.4, 64]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={auroraIntensity * 3}
          transparent
          opacity={0.7 + auroraIntensity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 2: Pink/Magenta (nitrogen) */}
      <mesh ref={northAurora2Ref} position={[0, 1.35, 0]} rotation={[0, 1, 0]}>
        <ringGeometry args={[0.7, 1.3, 64]} />
        <meshStandardMaterial
          color="#ff1493"
          emissive="#ff1493"
          emissiveIntensity={auroraIntensity * 2.5}
          transparent
          opacity={0.5 + auroraIntensity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 3: Blue-violet (oxygen at high altitude) */}
      <mesh ref={northAurora3Ref} position={[0, 1.3, 0]} rotation={[0, 2, 0]}>
        <ringGeometry args={[0.5, 1.2, 64]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={auroraIntensity * 2}
          transparent
          opacity={0.6 + auroraIntensity * 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* South Aurora - Multiple colorful layers */}
      {/* Layer 1: Bright Green */}
      <mesh ref={southAurora1Ref} position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
        <ringGeometry args={[0.6, 1.4, 64]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={auroraIntensity * 3}
          transparent
          opacity={0.7 + auroraIntensity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 2: Pink/Magenta */}
      <mesh ref={southAurora2Ref} position={[0, -1.35, 0]} rotation={[Math.PI, 1, 0]}>
        <ringGeometry args={[0.7, 1.3, 64]} />
        <meshStandardMaterial
          color="#ff1493"
          emissive="#ff1493"
          emissiveIntensity={auroraIntensity * 2.5}
          transparent
          opacity={0.5 + auroraIntensity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 3: Blue-violet */}
      <mesh ref={southAurora3Ref} position={[0, -1.3, 0]} rotation={[Math.PI, 2, 0]}>
        <ringGeometry args={[0.5, 1.2, 64]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={auroraIntensity * 2}
          transparent
          opacity={0.6 + auroraIntensity * 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric glow - North */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.4 + auroraIntensity * 0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={auroraIntensity * 2}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Atmospheric glow - South */}
      <mesh position={[0, -1.6, 0]}>
        <sphereGeometry args={[0.4 + auroraIntensity * 0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={auroraIntensity * 2}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Colorful point lights */}
      <pointLight position={[0, 1.6, 0]} intensity={auroraIntensity * 3} color="#00ff88" distance={5} />
      <pointLight position={[0, 1.5, 0.5]} intensity={auroraIntensity * 2} color="#ff1493" distance={4} />
      <pointLight position={[0, 1.5, -0.5]} intensity={auroraIntensity * 2} color="#8a2be2" distance={4} />
      <pointLight position={[0, -1.6, 0]} intensity={auroraIntensity * 3} color="#00ff88" distance={5} />
      <pointLight position={[0, -1.5, 0.5]} intensity={auroraIntensity * 2} color="#ff1493" distance={4} />
      <pointLight position={[0, -1.5, -0.5]} intensity={auroraIntensity * 2} color="#8a2be2" distance={4} />
    </group>
  );
};

export const AuroraViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black via-indigo-950 to-purple-950">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <Aurora intensity={intensity} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
