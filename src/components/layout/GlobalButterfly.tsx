"use client";

import { Suspense, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Points } from "three";
import {
  cloneSkinnedModel,
  enhanceButterflyMaterials,
  getModelMetrics,
  BUTTERFLY_DISPLAY_SCALE,
} from "@/lib/butterfly-utils";

useGLTF.preload("/butterfly.glb");

function ButterflyModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const modelRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("/butterfly.glb");

  const model = useMemo(() => {
    const cloned = cloneSkinnedModel(scene);
    enhanceButterflyMaterials(cloned);
    return cloned;
  }, [scene]);

  const displayScale = useMemo(() => {
    const { normalizedScale } = getModelMetrics(model);
    return normalizedScale * BUTTERFLY_DISPLAY_SCALE;
  }, [model]);

  // drei useAnimations met déjà à jour le mixer à chaque frame :
  // ne PAS appeler mixer.update() manuellement (double vitesse = tremblements).
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (!actions || animations.length === 0) return;

    // Uniquement l'animation de base du modèle (la première du GLB),
    // jouer les 3 clips en même temps créait des conflits de squelette.
    const baseAction = actions[animations[0].name];
    if (!baseAction) return;

    baseAction.reset().fadeIn(0.4).play();
    baseAction.setLoop(THREE.LoopRepeat, Infinity);

    return () => {
      baseAction.fadeOut(0.2);
    };
  }, [actions, animations]);

  useFrame((state) => {
    const root = modelRef.current;
    if (!root) return;

    const t = state.clock.elapsedTime;
    const progress = scrollProgress.current;

    // Vol stationnaire au centre + trajectoire pilotée par le scroll :
    // il se décale de gauche à droite, descend légèrement et pivote.
    const scrollX = Math.sin(progress * Math.PI * 2) * 1.7;
    const scrollY = -progress * 0.9 + Math.sin(progress * Math.PI * 3) * 0.3;

    const targetX = Math.sin(t * 0.45) * 0.4 + scrollX;
    const targetY = 0.15 + Math.sin(t * 0.8) * 0.2 + scrollY;

    root.position.x = THREE.MathUtils.lerp(root.position.x, targetX, 0.06);
    root.position.y = THREE.MathUtils.lerp(root.position.y, targetY, 0.06);
    root.position.z = Math.sin(t * 0.35) * 0.12;

    // Rotation liée au scroll : le papillon se tourne en volant
    const targetRotY = Math.sin(t * 0.3) * 0.25 + progress * Math.PI * 0.9;
    root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, targetRotY, 0.05);
    // Inclinaison de virage (banking) selon le déplacement latéral
    const targetRotZ = Math.sin(t * 0.6) * 0.04 - (targetX - root.position.x) * 0.25;
    root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, targetRotZ, 0.08);
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, progress * 0.3, 0.05);

    root.scale.setScalar(displayScale);
  });

  return <primitive ref={modelRef} object={model} />;
}

/** Particules dorées flottantes — ambiance miel / sucre glace */
function GoldenParticles() {
  const pointsRef = useRef<Points>(null);

  const { positions, speeds, count } = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    // Pseudo-aléatoire déterministe (pur) : même nuage à chaque rendu
    const rand = (i: number, salt: number) => {
      const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i, 1) - 0.5) * 11;
      positions[i * 3 + 1] = (rand(i, 2) - 0.5) * 7;
      positions[i * 3 + 2] = -1 - rand(i, 3) * 3;
      speeds[i] = 0.15 + rand(i, 4) * 0.45;
    }
    return { positions, speeds, count };
  }, []);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * 0.0045;
      if (y > 3.5) y = -3.5;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t * speeds[i] + i) * 0.0006);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#c9a962"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={2} color="#ffffff" />
      <hemisphereLight args={["#ffffff", "#f0e8dc", 1.4]} />
      <directionalLight position={[5, 8, 6]} intensity={3} color="#fffaf5" />
      <pointLight position={[0, 0, 4]} intensity={2} color="#ffffff" />
    </>
  );
}

export function GlobalButterfly() {
  const pathname = usePathname();
  const scrollProgress = useRef(0);
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  if (isHome) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] h-[100dvh] w-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40, near: 0.01, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        // R3F force pointer-events:auto sur son conteneur : on le neutralise
        // sinon le canvas plein écran bloque tous les clics du site.
        style={{ background: "transparent", pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "none";
        }}
      >
        <SceneLights />
        <GoldenParticles />
        <Suspense fallback={null}>
          <ButterflyModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
