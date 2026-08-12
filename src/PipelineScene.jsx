import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODES = [
  { id: 'python', angle: 0 },
  { id: 'api', angle: 60 },
  { id: 'llm', angle: 120 },
  { id: 'n8n', angle: 180 },
  { id: 'vapi', angle: 240 },
  { id: 'mcp', angle: 300 },
];

const RADIUS = 2.9;

function toPos(angleDeg, r = RADIUS) {
  const a = (angleDeg * Math.PI) / 180;
  return [Math.cos(a) * r, Math.sin(a) * r * 0.55, Math.sin(a * 1.3) * 0.6];
}

function Core() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.25;
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      const s = 1 + Math.sin(t * 1.2) * 0.05;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#32e8d1"
          emissive="#32e8d1"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.5}
          wireframe
        />
      </mesh>
      <mesh scale={0.94}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#0a0b10"
          emissive="#32e8d1"
          emissiveIntensity={0.15}
          roughness={0.4}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

function Node({ angle }) {
  const ref = useRef();
  const pos = useMemo(() => toPos(angle), [angle]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const s = 1 + Math.sin(t * 1.6 + angle) * 0.12;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshStandardMaterial color="#f0a05a" emissive="#f0a05a" emissiveIntensity={0.8} roughness={0.3} />
    </mesh>
  );
}

function ConnectionLine({ end }) {
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(...end)]),
    [end]
  );
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#262b36" transparent opacity={0.6} />
    </line>
  );
}

function Pulse({ end, speed, offset }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() * speed + offset) % 1);
    if (ref.current) {
      ref.current.position.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(...end), t);
      ref.current.material.opacity = Math.sin(t * Math.PI);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color="#32e8d1" transparent />
    </mesh>
  );
}

function Scene() {
  const group = useRef();
  useFrame(({ clock, mouse }) => {
    if (group.current) {
      const t = clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t * 0.06) * 0.2 + mouse.x * 0.18;
      group.current.rotation.x = mouse.y * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Core />
      {NODES.map((n) => (
        <ConnectionLine key={n.id} end={toPos(n.angle)} />
      ))}
      {NODES.map((n, i) => (
        <Pulse key={`pulse-${n.id}`} end={toPos(n.angle)} speed={0.16 + (i % 3) * 0.04} offset={i * 0.15} />
      ))}
      {NODES.map((n) => (
        <Node key={n.id} angle={n.angle} />
      ))}
    </group>
  );
}

export default function PipelineScene() {
  const [failed, setFailed] = useState(false);
  const glRef = useRef(null);

  const onContextLost = useCallback((e) => {
    e.preventDefault();
    setFailed(true);
  }, []);

  const handleCreated = useCallback((state) => {
    glRef.current = state.gl.domElement;
    state.gl.domElement.addEventListener('webglcontextlost', onContextLost, false);
  }, [onContextLost]);

  useEffect(() => {
    return () => {
      if (glRef.current) {
        glRef.current.removeEventListener('webglcontextlost', onContextLost, false);
      }
    };
  }, [onContextLost]);

  if (failed) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      onCreated={handleCreated}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#32e8d1" />
      <pointLight position={[-5, -3, -3]} intensity={20} color="#f0a05a" />
      <Scene />
    </Canvas>
  );
}
