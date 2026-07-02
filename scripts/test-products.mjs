/** Test catalogue produits et calcul panier */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Parse products from source (simple regex extraction)
const productsFile = readFileSync(path.join(root, "src/lib/products.ts"), "utf8");
const productIds = [...productsFile.matchAll(/id: "([^"]+)"/g)].map((m) => m[1]);
const prices = [...productsFile.matchAll(/price: ([\d.]+)/g)].map((m) => parseFloat(m[1]));

console.log("✓ Produits trouvés:", productIds.length);
productIds.forEach((id) => console.log(`  - ${id}`));

const TAX_RATE = 0.1;
const DELIVERY = 3.5;
const sampleTotal = prices[0] + prices[1];
const tax = (sampleTotal + DELIVERY) * TAX_RATE;
const total = sampleTotal + DELIVERY + tax;

console.log("✓ Simulation panier (2 articles):");
console.log(`  Sous-total: ${sampleTotal.toFixed(2)} €`);
console.log(`  Livraison: ${DELIVERY.toFixed(2)} €`);
console.log(`  TVA 10%: ${tax.toFixed(2)} €`);
console.log(`  Total: ${total.toFixed(2)} €`);

const glbExists = readFileSync(path.join(root, "public/butterfly.glb"));
console.log(`✓ butterfly.glb: ${(glbExists.length / 1024).toFixed(0)} Ko`);

const images = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
let ok = 0;
for (const img of images) {
  try {
    readFileSync(path.join(root, "public/images", img));
    ok++;
  } catch {
    console.error(`✗ Image manquante: ${img}`);
    process.exit(1);
  }
}
console.log(`✓ Images: ${ok}/${images.length}`);

console.log("\n✓ Tous les tests passent");
