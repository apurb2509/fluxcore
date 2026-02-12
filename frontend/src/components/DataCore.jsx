import React, { useRef } from 'react'; // Add React here
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function DataCore() {
  const sphere = useRef();

  useFrame((state) => {
    if (sphere.current) {
      sphere.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphere.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={sphere} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#0066ff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
}