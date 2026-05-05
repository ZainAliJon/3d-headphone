import { Canvas } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  OrbitControls,
  PresentationControls,
} from '@react-three/drei';
import { Suspense, useState } from 'react';
import Headphones from './Headphones';

const PART_LABELS = {
  cup: 'Aluminium ear cup',
  cushion: 'Memory-foam cushion',
  headband: 'Aluminium headband',
};

export default function Scene({
  color,
  accent,
  metalness,
  roughness,
  spinSpeed = 0.3,
  cameraPosition = [0, 0.4, 5.4],
  fov = 32,
  controls = 'presentation', // 'presentation' | 'orbit' | 'none'
  exploded = false,
  showAnnotations = false,
}) {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="w-full h-full relative"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => { setHovering(false); setHoveredPart(null); }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      >
        <ambientLight intensity={0.32} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.15}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 3, -3]} intensity={0.55} color="#7faaff" />
        <pointLight position={[0, -2, 3]} intensity={0.35} color={accent} />

        <Suspense fallback={null}>
          {controls === 'presentation' ? (
            <PresentationControls
              global
              snap
              cursor
              polar={[-Math.PI / 6, Math.PI / 4]}
              azimuth={[-Math.PI, Math.PI]}
              config={{ mass: 1.2, tension: 220, friction: 26 }}
            >
              <Headphones
                color={color}
                accent={accent}
                metalness={metalness}
                roughness={roughness}
                spinSpeed={spinSpeed}
                paused={hovering}
                exploded={exploded}
                onPartHover={setHoveredPart}
              />
            </PresentationControls>
          ) : (
            <Headphones
              color={color}
              accent={accent}
              metalness={metalness}
              roughness={roughness}
              spinSpeed={spinSpeed}
              paused={hovering}
              exploded={exploded}
              onPartHover={setHoveredPart}
            />
          )}

          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.6}
            scale={9}
            blur={2.6}
            far={3}
            resolution={512}
            color="#000"
          />
        </Suspense>

        {controls === 'orbit' && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
          />
        )}
      </Canvas>

      {/* HTML overlay annotations */}
      {showAnnotations && hoveredPart && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-32">
          <div className="px-4 py-2 rounded-full bg-ink-900/80 backdrop-blur border border-white/10 text-xs uppercase tracking-[0.25em] text-white/90 whitespace-nowrap">
            <span className="text-accent mr-2">●</span>
            {PART_LABELS[hoveredPart] || hoveredPart}
          </div>
        </div>
      )}
    </div>
  );
}
