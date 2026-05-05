import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ----------------------------------------------------------------------------
 *  Geometry profiles (memoised)
 * -------------------------------------------------------------------------- */

function useCupProfile() {
  // Lathe profile (revolved around Y). Outward direction = +Y in geometry frame.
  // We'll rotate the mesh so Y points along the user's listening axis (X for cups).
  return useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0.0,  0.205));
    pts.push(new THREE.Vector2(0.18, 0.215));
    pts.push(new THREE.Vector2(0.36, 0.21));
    pts.push(new THREE.Vector2(0.50, 0.18));
    pts.push(new THREE.Vector2(0.59, 0.12));
    pts.push(new THREE.Vector2(0.625, 0.05));
    pts.push(new THREE.Vector2(0.63, -0.04));
    pts.push(new THREE.Vector2(0.61, -0.10));
    pts.push(new THREE.Vector2(0.56, -0.135));
    pts.push(new THREE.Vector2(0.48, -0.155));
    pts.push(new THREE.Vector2(0.42, -0.16));
    pts.push(new THREE.Vector2(0.0,  -0.16));
    return pts;
  }, []);
}

function useCushionProfile() {
  // Cushion sits on the inner face of the cup, slightly proud, hollow centre.
  return useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0.46, -0.16));
    pts.push(new THREE.Vector2(0.50, -0.18));
    pts.push(new THREE.Vector2(0.535, -0.22));
    pts.push(new THREE.Vector2(0.535, -0.27));
    pts.push(new THREE.Vector2(0.515, -0.31));
    pts.push(new THREE.Vector2(0.475, -0.335));
    pts.push(new THREE.Vector2(0.425, -0.345));
    pts.push(new THREE.Vector2(0.39,  -0.34));
    pts.push(new THREE.Vector2(0.36,  -0.30));
    pts.push(new THREE.Vector2(0.355, -0.22));
    pts.push(new THREE.Vector2(0.39,  -0.17));
    pts.push(new THREE.Vector2(0.46,  -0.16));
    return pts;
  }, []);
}

/* ----------------------------------------------------------------------------
 *  Cup — single ear cup oriented so +Y points outward in local space
 * -------------------------------------------------------------------------- */

function Cup({ side, color, accent, metalness, roughness, onPartHover, onPartClick }) {
  const cupProfile = useCupProfile();
  const cushionProfile = useCushionProfile();
  const [hover, setHover] = useState(null);

  const setPart = (name) => (e) => {
    e.stopPropagation();
    setHover(name);
    onPartHover?.(name);
  };

  return (
    <group>
      {/* Outer shell (lathe revolve) */}
      <mesh
        rotation={[0, 0, Math.PI / 2 * side]}
        castShadow
        receiveShadow
        onPointerOver={setPart('cup')}
        onPointerOut={() => onPartHover?.(null)}
        onClick={(e) => { e.stopPropagation(); onPartClick?.('cup'); }}
      >
        <latheGeometry args={[cupProfile, 96]} />
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.55}
          clearcoatRoughness={0.18}
          envMapIntensity={1.15}
        />
      </mesh>

      {/* Cushion (separate lathe — vegetable-tanned leather feel) */}
      <mesh
        rotation={[0, 0, Math.PI / 2 * side]}
        castShadow
        onPointerOver={setPart('cushion')}
        onPointerOut={() => onPartHover?.(null)}
      >
        <latheGeometry args={[cushionProfile, 96]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.95}
          sheen={1}
          sheenRoughness={0.55}
          sheenColor="#2a2a2a"
        />
      </mesh>

      {/* Stitching seam — a subtle bright torus near the cushion crease */}
      <mesh position={[side * 0.16, 0, 0]} rotation={[0, 0, Math.PI / 2 * side]}>
        <torusGeometry args={[0.535, 0.003, 8, 96]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Bevel ring on outer rim */}
      <mesh position={[side * 0.215, 0, 0]} rotation={[0, 0, Math.PI / 2 * side]}>
        <torusGeometry args={[0.625, 0.012, 16, 96]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Concentric machined disc on outer face */}
      <mesh position={[side * 0.218, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <ringGeometry args={[0.34, 0.42, 96]} />
        <meshStandardMaterial color="#101013" metalness={0.65} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Accent emissive ring */}
      <mesh position={[side * 0.22, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <ringGeometry args={[0.32, 0.335, 96]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={hover === 'cup' ? 1.2 : 0.55}
          metalness={0.6}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Brand glyph — fine ring at centre */}
      <mesh position={[side * 0.222, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <circleGeometry args={[0.085, 64]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[side * 0.224, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <ringGeometry args={[0.04, 0.06, 64]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Driver disc visible through cushion hole */}
      <mesh position={[side * -0.14, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <circleGeometry args={[0.345, 64]} />
        <meshStandardMaterial color="#040405" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      {/* Driver mesh pattern (concentric rings) */}
      <mesh position={[side * -0.139, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <ringGeometry args={[0.08, 0.09, 64]} />
        <meshStandardMaterial color="#171719" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[side * -0.139, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <ringGeometry args={[0.18, 0.19, 64]} />
        <meshStandardMaterial color="#141416" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[side * -0.139, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <ringGeometry args={[0.27, 0.28, 64]} />
        <meshStandardMaterial color="#121214" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Mic holes — three tiny spheres along the bottom edge */}
      {side === 1 && (
        <group>
          {[-0.08, 0, 0.08].map((z, i) => (
            <mesh key={i} position={[0.45, -0.55, z]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial color="#000" roughness={1} />
            </mesh>
          ))}
        </group>
      )}

      {/* Control buttons (only on the right cup) */}
      {side === 1 && (
        <group>
          <mesh position={[0.55, -0.32, 0.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 0.08, 24]} />
            <meshStandardMaterial color="#1a1a1d" metalness={0.7} roughness={0.35} />
          </mesh>
          <mesh position={[0.55, -0.32, -0.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 0.08, 24]} />
            <meshStandardMaterial color="#1a1a1d" metalness={0.7} roughness={0.35} />
          </mesh>
          {/* USB-C indicator — tiny rectangle */}
          <mesh position={[0.55, -0.55, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.1]} />
            <meshStandardMaterial color="#050507" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* Pivot bracket — C-shape that wraps the cup's top-outer quadrant */}
      <mesh position={[side * 0.15, 0.55, 0]} rotation={[Math.PI / 2, 0, side * Math.PI / 2]}>
        <torusGeometry args={[0.18, 0.025, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#a8a8aa" metalness={0.95} roughness={0.22} />
      </mesh>

      {/* Pivot pin */}
      <mesh position={[side * 0.18, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.14, 24]} />
        <meshStandardMaterial color="#c8c8ca" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[side * -0.18, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.14, 24]} />
        <meshStandardMaterial color="#c8c8ca" metalness={0.95} roughness={0.18} />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------------------
 *  Headphones (root)
 * -------------------------------------------------------------------------- */

export default function Headphones({
  color = '#0f0f12',
  accent = '#c8ff3e',
  metalness = 0.5,
  roughness = 0.32,
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

  useFrame((_, delta) => {
    t.current += delta;
    if (!root.current) return;

    const targetSpin = paused ? 0 : spinSpeed;
    root.current.rotation.y += delta * targetSpin;

    // Idle float + breathe
    root.current.position.y = Math.sin(t.current * 1.2) * floatAmplitude;
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      Math.sin(t.current * 0.6) * 0.05,
      0.05
    );

    // Exploded ear cups slide outward
    if (leftCupGroup.current && rightCupGroup.current) {
      const target = exploded ? 0.8 : 0;
      leftCupGroup.current.position.x = THREE.MathUtils.lerp(
        leftCupGroup.current.position.x, -1.32 - target, 0.1);
      rightCupGroup.current.position.x = THREE.MathUtils.lerp(
        rightCupGroup.current.position.x, 1.32 + target, 0.1);
    }
  });

  return (
    <group ref={root}>
      {/* Headband — outer arch */}
      <mesh
        position={[0, 0.55, 0]}
        castShadow
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation(); onPartHover?.('headband'); }}
        onPointerOut={() => onPartHover?.(null)}
        onClick={(e) => { e.stopPropagation(); onPartClick?.('headband'); }}
      >
        <torusGeometry args={[1.32, 0.085, 32, 96, Math.PI]} />
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.5}
          clearcoatRoughness={0.28}
        />
      </mesh>

      {/* Headband — inner padded leather */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <torusGeometry args={[1.29, 0.062, 16, 80, Math.PI]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.95}
          sheen={1}
          sheenColor="#2a2a2a"
          sheenRoughness={0.55}
        />
      </mesh>

      {/* Sliding extender notches — left side */}
      {[0.20, 0.32, 0.44].map((y, i) => (
        <mesh key={`ln-${i}`} position={[-1.32, 0.05 + y * 0.6, 0]}>
          <boxGeometry args={[0.085, 0.012, 0.085]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {/* Sliding extender notches — right side */}
      {[0.20, 0.32, 0.44].map((y, i) => (
        <mesh key={`rn-${i}`} position={[1.32, 0.05 + y * 0.6, 0]}>
          <boxGeometry args={[0.085, 0.012, 0.085]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* Yoke arms (slim metal bars connecting band to cups) */}
      <mesh position={[-1.32, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.55, 24]} />
        <meshStandardMaterial color="#b6b6b9" metalness={0.96} roughness={0.2} />
      </mesh>
      <mesh position={[1.32, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.55, 24]} />
        <meshStandardMaterial color="#b6b6b9" metalness={0.96} roughness={0.2} />
      </mesh>

      {/* Yoke caps where they enter the band */}
      <mesh position={[-1.32, 0.55, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[1.32, 0.55, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Brand bar inset on top of the band */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[0.16, 0.025, 0.06]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>

      {/* Left cup */}
      <group ref={leftCupGroup} position={[-1.32, -0.05, 0]}>
        <Cup
          side={-1}
          color={color}
          accent={accent}
          metalness={metalness}
          roughness={roughness}
          onPartHover={onPartHover}
          onPartClick={onPartClick}
        />
      </group>

      {/* Right cup */}
      <group ref={rightCupGroup} position={[1.32, -0.05, 0]}>
        <Cup
          side={1}
          color={color}
          accent={accent}
          metalness={metalness}
          roughness={roughness}
          onPartHover={onPartHover}
          onPartClick={onPartClick}
        />
      </group>
    </group>
  );
}
