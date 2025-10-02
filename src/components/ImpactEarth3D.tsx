import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

// Earth with dynamic aurora belts
function Earth({ 
  auroraIntensity = 0.5,
  disruptionLevel = 0.3 
}: { 
  auroraIntensity?: number;
  disruptionLevel?: number;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const northAuroraRef = useRef<THREE.Mesh>(null);
  const southAuroraRef = useRef<THREE.Mesh>(null);
  const disruptionRingRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    
    // Animate auroras
    if (northAuroraRef.current && auroraIntensity > 0) {
      northAuroraRef.current.rotation.y += 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      northAuroraRef.current.scale.set(scale, 1, scale);
    }
    
    if (southAuroraRef.current && auroraIntensity > 0) {
      southAuroraRef.current.rotation.y -= 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + Math.PI) * 0.1;
      southAuroraRef.current.scale.set(scale, 1, scale);
    }
    
    // Pulse disruption ring
    if (disruptionRingRef.current && disruptionLevel > 0) {
      disruptionRingRef.current.rotation.z += 0.005;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      disruptionRingRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Earth */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#2266dd"
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* North Aurora */}
      {auroraIntensity > 0 && (
        <Sphere 
          ref={northAuroraRef} 
          args={[2.15, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.3]}
          position={[0, 1.5, 0]}
        >
          <meshBasicMaterial
            color="#00ffaa"
            transparent
            opacity={auroraIntensity * 0.6}
            side={THREE.DoubleSide}
          />
        </Sphere>
      )}
      
      {/* South Aurora */}
      {auroraIntensity > 0 && (
        <Sphere 
          ref={southAuroraRef} 
          args={[2.15, 32, 32, 0, Math.PI * 2, Math.PI * 0.7, Math.PI]}
          position={[0, -1.5, 0]}
        >
          <meshBasicMaterial
            color="#ff00ff"
            transparent
            opacity={auroraIntensity * 0.5}
            side={THREE.DoubleSide}
          />
        </Sphere>
      )}
      
      {/* Disruption indicators */}
      {disruptionLevel > 0 && (
        <>
          {/* Magnetic field disruption ring */}
          <mesh ref={disruptionRingRef}>
            <torusGeometry args={[3, 0.05, 16, 100]} />
            <meshBasicMaterial 
              color="#ff3300" 
              transparent 
              opacity={disruptionLevel * 0.7}
            />
          </mesh>
          
          {/* Satellite orbit disruption particles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 3;
            const z = Math.sin(angle) * 3;
            return (
              <Sphere key={i} args={[0.08, 16, 16]} position={[x, 0, z]}>
                <meshBasicMaterial 
                  color="#ffaa00" 
                  transparent 
                  opacity={disruptionLevel}
                />
              </Sphere>
            );
          })}
        </>
      )}
      
      {/* Point lights for glow effects */}
      <pointLight position={[0, 2, 0]} intensity={auroraIntensity * 2} color="#00ffaa" distance={5} />
      <pointLight position={[0, -2, 0]} intensity={auroraIntensity * 1.5} color="#ff00ff" distance={5} />
    </group>
  );
}

// Orbiting satellites
function Satellites({ disrupted = false }: { disrupted?: boolean }) {
  const satelliteRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    satelliteRefs.current.forEach((sat, i) => {
      if (sat) {
        const speed = disrupted ? 0.015 + Math.sin(state.clock.elapsedTime * 3) * 0.005 : 0.015;
        const offset = (i / 3) * Math.PI * 2;
        const angle = state.clock.elapsedTime * speed + offset;
        sat.position.x = Math.cos(angle) * 4;
        sat.position.z = Math.sin(angle) * 4;
        sat.position.y = Math.sin(angle * 2) * 0.5;
        sat.rotation.y = angle;
      }
    });
  });

  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i}>
          <Sphere 
            ref={(el) => {
              if (el) satelliteRefs.current[i] = el;
            }}
            args={[0.1, 16, 16]}
          >
            <meshStandardMaterial 
              color={disrupted ? "#ff6600" : "#00aaff"}
              emissive={disrupted ? "#ff3300" : "#0066ff"}
              emissiveIntensity={disrupted ? 0.8 : 0.3}
            />
          </Sphere>
        </group>
      ))}
    </>
  );
}

export const ImpactEarth3D = ({
  auroraIntensity = 0.5,
  disruptionLevel = 0.3,
  showSatellites = true
}: {
  auroraIntensity?: number;
  disruptionLevel?: number;
  showSatellites?: boolean;
}) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <color attach="background" args={["#000510"]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Stars radius={300} depth={50} count={5000} factor={4} />
        
        <Earth auroraIntensity={auroraIntensity} disruptionLevel={disruptionLevel} />
        {showSatellites && <Satellites disrupted={disruptionLevel > 0.5} />}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
