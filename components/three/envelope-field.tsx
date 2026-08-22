"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { createBodyGeometry, createFlapGeometry } from "./envelope-geometry";

/** Every envelope is cream paper with a Sidecar Yellow flap. */
const CREAM = "#FFFCF2";
const CREAM_FLAP = "#F3E8BC";

type Pose = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
};

/** Deterministic PRNG so the scatter is identical on every render and reload. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPoses(
  count: number,
  columns: number,
  viewWidth: number,
  viewHeight: number,
) {
  const random = mulberry32(20260821);
  const scattered: Pose[] = [];
  const assembled: Pose[] = [];

  const rows = Math.ceil(count / columns);
  const gapX = 1.22;
  const gapY = 0.9;

  // Shrink the assembled grid to fit the visible box. Without this the grid is
  // a fixed size in world units and runs off the sides of a phone.
  const gridWidth = (columns - 1) * gapX + 1;
  const gridHeight = (rows - 1) * gapY + 0.68;
  const fit = Math.min(
    (viewWidth * 0.92) / gridWidth,
    (viewHeight * 0.7) / gridHeight,
    1,
  );

  for (let i = 0; i < count; i++) {
    // Resting state: envelopes ring the copy rather than crossing it, so the
    // type always has clear ground. The ring is sized from the *visible* world
    // box rather than fixed units, so it stays clear of the centre on a narrow
    // phone as well as a wide desktop. Rotations stay shallow — an envelope
    // turned edge-on reads as a shard, not as paper.
    const angle = (i / count) * Math.PI * 2 + random() * 0.5;
    // >1 means the ring sits at or past the edge of the visible box, so the
    // centre stays clear for the headline and some envelopes crop at the
    // frame — which is the intended look, not an accident.
    const push = 1.05 + random() * 0.55;
    scattered.push({
      position: new THREE.Vector3(
        // Half-extents: `viewport` reports the full visible box, but a ring
        // radius is measured from the centre. Using the full width here made
        // the radius twice the intended size and pushed every envelope past
        // the edge of the frustum.
        Math.cos(angle) * (viewWidth / 2) * push,
        Math.sin(angle) * (viewHeight / 2) * push,
        -1.5 - random() * 5,
      ),
      rotation: new THREE.Euler(
        (random() - 0.5) * 0.7,
        (random() - 0.5) * 0.8,
        (random() - 0.5) * 1.5,
      ),
      scale: 0.8 + random() * 0.45,
    });

    // Assembled state: an ordered grid — every dollar in its place.
    const col = i % columns;
    const row = Math.floor(i / columns);
    assembled.push({
      position: new THREE.Vector3(
        (col - (columns - 1) / 2) * gapX * fit,
        // Sit the grid below centre so it fills the band the step cards
        // occupy rather than colliding with the headline above them.
        (((rows - 1) / 2 - row) * gapY - 0.75) * fit,
        0,
      ),
      rotation: new THREE.Euler(0, 0, 0),
      scale: fit,
    });
  }

  return { scattered, assembled };
}

/**
 * One colourway of envelopes.
 *
 * Colour lives on the material rather than on a per-instance colour attribute:
 * three compiles the instancing-colour chunk into the shader only if
 * `instanceColor` exists at compile time, and adding it afterwards silently
 * produces meshes that never draw. Two small meshes sidestep that entirely.
 */
function EnvelopeGroup({
  indices,
  scattered,
  assembled,
  progress,
  total,
  bodyColor,
  flapColor,
}: {
  indices: number[];
  scattered: Pose[];
  assembled: Pose[];
  progress: React.RefObject<number>;
  total: number;
  bodyColor: string;
  flapColor: string;
}) {
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const flapRef = useRef<THREE.InstancedMesh>(null);

  const bodyGeo = useMemo(() => createBodyGeometry(), []);
  const flapGeo = useMemo(() => createFlapGeometry(), []);

  useEffect(
    () => () => {
      bodyGeo.dispose();
      flapGeo.dispose();
    },
    [bodyGeo, flapGeo],
  );

  // Scratch objects, reused every frame so the loop allocates nothing. These
  // are refs rather than memos because they are deliberately mutated after
  // render — which is exactly what a ref is for.
  const scratch = useRef({
    dummy: new THREE.Object3D(),
    vec: new THREE.Vector3(),
    quatFrom: new THREE.Quaternion(),
    quatTo: new THREE.Quaternion(),
    quat: new THREE.Quaternion(),
  });

  useFrame((state) => {
    const body = bodyRef.current;
    const flap = flapRef.current;
    if (!body || !flap) return;

    const p = THREE.MathUtils.clamp(progress.current ?? 0, 0, 1);
    const t = state.clock.elapsedTime;
    const { dummy, vec, quatFrom, quatTo, quat } = scratch.current;

    for (let slot = 0; slot < indices.length; slot++) {
      const i = indices[slot];

      // Stagger so envelopes land in waves rather than all at once.
      const delay = (i / total) * 0.35;
      const local = THREE.MathUtils.clamp((p - delay) / (1 - 0.35), 0, 1);
      const e =
        local < 0.5
          ? 4 * local * local * local
          : 1 - Math.pow(-2 * local + 2, 3) / 2;

      const from = scattered[i];
      const to = assembled[i];

      vec.copy(from.position).lerp(to.position, e);
      // A slow drift while scattered, settling to nothing once assembled.
      const drift = 1 - e;
      vec.x += Math.sin(t * 0.32 + i * 1.7) * 0.14 * drift;
      vec.y += Math.cos(t * 0.27 + i * 2.3) * 0.14 * drift;

      quatFrom.setFromEuler(from.rotation);
      quatTo.setFromEuler(to.rotation);
      quat.copy(quatFrom).slerp(quatTo, e);

      dummy.position.copy(vec);
      dummy.quaternion.copy(quat);
      dummy.scale.setScalar(THREE.MathUtils.lerp(from.scale, to.scale, e));
      dummy.updateMatrix();

      body.setMatrixAt(slot, dummy.matrix);
      flap.setMatrixAt(slot, dummy.matrix);
    }

    body.instanceMatrix.needsUpdate = true;
    flap.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={bodyRef}
        args={[bodyGeo, undefined, indices.length]}
        frustumCulled={false}
      >
        <meshPhysicalMaterial
          color={bodyColor}
          roughness={0.85}
          metalness={0}
          sheen={0.35}
          sheenRoughness={0.75}
          sheenColor={CREAM_FLAP}
          clearcoat={0.05}
        />
      </instancedMesh>

      <instancedMesh
        ref={flapRef}
        args={[flapGeo, undefined, indices.length]}
        frustumCulled={false}
      >
        <meshPhysicalMaterial color={flapColor} roughness={0.92} metalness={0} />
      </instancedMesh>
    </group>
  );
}

function Envelopes({
  progress,
  count,
  columns,
}: {
  progress: React.RefObject<number>;
  count: number;
  columns: number;
}) {
  // The visible world box at z=0, so the resting ring can be sized to it.
  const { width: viewWidth, height: viewHeight } = useThree((s) => s.viewport);

  const { scattered, assembled } = useMemo(
    () => buildPoses(count, columns, viewWidth, viewHeight),
    [count, columns, viewWidth, viewHeight],
  );

  const all = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count],
  );

  return (
    <EnvelopeGroup
      indices={all}
      scattered={scattered}
      assembled={assembled}
      progress={progress}
      total={count}
      bodyColor={CREAM}
      flapColor={CREAM_FLAP}
    />
  );
}

function Lights({ theme }: { theme: "light" | "dark" }) {
  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.42 : 0.6} />
      {/* Warm key from upper left, matching the app's card shadows. */}
      <directionalLight position={[-4, 5, 6]} intensity={2.2} color="#FFF6DE" />
      {/* Cool rim so cream envelopes separate from a cream page. */}
      <directionalLight position={[5, -2, -4]} intensity={0.85} color="#4FA8A2" />
      <hemisphereLight args={["#FFFCF2", "#04201E", theme === "dark" ? 0.34 : 0.5]} />
    </>
  );
}

export default function EnvelopeField({
  progress,
  count = 24,
  columns = 6,
  className,
  theme = "light",
}: {
  progress: React.RefObject<number>;
  count?: number;
  columns?: number;
  className?: string;
  theme?: "light" | "dark";
}) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8.5], fov: 42 }}
    >
      <Lights theme={theme} />
      <Envelopes progress={progress} count={count} columns={columns} />
    </Canvas>
  );
}
