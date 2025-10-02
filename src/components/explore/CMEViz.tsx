import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const CMESimulation = ({ intensity }: { intensity: number }) => {
  const cmeRef = useRef<THREE.Mesh>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (cmeRef.current) {
      // CME expands and moves away from sun
      const expansion = 1 + Math.sin(time) * 0.5;
      cmeRef.current.scale.set(expansion, expansion, expansion);
      cmeRef.current.position.x = Math.sin(time * 0.5) * 2;
    }
    
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  const cmeSpeed = intensity / 100;
  const cmeSize = 0.5 + (intensity / 100) * 0.8;

  return (
    <group>
      {/* Sun */}
      <Sphere ref={sunRef} args={[1, 32, 32]} position={[-3, 0, 0]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* CME bubble */}
      <mesh ref={cmeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[cmeSize, 32, 32]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={cmeSpeed}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Earth (target) */}
      <Sphere args={[0.4, 32, 32]} position={[3, 0, 0]}>
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.2}
        />
      </Sphere>

      <pointLight position={[-3, 0, 0]} intensity={2} color="#FDB813" />
      <pointLight position={[0, 0, 0]} intensity={cmeSpeed * 2} color="#FF6B35" />
    </group>
  );
};

export const CMEViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-blue-950">
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <CMESimulation intensity={intensity} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
