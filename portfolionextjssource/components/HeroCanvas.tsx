'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Slow-drifting wireframe mesh in accent tones. Deliberately minimal: one
// geometry, basic material, capped DPR — a quiet accent, not a centerpiece.
function DriftingMesh() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.x = t * 0.05 + pointer.y * 0.05;
      outer.current.rotation.y = t * 0.07 + pointer.x * 0.05;
    }
    if (inner.current) {
      inner.current.rotation.x = -t * 0.04;
      inner.current.rotation.z = t * 0.06;
    }
  });

  return (
    <group position={[1.6, 0, 0]}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#c8b89a" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#ddd0b8" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <DriftingMesh />
    </Canvas>
  );
}
