import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function cloneSkinnedModel(scene: THREE.Object3D): THREE.Object3D {
  return SkeletonUtils.clone(scene);
}

export function getModelMetrics(scene: THREE.Object3D): {
  normalizedScale: number;
  center: THREE.Vector3;
  size: THREE.Vector3;
} {
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  scene.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z, 0.001);
  const normalizedScale = 1.4 / maxDim;

  return { normalizedScale, center, size };
}

/** Multiplicateur global — ajuster ici la taille à l'écran */
export const BUTTERFLY_DISPLAY_SCALE = 1.0;

export function enhanceButterflyMaterials(scene: THREE.Object3D): void {
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.frustumCulled = false;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((mat) => {
      if (
        mat instanceof THREE.MeshStandardMaterial ||
        mat instanceof THREE.MeshPhysicalMaterial
      ) {
        mat.side = THREE.DoubleSide;
        mat.needsUpdate = true;
      }
    });
  });
}
