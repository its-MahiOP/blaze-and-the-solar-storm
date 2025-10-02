import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const TechImpact = ({ intensity }: { intensity: number }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const satellite3Ref = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }

    const glitchAmount = (intensity / 100) * 0.2;
    
    // Satellites orbit and glitch
    if (satellite1Ref.current) {
      satellite1Ref.current.position.x = Math.cos(time) * 2;
      satellite1Ref.current.position.z = Math.sin(time) * 2;
      satellite1Ref.current.rotation.x += glitchAmount * Math.random();
    }
    
    if (satellite2Ref.current) {
      satellite2Ref.current.position.x = Math.cos(time + Math.PI * 0.66) * 2.2;
      satellite2Ref.current.position.z = Math.sin(time + Math.PI * 0.66) * 2.2;
      satellite2Ref.current.rotation.y += glitchAmount * Math.random();
    }
    
    if (satellite3Ref.current) {
      satellite3Ref.current.position.x = Math.cos(time + Math.PI * 1.33) * 1.8;
      satellite3Ref.current.position.z = Math.sin(time + Math.PI * 1.33) * 1.8;
      satellite3Ref.current.rotation.z += glitchAmount * Math.random();
    }

    // Power grid flickers
    if (gridRef.current) {
      gridRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material.emissiveIntensity !== undefined) {
          material.emissiveIntensity = Math.random() * glitchAmount;
        }
      });
    }
  });

  const impactLevel = intensity / 100;

  // Create grid points on Earth
  const gridPoints = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    gridPoints.push({
      x: Math.cos(angle) * 1.1,
      y: (Math.random() - 0.5) * 0.5,
      z: Math.sin(angle) * 1.1,
    });
  }

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

      {/* Power grid points */}
      <group ref={gridRef}>
        {gridPoints.map((point, i) => (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#FF6B35"
              emissive="#FF6B35"
              emissiveIntensity={impactLevel}
            />
          </mesh>
        ))}
      </group>

      {/* Satellites */}
      <mesh ref={satellite1Ref} position={[2, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial
          color="#888888"
          emissive="#FF0000"
          emissiveIntensity={impactLevel * 2}
        />
      </mesh>

      <mesh ref={satellite2Ref} position={[0, 0.5, 2]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial
          color="#888888"
          emissive="#FF0000"
          emissiveIntensity={impactLevel * 2}
        />
      </mesh>

      <mesh ref={satellite3Ref} position={[-2, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial
          color="#888888"
          emissive="#FF0000"
          emissiveIntensity={impactLevel * 2}
        />
      </mesh>

      {/* Disruption field */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={impactLevel * 0.5}
          transparent
          opacity={0.1 + impactLevel * 0.15}
          wireframe
        />
      </mesh>

      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1} />
    </group>
  );
};

export const TechImpactViz = ({ intensity }: { intensity: number }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-red-950">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <TechImpact intensity={intensity} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};
