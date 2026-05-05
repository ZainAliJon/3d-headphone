import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ----------------------------------------------------------------------------
 *  Stylised "3D icon" cup — stacked tiers (largest at outer back → smallest
 *  at the front where the cushion mounts), with metallic bevel rings between
 *  tiers. Local frame: +Z is INWARD (toward head). -Z is OUTWARD.
 * -------------------------------------------------------------------------- */

function StackedCup({ color, accent, metalness, roughness, hasButton, onPartHover, onPartClick }) {
  const [hover, setHover] = useState(null);

  const setPart = (name) => (e) => {
    e.stopPropagation();
    setHover(name);
    onPartHover?.(name);
  };

  const cupMaterial = (
    <meshPhysicalMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
      clearcoat={0.7}
      clearcoatRoughness={0.18}
      envMapIntensity={1.1}
    />
  );

  return (
    <group
      onPointerOver={setPart('cup')}
      onPointerOut={() => onPartHover?.(null)}
      onClick={(e) => { e.stopPropagation(); onPartClick?.('cup'); }}
    >
      {/* Tier 1 — outer back puck (largest) */}
      <mesh position={[0, 0, -0.20]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.60, 0.18, 96]} />
        {cupMaterial}
      </mesh>
      {/* Outer back face cap (flat circle) */}
      <mesh position={[0, 0, -0.291]}>
        <circleGeometry args={[0.60, 96]} />
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bevel ring between tier 1 and tier 2 */}
      <mesh position={[0, 0, -0.10]}>
        <torusGeometry args={[0.59, 0.022, 16, 96]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.32} />
      </mesh>

      {/* Tier 2 — mid section */}
      <mesh position={[0, 0, -0.015]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.57, 0.54, 0.14, 96]} />
        {cupMaterial}
      </mesh>

      {/* Bevel ring between tier 2 and tier 3 */}
      <mesh position={[0, 0, 0.065]}>
        <torusGeometry args={[0.53, 0.020, 16, 96]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.32} />
      </mesh>

      {/* Tier 3 — front rim where cushion mounts */}
      <mesh position={[0, 0, 0.115]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.51, 0.47, 0.10, 96]} />
        {cupMaterial}
      </mesh>

      {/* Bevel ring on the front of tier 3 */}
      <mesh position={[0, 0, 0.165]}>
        <torusGeometry args={[0.46, 0.016, 16, 96]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.35} />
      </mesh>

      {/* Cushion — fat donut, soft black */}
      <mesh
        position={[0, 0, 0.245]}
        castShadow
        onPointerOver={setPart('cushion')}
        onPointerOut={() => onPartHover?.(null)}
      >
        <torusGeometry args={[0.36, 0.13, 32, 80]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.92}
          sheen={1}
          sheenColor="#252525"
          sheenRoughness={0.55}
          clearcoat={0.15}
        />
      </mesh>

      {/* Cushion inner wall (depth in the hole) */}
      <mesh position={[0, 0, 0.20]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.10, 64, 1, true]} />
        <meshStandardMaterial color="#050507" roughness={1} side={THREE.DoubleSide} />
      </mesh>

      {/* Driver disc visible through cushion hole */}
      <mesh position={[0, 0, 0.16]}>
        <circleGeometry args={[0.23, 64]} />
        <meshStandardMaterial color="#040405" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      {/* Driver concentric rings */}
      <mesh position={[0, 0, 0.161]}>
        <ringGeometry args={[0.085, 0.092, 64]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.161]}>
        <ringGeometry args={[0.165, 0.175, 64]} />
        <meshStandardMaterial color="#161618" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Right-cup outer-face button (chrome control disc) */}
      {hasButton && (
        <group>
          {/* Concentric groove on outer back face */}
          <mesh position={[0, 0, -0.292]}>
            <ringGeometry args={[0.42, 0.435, 96]} />
            <meshStandardMaterial color={accent} metalness={0.85} roughness={0.35} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, -0.292]}>
            <ringGeometry args={[0.28, 0.288, 96]} />
            <meshStandardMaterial color="#1a1a1d" metalness={0.6} roughness={0.5} side={THREE.DoubleSide} />
          </mesh>

          {/* Recessed plate behind button */}
          <mesh position={[0, 0, -0.293]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.005, 64]} />
            <meshPhysicalMaterial color="#1a1a1d" metalness={0.5} roughness={0.55} />
          </mesh>

          {/* Central chrome button */}
          <mesh position={[0, 0, -0.31]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.10, 0.105, 0.05, 48]} />
            <meshPhysicalMaterial
              color="#dadcdf"
              metalness={0.55}
              roughness={0.32}
              clearcoat={0.6}
              clearcoatRoughness={0.15}
            />
          </mesh>
          {/* Button face highlight */}
          <mesh position={[0, 0, -0.336]}>
            <circleGeometry args={[0.10, 48]} />
            <meshPhysicalMaterial
              color="#e6e8eb"
              metalness={0.45}
              roughness={0.32}
              clearcoat={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ----------------------------------------------------------------------------
 *  Headphones (root) — chunky stylised look
 * -------------------------------------------------------------------------- */

export default function Headphones({
  color = '#1a1a1d',
  accent = '#7a7a80',
  metalness = 0.35,
  roughness = 0.45,
  spinSpeed = 0.25,
  exploded = false,
  paused = false,
  floatAmplitude = 0.04,
  onPartHover,
  onPartClick,
}) {
  const root = useRef();
  const leftCupGroup = useRef();
  const rightCupGroup = useRef();
  const t = useRef(0);

  // Position constants for cup placement
  const CUP_X = 1.42; // distance from centre to each cup
  const CUP_Y = -0.62; // cup centre lowered so yoke sits cleanly above

  useFrame((_, delta) => {
    t.current += delta;
    if (!root.current) return;

    const targetSpin = paused ? 0 : spinSpeed;
    root.current.rotation.y += delta * targetSpin;

    root.current.position.y = Math.sin(t.current * 1.2) * floatAmplitude;
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      Math.sin(t.current * 0.6) * 0.05,
      0.05
    );

    if (leftCupGroup.current && rightCupGroup.current) {
      const offset = exploded ? 0.7 : 0;
      leftCupGroup.current.position.x = THREE.MathUtils.lerp(
        leftCupGroup.current.position.x, -CUP_X - offset, 0.1);
      rightCupGroup.current.position.x = THREE.MathUtils.lerp(
        rightCupGroup.current.position.x, CUP_X + offset, 0.1);
    }
  });

  return (
    <group ref={root}>
      {/* HEADBAND — thick outer arch (slightly squashed depth for slab look) */}
      <mesh
        position={[0, 0.50, 0]}
        castShadow
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation(); onPartHover?.('headband'); }}
        onPointerOut={() => onPartHover?.(null)}
        onClick={(e) => { e.stopPropagation(); onPartClick?.('headband'); }}
        scale={[1, 1, 0.72]}
      >
        <torusGeometry args={[1.45, 0.18, 32, 128, Math.PI]} />
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness * 0.65}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* HEADBAND — inner padded strip (thinner, sits under the outer band) */}
      <mesh position={[0, 0.46, 0]} scale={[1, 1, 0.85]}>
        <torusGeometry args={[1.4, 0.085, 20, 96, Math.PI]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.95}
          sheen={1}
          sheenColor="#202020"
          sheenRoughness={0.5}
        />
      </mesh>

      {/* YOKE SLIDERS — silver flat slabs */}
      <RoundedBox
        position={[-CUP_X, 0.10, 0]}
        args={[0.20, 0.62, 0.14]}
        radius={0.05}
        smoothness={5}
        castShadow
      >
        <meshPhysicalMaterial
          color="#bcbcbe"
          metalness={0.55}
          roughness={0.42}
          clearcoat={0.55}
          clearcoatRoughness={0.22}
        />
      </RoundedBox>
      <RoundedBox
        position={[CUP_X, 0.10, 0]}
        args={[0.20, 0.62, 0.14]}
        radius={0.05}
        smoothness={5}
        castShadow
      >
        <meshPhysicalMaterial
          color="#bcbcbe"
          metalness={0.55}
          roughness={0.42}
          clearcoat={0.55}
          clearcoatRoughness={0.22}
        />
      </RoundedBox>

      {/* YOKE inner slot — thin notch line on each slider */}
      <mesh position={[-CUP_X, 0.12, 0.071]}>
        <boxGeometry args={[0.10, 0.5, 0.004]} />
        <meshStandardMaterial color="#8e8e90" roughness={0.55} metalness={0.4} />
      </mesh>
      <mesh position={[CUP_X, 0.12, 0.071]}>
        <boxGeometry args={[0.10, 0.5, 0.004]} />
        <meshStandardMaterial color="#8e8e90" roughness={0.55} metalness={0.4} />
      </mesh>

      {/* YOKE-to-CUP pivot brackets — small chunky blocks at yoke bottom */}
      <RoundedBox
        position={[-CUP_X, -0.24, 0]}
        args={[0.24, 0.13, 0.20]}
        radius={0.035}
        smoothness={4}
        castShadow
      >
        <meshPhysicalMaterial
          color="#9b9b9d"
          metalness={0.55}
          roughness={0.4}
          clearcoat={0.45}
        />
      </RoundedBox>
      <RoundedBox
        position={[CUP_X, -0.24, 0]}
        args={[0.24, 0.13, 0.20]}
        radius={0.035}
        smoothness={4}
        castShadow
      >
        <meshPhysicalMaterial
          color="#9b9b9d"
          metalness={0.55}
          roughness={0.4}
          clearcoat={0.45}
        />
      </RoundedBox>

      {/* LEFT CUP — outer side at -X (so cup-local +Z faces +X, toward head) */}
      <group ref={leftCupGroup} position={[-CUP_X, CUP_Y, 0]} rotation={[0, Math.PI / 2, 0]}>
        <StackedCup
          color={color}
          accent={accent}
          metalness={metalness}
          roughness={roughness}
          hasButton={false}
          onPartHover={onPartHover}
          onPartClick={onPartClick}
        />
      </group>

      {/* RIGHT CUP — outer side at +X */}
      <group ref={rightCupGroup} position={[CUP_X, CUP_Y, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <StackedCup
          color={color}
          accent={accent}
          metalness={metalness}
          roughness={roughness}
          hasButton={true}
          onPartHover={onPartHover}
          onPartClick={onPartClick}
        />
      </group>
    </group>
  );
}
