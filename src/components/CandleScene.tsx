import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Candle({ position, height = 1.6, radius = 0.32, delay = 0 }: { position: [number, number, number]; height?: number; radius?: number; delay?: number }) {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const flicker = 0.85 + Math.sin(t * 9) * 0.08 + Math.sin(t * 17) * 0.05 + Math.random() * 0.06;
    if (flameRef.current) {
      flameRef.current.scale.set(1 + Math.sin(t * 11) * 0.06, flicker, 1 + Math.cos(t * 13) * 0.06);
      flameRef.current.position.x = Math.sin(t * 4) * 0.01;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.2 * flicker;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 6) * 0.08);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(t * 8) * 0.05;
    }
  });

  const flameTop = position[1] + height / 2 + 0.18;

  return (
    <group position={position}>
      {/* wax body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius * 1.02, height, 64]} />
        <meshPhysicalMaterial
          color="#f3e9d2"
          roughness={0.45}
          clearcoat={0.4}
          clearcoatRoughness={0.6}
          sheen={1}
          sheenColor="#e8c98a"
          transmission={0.15}
          thickness={0.6}
          ior={1.3}
        />
      </mesh>
      {/* top rim wax pool */}
      <mesh position={[0, height / 2 + 0.005, 0]}>
        <cylinderGeometry args={[radius * 0.98, radius, 0.02, 64]} />
        <meshPhysicalMaterial color="#d9b97a" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* wick */}
      <mesh position={[0, height / 2 + 0.08, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
        <meshStandardMaterial color="#1a1208" />
      </mesh>
      {/* flame */}
      <mesh ref={flameRef} position={[0, flameTop, 0]}>
        <coneGeometry args={[0.07, 0.22, 24]} />
        <meshBasicMaterial color="#ffb74a" transparent opacity={0.95} />
      </mesh>
      {/* inner flame */}
      <mesh position={[0, flameTop - 0.02, 0]}>
        <coneGeometry args={[0.035, 0.14, 16]} />
        <meshBasicMaterial color="#fff3c4" transparent opacity={0.9} />
      </mesh>
      {/* glow halo */}
      <mesh ref={glowRef} position={[0, flameTop, 0]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#ffa657" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      {/* point light */}
      <pointLight ref={lightRef} position={[0, flameTop, 0]} color="#ffb060" intensity={2.2} distance={6} decay={2} />
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const { positions, count } = useMemo(() => {
    const c = 180;
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c; i++) {
      p[i * 3] = (Math.random() - 0.5) * 8;
      p[i * 3 + 1] = Math.random() * 4 - 1;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return { positions: p, count: c };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + 0.003 + Math.sin(t + i) * 0.0008;
      pos.setY(i, y > 3.5 ? -1.5 : y);
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.5 + i) * 0.001);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#ffd591" size={0.025} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#3a2a1a" />
      <directionalLight position={[3, 4, 5]} intensity={0.3} color="#ffe0b0" />
      <group ref={groupRef}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <Candle position={[-1.4, 0, 0.2]} height={1.2} radius={0.28} delay={0.5} />
        </Float>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <Candle position={[0, 0.2, 0]} height={1.9} radius={0.36} delay={0} />
        </Float>
        <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.2}>
          <Candle position={[1.5, -0.1, 0.3]} height={1.4} radius={0.3} delay={1.1} />
        </Float>
      </group>
      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2.5} far={3} color="#000000" />
      <Particles />
      <Environment preset="warehouse" />
      <fog attach="fog" args={["#0a0806", 4, 12]} />
    </>
  );
}

export default function CandleScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 5], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <Scene />
    </Canvas>
  );
}
