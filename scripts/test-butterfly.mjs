/**
 * Test script — inspecte butterfly.glb (bounding box, animations, meshes)
 * Usage: node scripts/test-butterfly.mjs
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const glbPath = path.join(__dirname, "../public/butterfly.glb");

if (!fs.existsSync(glbPath)) {
  console.error("✗ Fichier introuvable:", glbPath);
  process.exit(1);
}

const loader = new GLTFLoader();
const buffer = fs.readFileSync(glbPath);

loader.parse(
  buffer.buffer,
  glbPath,
  (gltf) => {
    const { scene, animations } = gltf;

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    let meshCount = 0;
    let skinnedCount = 0;
    const materialNames = new Set();

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshCount++;
        if (child instanceof THREE.SkinnedMesh) skinnedCount++;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => materialNames.add(m.name || "unnamed"));
      }
    });

    console.log("✓ butterfly.glb chargé avec succès");
    console.log("  Taille:", size.x.toFixed(3), "x", size.y.toFixed(3), "x", size.z.toFixed(3));
    console.log("  Centre:", center.x.toFixed(3), center.y.toFixed(3), center.z.toFixed(3));
    console.log("  Meshes:", meshCount, "| Skinned:", skinnedCount);
    console.log("  Materials:", [...materialNames].join(", "));
    console.log("  Animations:", animations.length);
    animations.forEach((a) => {
      console.log(`    - "${a.name}" (${a.duration.toFixed(2)}s, ${a.tracks.length} pistes)`);
    });

    const maxDim = Math.max(size.x, size.y, size.z);
    console.log("  Échelle recommandée:", (2.2 / maxDim).toFixed(4));
    console.log(skinnedCount > 0 && animations.length > 0 ? "✓ Modèle riggé avec animations OK" : "⚠ Vérifier le modèle");
  },
  (err) => {
    console.error("✗ Erreur parsing GLB:", err.message);
    process.exit(1);
  },
);
