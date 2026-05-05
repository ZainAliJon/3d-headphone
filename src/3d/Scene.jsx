import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Headphones from './Headphones';

export default function Scene({
  color,
  accent,
  metalness,
  roughness,
  spinSpeed = 0.35,
  interactive = false,
  cameraPosition = [0, 0.4, 5.2],
  fov = 35,
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: cameraPosition, fov }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#7faaff" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color={accent} />

      <Suspense fallback={null}>
        <Headphones
          color={color}
          accent={accent}
          metalness={metalness}
          roughness={roughness}
          spinSpeed={spinSpeed}
        />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.55}
          scale={8}
          blur={2.6}
          far={3}
          resolution={512}
          color="#000"
        />
      </Suspense>

      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      )}
    </Canvas>
  );
}
