import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "src/app/page.tsx",
  "src/app/konsultacja/page.tsx",
  "src/app/jak-wyglada-wizyta/page.tsx",
  "src/app/dla-kogo/page.tsx",
  "src/app/cennik/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/kontakt/page.tsx",
  "src/app/polityka-prywatnosci/page.tsx",
  "src/app/polityka-cookies/page.tsx",
  "src/app/regulamin-rezerwacji/page.tsx",
  "src/app/informacja-dla-pacjenta/page.tsx",
  "src/app/wiedza/page.tsx",
  "src/app/wiedza/[slug]/page.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/CTAButton.tsx",
  "src/components/ComplianceNotice.tsx",
  "src/components/PriceTable.tsx",
  "src/components/FAQ.tsx",
  "src/components/BookingContactForm.tsx",
  "src/components/CookieConsent.tsx",
  "src/components/LegalPageLayout.tsx",
  "src/components/CompanyDetails.tsx",
  "src/components/ProcessSteps.tsx",
  "src/components/RiskNotice.tsx",
  "src/components/SectionHeading.tsx",
  "src/components/KnowledgeCard.tsx",
  "src/components/KnowledgeArticleLayout.tsx",
  "src/config/companyConfig.ts",
  "src/lib/knowledge.ts",
];

const forbiddenPhrases = [
  "kup receptę",
  "zamów receptę",
  "e-recepta online",
  "recepta w 5 minut",
  "gwarantowana recepta",
  "najszybsza recepta",
  "najtańsza recepta",
  "medyczna marihuana online",
  "bez badania",
  "wystarczy ankieta",
  "bez wychodzenia z domu",
  "druga recepta gratis",
  "promocja",
  "kod rabatowy",
  "skuteczne leczenie marihuaną",
  "najlepsza klinika medycznej marihuany",
];

const trackerPatterns = [
  /\bgtag\s*\(/i,
  /\bfbq\s*\(/i,
  /\bttq\s*\(/i,
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /dataLayer\.push/i,
  /clarity\.ms/i,
  /static\.hotjar\.com/i,
];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    return stats.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function read(relativePath) {
  const filePath = relativePath.startsWith(root)
    ? relativePath
    : join(root, relativePath);
  return readFileSync(filePath, "utf8");
}

function displayPath(filePath) {
  return filePath.startsWith(root) ? relative(root, filePath) : filePath;
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Brak wymaganego pliku: ${file}`);
  }
}

const contentFiles = [
  ...walk(join(root, "src")),
  "PROJECT_PLAN.md",
  "AUDIT_BACKLOG.md",
  "README.md",
].filter((file) => /\.(ts|tsx|md)$/.test(file));

for (const file of contentFiles) {
  const content = read(file);

  for (const phrase of forbiddenPhrases) {
    if (content.toLocaleLowerCase("pl-PL").includes(phrase)) {
      failures.push(`Niedozwolona fraza „${phrase}” w ${displayPath(file)}`);
    }
  }
}

for (const file of walk(join(root, "src")).filter((entry) => /\.(ts|tsx)$/.test(entry))) {
  const content = read(file);

  for (const pattern of trackerPatterns) {
    if (pattern.test(content)) {
      failures.push(`Potencjalny tracker ${pattern} w ${displayPath(file)}`);
    }
  }
}

const bookingComponent = read("src/components/BookingContactForm.tsx");
const bookingWidgetComponent = read("src/components/BookingWidgetSlot.tsx");
const knowledgeContent = read("src/lib/knowledge.ts");
const knowledgeLayout = read("src/components/KnowledgeArticleLayout.tsx");

for (const unsafePattern of [/<textarea/i, /type=["']file/i, /\bpesel\b/i]) {
  if (unsafePattern.test(bookingComponent)) {
    failures.push(`Niedozwolone pole w BookingContactForm: ${unsafePattern}`);
  }
}

for (const unsafePattern of [/<form\b/i, /\bfetch\s*\(/i, /sendBeacon\s*\(/i]) {
  if (unsafePattern.test(bookingComponent)) {
    failures.push(`Niedozwolona transmisja danych w BookingContactForm: ${unsafePattern}`);
  }
}

if (!bookingWidgetComponent.includes("isApprovedExternalUrl")) {
  failures.push("BookingWidgetSlot nie waliduje zatwierdzonego adresu widgetu.");
}

for (const marker of [
  "publishedAt:",
  "updatedAt:",
  "reviewStatus:",
  "sources:",
  "relatedSlugs:",
]) {
  if (!knowledgeContent.includes(marker)) {
    failures.push("Brak pola jakości artykułu wiedzy: " + marker);
  }
}

const articleCount = (knowledgeContent.match(/^\s{4}slug:/gm) ?? []).length;
const sourceCount = (knowledgeContent.match(/^\s{8}href:/gm) ?? []).length;

if (articleCount < 4 || sourceCount < articleCount * 2) {
  failures.push("Centrum wiedzy musi mieć co najmniej 4 artykuły i 2 źródła na artykuł.");
}

if (!knowledgeLayout.includes("<ComplianceNotice")) {
  failures.push("Artykuły wiedzy nie zawierają noty compliance.");
}

for (const file of [
  "src/app/page.tsx",
  "src/app/konsultacja/page.tsx",
  "src/app/jak-wyglada-wizyta/page.tsx",
  "src/app/cennik/page.tsx",
  "src/app/kontakt/page.tsx",
  "src/app/regulamin-rezerwacji/page.tsx",
]) {
  if (!read(file).includes("<ComplianceNotice")) {
    failures.push(`Brak noty compliance na stronie krytycznej: ${file}`);
  }
}

if (failures.length > 0) {
  console.error("Walidacja treści: FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Walidacja treści: PASS");
  console.log(`Sprawdzono ${requiredFiles.length} wymaganych plików.`);
  console.log("Nie wykryto zakazanych fraz, trackerów ani pól medycznych w module rezerwacji.");
}
