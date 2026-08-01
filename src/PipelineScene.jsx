import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Node layout: a small graph representing an automation pipeline
// (Trigger -> GHL -> Vapi -> Make -> n8n -> Output), positioned in 3D.
const NODES = [
  { id: 'trigger', pos: [-4.2, 0.6, 0], label: 'Trigger' },
  { id: 'ghl', pos: [-2.1, -1.1, 0.8], label: 'GHL' },
  { id: 'vapi', pos: [0, 1.4, -0.6], label: 'Vapi' },
  { id: 'make', pos: [2.1, -0.8, 0.6], label: 'Make' },
  { id: 'n8n', pos: [4.2, 0.9, -0.4], label: 'n8n' },
];

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 3], [2, 4],
];

function Node({ position, active }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const s = 1 + Math.sin(t * 1.4 + position[0]) * 0.08;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.16, 1]} />
      <meshStandardMaterial
        color={active ? '#e8944a' : '#2fd9c4'}
        emissive={active ? '#e8944a' : '#2fd9c4'}
        emissiveIntensity={0.9}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}

function Edge({ start, end }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#2a3038" transparent opacity={0.6} />
    </line>
  );
}

function Pulse({ start, end, speed, offset }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() * speed + offset) % 1);
    if (ref.current) {
      ref.current.position.lerpVectors(new THREE.Vector3(...start), new THREE.Vector3(...end), t);
      ref.current.material.opacity = Math.sin(t * Math.PI);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color="#2fd9c4" transparent />
    </mesh>
  );
}

function Graph() {
  const group = useRef();
  useFrame(({ clock, mouse }) => {
    if (group.current) {
      const t = clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t * 0.08) * 0.25 + mouse.x * 0.15;
      group.current.rotation.x = mouse.y * 0.08;
    }
  });

  return (
    <group ref={group}>
      {EDGES.map(([a, b], i) => (
        <Edge key={i} start={NODES[a].pos} end={NODES[b].pos} />
      ))}
      {EDGES.map(([a, b], i) => (
        <Pulse
          key={`pulse-${i}`}
          start={NODES[a].pos}
          end={NODES[b].pos}
          speed={0.18 + (i % 3) * 0.05}
          offset={i * 0.17}
        />
      ))}
      {NODES.map((n, i) => (
        <Node key={n.id} position={n.pos} active={i === 2} />
      ))}
    </group>
  );
}

export default function PipelineScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#2fd9c4" />
      <pointLight position={[-5, -3, -3]} intensity={20} color="#e8944a" />
      <Graph />
    </Canvas>
  );
}
