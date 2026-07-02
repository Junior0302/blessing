/**
 * Test de navigation réelle : ouvre le site, clique sur les liens du menu
 * (desktop + mobile) et vérifie que l'URL change. Loggue les erreurs console.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const results = [];
const consoleErrors = [];

const browser = await chromium.launch({ channel: "msedge", headless: true });

async function newPage(viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[${viewport.width}px] ${msg.text()}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`[${viewport.width}px] PAGEERROR: ${err.message}`));
  // Sauter le welcome screen
  await page.addInitScript(() => sessionStorage.setItem("blessing-welcomed", "1"));
  return { ctx, page };
}

async function open(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForTimeout(1800);
}

try {
  // ---------- DESKTOP ----------
  {
    const { ctx, page } = await newPage({ width: 1440, height: 900 });

    for (const [label, expected] of [
      ["Créations", "/creations"],
      ["Expérience", "/experience"],
      ["À propos", "/about"],
    ]) {
      await open(page, BASE);
      try {
        await page.click(`header >> text=${label}`, { timeout: 5000 });
        await page.waitForURL(`**${expected}`, { timeout: 10000 });
        results.push(`DESKTOP home->${expected} : OK`);
      } catch (e) {
        results.push(`DESKTOP home->${expected} : ECHEC — ${e.message.split("\n")[0]}`);
      }
    }

    // Depuis une page interne (SiteHeader)
    await open(page, `${BASE}/creations`);
    try {
      await page.click(`header >> text=Expérience`, { timeout: 5000 });
      await page.waitForURL("**/experience", { timeout: 10000 });
      results.push(`DESKTOP /creations->/experience : OK`);
    } catch (e) {
      results.push(`DESKTOP /creations->/experience : ECHEC — ${e.message.split("\n")[0]}`);
    }

    // Bouton Réserver
    await open(page, BASE);
    try {
      await page.click(`header >> text=Réserver`, { timeout: 5000 });
      await page.waitForURL("**/reserver", { timeout: 10000 });
      results.push(`DESKTOP bouton Réserver : OK`);
    } catch (e) {
      results.push(`DESKTOP bouton Réserver : ECHEC — ${e.message.split("\n")[0]}`);
    }
    await ctx.close();
  }

  // ---------- MOBILE ----------
  {
    const { ctx, page } = await newPage({ width: 390, height: 844 });

    await open(page, BASE);
    try {
      await page.click(`button[aria-label="Ouvrir le menu"]`, { timeout: 5000 });
      await page.waitForTimeout(700);
      await page.click(`nav[aria-label="Navigation mobile"] >> text=Créations`, { timeout: 5000 });
      await page.waitForURL("**/creations", { timeout: 10000 });
      results.push(`MOBILE home menu->creations : OK`);
    } catch (e) {
      results.push(`MOBILE home menu->creations : ECHEC — ${e.message.split("\n")[0]}`);
    }

    await open(page, `${BASE}/about`);
    try {
      await page.click(`button[aria-label="Ouvrir le menu"]`, { timeout: 5000 });
      await page.waitForTimeout(700);
      await page.click(`nav[aria-label="Navigation mobile"] >> text=Expérience`, { timeout: 5000 });
      await page.waitForURL("**/experience", { timeout: 10000 });
      results.push(`MOBILE /about menu->experience : OK`);
    } catch (e) {
      results.push(`MOBILE /about menu->experience : ECHEC — ${e.message.split("\n")[0]}`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  console.log("\n===== RESULTATS =====");
  results.forEach((r) => console.log(r));
  console.log("\n===== ERREURS CONSOLE =====");
  if (consoleErrors.length === 0) console.log("(aucune)");
  consoleErrors.slice(0, 20).forEach((e) => console.log(e));
}
