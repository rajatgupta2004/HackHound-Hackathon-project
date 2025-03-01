import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Cylinder, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FemaleModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Sphere args={[0.15, 32, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#FDF0D5" />
      </Sphere>

      {/* Neck */}
      <Cylinder args={[0.05, 0.07, 0.15]} position={[0, 0.65, 0]}>
        <meshStandardMaterial color="#FDF0D5" />
      </Cylinder>

      {/* Torso */}
      <Cylinder args={[0.2, 0.25, 0.6]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#FDF0D5" />
      </Cylinder>

      {/* Hips */}
      <Cylinder args={[0.25, 0.2, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FDF0D5" />
      </Cylinder>

      {/* Left Arm */}
      <group position={[0.25, 0.4, 0]}>
        <Cylinder args={[0.05, 0.05, 0.4]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial color="#FDF0D5" />
        </Cylinder>
      </group>

      {/* Right Arm */}
      <group position={[-0.25, 0.4, 0]}>
        <Cylinder args={[0.05, 0.05, 0.4]} rotation={[0, 0, 0.3]}>
          <meshStandardMaterial color="#FDF0D5" />
        </Cylinder>
      </group>

      {/* Left Leg */}
      <group position={[0.1, -0.3, 0]}>
        <Cylinder args={[0.07, 0.05, 0.6]} rotation={[0.1, 0, 0]}>
          <meshStandardMaterial color="#FDF0D5" />
        </Cylinder>
      </group>

      {/* Right Leg */}
      <group position={[-0.1, -0.3, 0]}>
        <Cylinder args={[0.07, 0.05, 0.6]} rotation={[-0.1, 0, 0]}>
          <meshStandardMaterial color="#FDF0D5" />
        </Cylinder>
      </group>
    </group>
  );
}

export function BodyModel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas camera={{ position: [0, 0.5, 2], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.8} />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.4} />
        <FemaleModel />
        <OrbitControls 
          enablePan={false}
          minDistance={1.5}
          maxDistance={4}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
          target={[0, 0.3, 0]}
        />
      </Canvas>
    </div>
  );
}