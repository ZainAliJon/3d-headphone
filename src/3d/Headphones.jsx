import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

function Cup({ color, accent, metalness, roughness }) {
  // Cup faces +Z (outward). -Z is the inside (cushion + driver).
  return (
    <group>
      {/* Outer shell — slightly conical for a more sculpted profile */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.5, 0.32, 64]} />
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Bevel ring on outer rim */}
      <mesh position={[0, 0, 0.16]}>
        <torusGeometry args={[0.55, 0.02, 24, 96]} />
        <meshStandardMaterial color="#171717" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Accent emissive ring */}
      <mesh position={[0, 0, 0.158]}>
        <torusGeometry args={[0.42, 0.008, 16, 96]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.55}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Cushion (donut on inner side) */}
      <mesh position={[0, 0, -0.18]} castShadow>
        <torusGeometry args={[0.46, 0.085, 24, 64]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.95}
          sheen={1}
          sheenRoughness={0.5}
          sheenColor="#222"
        />
      </mesh>

      {/* Driver disc inside */}
      <mesh position={[0, 0, -0.2]}>
        <circleGeometry args={[0.39, 64]} />
        <meshStandardMaterial color="#040404" roughness={1} metalness={0} />
      </mesh>

      {/* Driver concentric rings (subtle detail) */}
      <mesh position={[0, 0, -0.199]}>
        <ringGeometry args={[0.18, 0.2, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.199]}>
        <ringGeometry args={[0.28, 0.295, 64]} />
        <meshStandardMaterial color="#161616" roughness={0.9} />
      </mesh>

      {/* Brand mark on outer face */}
      <mesh position={[0, 0, 0.165]}>
        <circleGeometry args={[0.11, 64]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.7}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Pivot pin where the yoke meets the cup */}
      <mesh position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.12, 24]} />
        <meshStandardMaterial color="#999" metalness={0.95} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Headphones({
  color = '#101013',
  accent = '#c8ff3e',
  metalness = 0.45,
  roughness = 0.35,
  spinSpeed = 0.35,
  floatAmplitude = 0.05,
}) {
  const group = useRef();
  const tRef = useRef(0);

  useFrame((_, delta) => {
    tRef.current += delta;
    if (group.current) {
      group.current.rotation.y += delta * spinSpeed;
      group.current.position.y = Math.sin(tRef.current * 1.2) * floatAmplitude;
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        Math.sin(tRef.current * 0.6) * 0.06,
        0.05
      );
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Headband — half torus arching over the top */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.3, 0.1, 32, 96, Math.PI]} />
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* Inner headband cushion */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[1.27, 0.065, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Brand wordmark on headband */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[0.18, 0.04, 0.08]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Left yoke (rod from band down to cup) */}
      <mesh position={[-1.3, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.55, 24]} />
        <meshStandardMaterial color="#a8a8a8" metalness={0.95} roughness={0.22} />
      </mesh>

      {/* Right yoke */}
      <mesh position={[1.3, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.55, 24]} />
        <meshStandardMaterial color="#a8a8a8" metalness={0.95} roughness={0.22} />
      </mesh>

      {/* Yoke caps where they enter the band */}
      <mesh position={[-1.3, 0.55, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[1.3, 0.55, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Left ear cup */}
      <group position={[-1.3, -0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <Cup color={color} accent={accent} metalness={metalness} roughness={roughness} />
      </group>

      {/* Right ear cup */}
      <group position={[1.3, -0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Cup color={color} accent={accent} metalness={metalness} roughness={roughness} />
      </group>
    </group>
  );
}
