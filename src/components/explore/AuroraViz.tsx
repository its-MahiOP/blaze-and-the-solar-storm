import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const Aurora = ({ intensity }: { intensity: number }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const northAuroraRef = useRef<THREE.Mesh>(null);
  const southAuroraRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }
    
    if (northAuroraRef.current) {
      northAuroraRef.current.rotation.y += 0.01;
      const wave = Math.sin(time * 2) * 0.1;
      northAuroraRef.current.scale.set(1 + wave, 1, 1 + wave);
    }

    if (southAuroraRef.current) {
      southAuroraRef.current.rotation.y -= 0.01;
      const wave = Math.cos(time * 2) * 0.1;
      southAuroraRef.current.scale.set(1 + wave, 1, 1 + wave);
    }
  });

  const auroraIntensity = intensity / 100;
  const auroraScale = 0.3 + (intensity / 100) * 0.3;

  return (
    <group>
      {/* Earth */}
      <Sphere ref={earthRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* North aurora */}
      <mesh ref={northAuroraRef} position={[0, 1.3, 0]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.5, 1.2, 32]} />
        <meshStandardMaterial
          color="#50E3C2"
          emissive="#50E3C2"
          emissiveIntensity={auroraIntensity * 2}
          transparent
          opacity={0.5 + auroraIntensity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* South aurora */}
      <mesh ref={southAuroraRef} position={[0, -1.3, 0]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.5, 1.2, 32]} />
        <meshStandardMaterial
          color="#9B59B6"
          emissive="#9B59B6"
          emissiveIntensity={auroraIntensity * 2}
          transparent
          opacity={0.5 + auroraIntensity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Aurora glow particles - north */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[auroraScale, 16, 16]} />
        <meshStandardMaterial
          color="#50E3C2"
          emissive="#50E3C2"
          emissiveIntensity={auroraIntensity}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Aurora glow particles - south */}
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[auroraScale, 16, 16]} />
        <meshStandardMaterial
          color="#9B59B6"
          emissive="#9B59B6"
          emissiveIntensity={auroraIntensity}
          transparent
          opacity={0.3}
        />
      </mesh>

      <pointLight position={[0, 1.5, 0]} intensity={auroraIntensity * 2} color="#50E3C2" />
      <pointLight position={[0, -1.5, 0]} intensity={auroraIntensity * 2} color="#9B59B6" />
    </group>
  );
};

export const AuroraViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-teal-950">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <Aurora intensity={intensity} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
