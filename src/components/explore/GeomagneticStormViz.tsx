import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const GeomagneticStorm = ({ intensity }: { intensity: number }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const fieldRef = useRef<THREE.Mesh>(null);
  const distortionRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
    
    if (fieldRef.current) {
      fieldRef.current.rotation.y -= 0.003;
      // Distortion effect
      const distortion = Math.sin(time * 2) * (intensity / 100) * 0.2;
      fieldRef.current.scale.set(1 + distortion, 1 + distortion, 1);
    }

    if (distortionRef.current) {
      distortionRef.current.rotation.z = Math.sin(time) * (intensity / 100) * 0.3;
    }
  });

  const stormIntensity = intensity / 100;

  return (
    <group ref={distortionRef}>
      {/* Earth */}
      <Sphere ref={earthRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Magnetic field */}
      <mesh ref={fieldRef}>
        <torusGeometry args={[1.8, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#9B59B6"
          emissive="#9B59B6"
          emissiveIntensity={stormIntensity}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Storm energy rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={stormIntensity * 2}
          transparent
          opacity={0.6}
        />
      </mesh>

      <pointLight 
        position={[0, 0, 0]} 
        intensity={stormIntensity * 3} 
        color="#9B59B6" 
        distance={8}
      />
    </group>
  );
};

export const GeomagneticStormViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-purple-950">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <GeomagneticStorm intensity={intensity} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
