// Creates public/assets/reviews/<platform>.svg from the open-source "simple-icons" package.
// Run once:   npm i -D simple-icons   then   node scripts/make-review-icons.mjs
// Each icon uses the brand colour supplied by the package.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import * as si from "simple-icons";

const OUT = "public/assets/reviews";
const MAP = {
  google: "siGoogle",
  freelancer: "siFreelancer",
  upwork: "siUpwork",
  fiverr: "siFiverr",
  facebook: "siFacebook",
  whatsapp: "siWhatsapp",
  // clutch & linkedin are not in simple-icons: download them from each
  // brand's own press/brand page and save as clutch.svg / linkedin.svg.
};

mkdirSync(OUT, { recursive: true });
for (const [name, key] of Object.entries(MAP)) {
  if (existsSync(`${OUT}/${name}.svg`)) {
    console.log(`keep  ${OUT}/${name}.svg (already exists)`);
    continue;
  }
  const icon = si[key];
  if (!icon) {
    console.log(`skip  ${name} (not in this simple-icons version)`);
    continue;
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${icon.title}">` +
    `<path fill="#${icon.hex}" d="${icon.path}"/></svg>\n`;
  writeFileSync(`${OUT}/${name}.svg`, svg);
  console.log(`ok    ${OUT}/${name}.svg`);
}
