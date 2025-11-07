import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Plane } from "@react-three/drei";
import * as THREE from "three";

interface SolarPanel3DProps {
  azimuth: number; // 0-360 degrees (compass direction)
  tilt: number; // 0-90 degrees (angle from horizontal)
}

function SolarPanelModel({ azimuth, tilt }: SolarPanel3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Convert degrees to radians
  const azimuthRad = (azimuth * Math.PI) / 180;
  const tiltRad = (tilt * Math.PI) / 180;

  return (
    <group ref={groupRef} rotation={[0, azimuthRad, 0]}>
      {/* Base/Stand */}
      <Box args={[0.3, 0.1, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#404040" />
      </Box>
      
      {/* Support pole */}
      <Box args={[0.1, 1, 0.1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#606060" />
      </Box>
      
      {/* Tilting mechanism */}
      <group position={[0, 1, 0]} rotation={[-tiltRad, 0, 0]}>
        {/* Solar panel frame */}
        <Box args={[2.5, 0.05, 1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        
        {/* Solar panel cells - blue/dark blue photovoltaic cells */}
        <Plane args={[2.3, 1.3]} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#1e3a8a" 
            metalness={0.3}
            roughness={0.4}
          />
        </Plane>
        
        {/* Grid lines on panel */}
        <gridHelper args={[2.3, 8, "#60a5fa", "#60a5fa"]} rotation={[0, 0, 0]} position={[0, 0.04, 0]} />
        
        {/* Direction indicator (red arrow pointing forward) */}
        <Box args={[0.1, 0.1, 0.5]} position={[0, 0.1, -0.5]}>
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
        </Box>
      </group>
      
      {/* Ground reference */}
      <Plane args={[8, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <meshStandardMaterial color="#8b7355" />
      </Plane>
    </group>
  );
}

export const SolarPanel3D = ({ azimuth, tilt }: SolarPanel3DProps) => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg overflow-hidden border border-border">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 50 }}
        shadows
      >
        {/* Lighting to simulate sun */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* The solar panel model */}
        <SolarPanelModel azimuth={azimuth} tilt={tilt} />
        
        {/* Camera controls */}
        <OrbitControls 
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
