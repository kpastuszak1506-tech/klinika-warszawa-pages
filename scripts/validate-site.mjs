import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";

const root = process.cwd();
const failures = [];
const require = createRequire(import.meta.url);
const typescript = require("typescript");

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
  "src/app/wiedza/tematy/[slug]/page.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/components/BookingContactForm.tsx",
  "src/components/BookingWidgetSlot.tsx",
  "src/components/ComplianceNotice.tsx",
  "src/components/CompanyDetails.tsx",
  "src/components/Footer.tsx",
  "src/components/KnowledgeArticleLayout.tsx",
  "src/components/KnowledgeCard.tsx",
  "src/components/KnowledgeTopicCard.tsx",
  "src/config/companyConfig.ts",
  "src/lib/knowledge.ts",
  "src/lib/siteContent.ts",
];

const activeContentFiles = [
  ...walk(join(root, "src/app")),
  ...walk(join(root, "src/components")),
  ...walk(join(root, "src/config")),
  ...walk(join(root, "src/lib")),
].filter((file) => /\.(ts|tsx)$/.test(file) && !file.includes("/clinical-3d/"));

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
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function displayPath(filePath) {
  return relative(root, filePath);
}

function fail(message) {
  failures.push(message);
}

function loadTypeScriptModule(relativePath, stubs = {}) {
  const source = read(relativePath);
  const output = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: relativePath,
    reportDiagnostics: true,
  });

  const diagnostics = output.diagnostics?.filter(
    (diagnostic) => diagnostic.category === typescript.DiagnosticCategory.Error,
  );

  if (diagnostics?.length) {
    throw new Error(
      `${relativePath}: ${diagnostics
        .map((diagnostic) => typescript.flattenDiagnosticMessageText(diagnostic.messageText, " "))
        .join("; ")}`,
    );
  }

  const compiledModule = { exports: {} };
  const localRequire = (specifier) => {
    if (Object.hasOwn(stubs, specifier)) {
      return stubs[specifier];
    }

    throw new Error(`${relativePath}: niedozwolony import runtime: ${specifier}`);
  };

  new Function("exports", "module", "require", output.outputText)(
    compiledModule.exports,
    compiledModule,
    localRequire,
  );

  return compiledModule.exports;
}

function loadCompanyConfigForEnvironment(nodeEnv) {
  const previousNodeEnv = process.env.NODE_ENV;

  if (nodeEnv === undefined) {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = nodeEnv;
  }

  try {
    return loadTypeScriptModule("src/config/companyConfig.ts");
  } finally {
    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = previousNodeEnv;
    }
  }
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    fail(`Brak wymaganego pliku: ${file}`);
  }
}

for (const file of activeContentFiles) {
  const content = readFileSync(file, "utf8");

  for (const phrase of forbiddenPhrases) {
    if (content.toLocaleLowerCase("pl-PL").includes(phrase)) {
      fail(`Niedozwolona fraza „${phrase}” w ${displayPath(file)}`);
    }
  }

  for (const pattern of trackerPatterns) {
    if (pattern.test(content)) {
      fail(`Potencjalny tracker ${pattern} w ${displayPath(file)}`);
    }
  }
}

const bookingForm = read("src/components/BookingContactForm.tsx");
for (const unsafePattern of [/<textarea/i, /type=["']file/i, /\bpesel\b/i]) {
  if (unsafePattern.test(bookingForm)) {
    fail(`Niedozwolone pole w BookingContactForm: ${unsafePattern}`);
  }
}
for (const unsafePattern of [/<form\b/i, /\bfetch\s*\(/i, /sendBeacon\s*\(/i]) {
  if (unsafePattern.test(bookingForm)) {
    fail(`Niedozwolona transmisja danych w BookingContactForm: ${unsafePattern}`);
  }
}

const knowledgeSource = read("src/lib/knowledge.ts");
if (/\bsourceRefs\b/.test(knowledgeSource)) {
  fail("Wykryto usunięty kontrakt sourceRefs; używaj citationIds.");
}
if (!/citationIds\?\s*:\s*string\[\]/.test(knowledgeSource)) {
  fail("KnowledgeParagraph musi używać pola citationIds?: string[].");
}

let companyConfig;
let knowledge;
let configModule;
let localDemoConfigModule;
try {
  configModule = loadTypeScriptModule("src/config/companyConfig.ts");
  localDemoConfigModule = loadCompanyConfigForEnvironment("development");
  companyConfig = configModule.companyConfig;
  knowledge = loadTypeScriptModule("src/lib/knowledge.ts", {
    "@/config/companyConfig": {
      isPublicReleaseReady: configModule.isPublicReleaseReady,
      isLocalDemoPreview: configModule.isLocalDemoPreview,
    },
  });
} catch (error) {
  fail(`Nie można uruchomić modelu runtime: ${error.message}`);
}

if (companyConfig) {
  const sensitiveFields = [
    "companyName",
    "shortName",
    "legalForm",
    "registeredOfficeAddress",
    "medicalOfficeAddress",
    "nip",
    "regon",
    "medicalRegon",
    "rpwdlNumber",
    "phone",
    "email",
    "privacyEmail",
    "firstVisitPrice",
    "followUpVisitPrice",
  ];

  if (!companyConfig.publicDataVerified) {
    for (const field of sensitiveFields) {
      if (hasText(companyConfig[field])) {
        fail(`publicDataVerified=false wymaga pustego pola wrażliwego: ${field}`);
      }
    }

    for (const file of [
      "src/components/BookingWidgetSlot.tsx",
      "src/components/Footer.tsx",
      "src/components/CompanyDetails.tsx",
      "src/components/PriceTable.tsx",
    ]) {
      const source = read(file);
      if (
        source.includes("companyConfig") &&
        !source.includes("isPublicDataVerified") &&
        !source.includes("isMedfileBookingReady") &&
        !source.includes("displayCompanyData")
      ) {
        fail(`Brak bramki danych publicznych w ${file}`);
      }
    }
  }

  if (companyConfig.demoMode) {
    if (companyConfig.publicDataVerified || companyConfig.allowSearchIndexing) {
      fail("demoMode wymaga publicDataVerified=false i allowSearchIndexing=false.");
    }
    if (companyConfig.demoFirstVisitPrice !== "300" || companyConfig.demoFollowUpVisitPrice !== "200") {
      fail("Tryb demo wymaga kwot demonstracyjnych 300 i 200.");
    }
    for (const field of ["demoFirstVisitPrice", "demoFollowUpVisitPrice"]) {
      if (!/^\d+$/.test(companyConfig[field] ?? "")) {
        fail(`Pole demonstracyjnego cennika musi być liczbą całkowitą: ${field}`);
      }
    }
  }

  const expectedLocalDemoPreview =
    companyConfig.demoMode && process.env.NODE_ENV === "development";
  if (configModule?.isLocalDemoPreview !== expectedLocalDemoPreview) {
    fail("isLocalDemoPreview musi zależeć wyłącznie od demoMode i NODE_ENV=development.");
  }
  if (!read("src/config/companyConfig.ts").includes('process.env.NODE_ENV === "development"')) {
    fail("isLocalDemoPreview musi być ograniczony do NODE_ENV=development.");
  }

  const localDemoData = localDemoConfigModule?.displayCompanyData;
  const displayFields = sensitiveFields.slice(0, -2);
  if (!localDemoData || typeof localDemoData !== "object") {
    fail("Lokalne demo musi uzyskiwać dane wyłącznie przez displayCompanyData.");
  } else {
    for (const field of displayFields) {
      if (!hasText(localDemoData[field])) {
        fail(`Brak demonstracyjnej wartości pola: ${field}`);
      }
    }
    if (
      !/demonstracyj/i.test(localDemoData.companyName) ||
      !/\.test$/i.test(localDemoData.email) ||
      !/\.test$/i.test(localDemoData.privacyEmail)
    ) {
      fail("Dane lokalnego demo muszą być jednoznacznymi placeholderami.");
    }

    const verifiedDisplayData = Object.fromEntries(
      displayFields.map((field) => [field, companyConfig[field]]),
    );
    const expectedDisplayData = companyConfig.publicDataVerified
      ? verifiedDisplayData
      : expectedLocalDemoPreview
        ? localDemoData
        : null;
    if (
      JSON.stringify(configModule?.displayCompanyData) !==
      JSON.stringify(expectedDisplayData)
    ) {
      fail("displayCompanyData musi zwracać dane zweryfikowane albo lokalne demo, a poza nimi null.");
    }

    for (const file of activeContentFiles) {
      if (displayPath(file) === "src/config/companyConfig.ts") {
        continue;
      }
      const source = readFileSync(file, "utf8");
      for (const value of Object.values(localDemoData)) {
        if (hasText(value) && source.includes(value)) {
          fail(`Dane demonstracyjne mogą występować tylko w display helperze: ${displayPath(file)}`);
        }
      }
    }
  }

  const widget = companyConfig.bookingWidget;
  if (!widget || typeof widget !== "object") {
    fail("Brak konfiguracji bookingWidget.");
  } else {
    const configSource = read("src/config/companyConfig.ts");
    const allowedBookingFields = new Set(["provider", "publicBookingUrl"]);
    const forbiddenClientConfigPattern = /(?:authorization|token|secret|api[ _-]?key)/i;

    if (widget.provider !== "medfile") {
      fail("bookingWidget musi używać dostawcy medfile.");
    }
    if (
      Object.keys(widget).some((field) => !allowedBookingFields.has(field)) ||
      !Object.hasOwn(widget, "publicBookingUrl")
    ) {
      fail("bookingWidget może zawierać tylko provider i publicBookingUrl.");
    }
    if (forbiddenClientConfigPattern.test(configSource)) {
      fail("Konfiguracja klienta nie może zawierać pól ani wartości poświadczeń integracji.");
    }
    if (
      typeof widget.publicBookingUrl !== "string" ||
      (hasText(widget.publicBookingUrl) &&
        !configModule.isValidMedfileBookingUrl(widget.publicBookingUrl))
    ) {
      fail("publicBookingUrl musi być pusty albo wskazywać HTTPS medfile.pl.");
    }
    if (
      configModule.isMedfileBookingReady !==
      (companyConfig.publicDataVerified &&
        configModule.isValidMedfileBookingUrl(widget.publicBookingUrl))
    ) {
      fail("Gotowość Medfile musi wynikać wyłącznie z danych publicznych i poprawnego URL.");
    }
    if (
      !bookingForm.includes(
        "Rezerwacja online zostanie udostępniona przed rozpoczęciem przyjmowania pacjentów.",
      ) ||
      !read("src/components/BookingWidgetSlot.tsx").includes(
        "Rezerwacja online zostanie udostępniona przed rozpoczęciem przyjmowania pacjentów.",
      )
    ) {
      fail("Brak neutralnego fallbacku rezerwacji online.");
    }
    const bookingWidgetSource = read("src/components/BookingWidgetSlot.tsx");
    if (/\b(?:iframe|providerName|allowedOrigin|apiEndpoint|requiresSecureProxy)\b/.test(bookingWidgetSource)) {
      fail("BookingWidgetSlot nie może obsługiwać technicznych trybów integracji po stronie klienta.");
    }
  }
}

if (knowledge) {
  const {
    knowledgeArticles,
    knowledgeTopics,
    publicKnowledgeArticles,
    publicKnowledgeTopics,
    isPublicKnowledgeArticle,
    isPublicKnowledgeTopic,
    visibleKnowledgeArticles,
    previewKnowledgeArticles,
    getVisibleKnowledgeArticle,
  } = knowledge;
  const articleSlugs = new Set();
  const topicSlugs = new Set();
  const sourceIds = new Set();
  const claimPattern =
    /\b(?:ryzyk\w*|działa\w*|skutecz\w*|korzyś\w*|szkod\w*|niepożądan\w*|senno\w*|zawrot\w*|nudno\w*)\b|\d+(?:[,.]\d+)?\s*(?:%|osob|dni|miesi[aę]c|lat|mg|ml)/iu;

  if (!Array.isArray(knowledgeArticles) || !Array.isArray(knowledgeTopics)) {
    fail("Model wiedzy nie eksportuje list artykułów i tematów.");
  } else {
    for (const article of knowledgeArticles) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug ?? "")) {
        fail(`Nieprawidłowy slug artykułu: ${article.slug}`);
      }
      if (articleSlugs.has(article.slug)) {
        fail(`Nieunikalny slug artykułu: ${article.slug}`);
      }
      articleSlugs.add(article.slug);

      if (!isValidDate(article.publishedAt) || !isValidDate(article.updatedAt)) {
        fail(`Nieprawidłowa data publikacji lub aktualizacji: ${article.slug}`);
      } else if (article.updatedAt < article.publishedAt) {
        fail(`updatedAt nie może poprzedzać publishedAt: ${article.slug}`);
      }

      if (!Array.isArray(article.sources) || article.sources.length < 2) {
        fail(`Artykuł musi mieć co najmniej dwa źródła: ${article.slug}`);
      }

      const articleSourceIds = new Set();
      for (const source of article.sources ?? []) {
        if (!hasText(source.id) || sourceIds.has(source.id)) {
          fail(`Nieunikalny lub pusty identyfikator źródła: ${source.id}`);
        }
        sourceIds.add(source.id);
        articleSourceIds.add(source.id);
        if (
          !hasText(source.title) ||
          !hasText(source.publisher) ||
          source.quality !== "high" && source.quality !== "standard"
        ) {
          fail(`Niepełne źródło w artykule: ${article.slug}`);
        }
        try {
          if (new URL(source.href).protocol !== "https:") {
            fail(`Źródło nie używa HTTPS: ${source.id}`);
          }
        } catch {
          fail(`Nieprawidłowy URL źródła: ${source.id}`);
        }
        if (source.publicationDate && !isValidDate(source.publicationDate)) {
          fail(`Nieprawidłowa data źródła: ${source.id}`);
        }
      }

      for (const section of article.sections ?? []) {
        for (const paragraph of section.paragraphs ?? []) {
          const citationIds = paragraph.citationIds;
          if (
            citationIds !== undefined &&
            (!Array.isArray(citationIds) ||
              citationIds.length === 0 ||
              new Set(citationIds).size !== citationIds.length ||
              citationIds.some((id) => !articleSourceIds.has(id)))
          ) {
            fail(`Nieprawidłowe citationIds w artykule: ${article.slug}`);
          }
          if (
            article.reviewStatus === "reviewed" &&
            claimPattern.test(paragraph.text ?? "") &&
            (!citationIds || citationIds.length === 0)
          ) {
            fail(`Twierdzenie o ryzyku, działaniu lub liczbach bez cytowania: ${article.slug}`);
          }
        }
      }

      if (article.reviewStatus === "reviewed") {
        const reviewer = article.medicalReviewer;
        if (
          !hasText(article.authorName) ||
          !reviewer ||
          !hasText(reviewer.name) ||
          !hasText(reviewer.role) ||
          !hasText(reviewer.qualifications) ||
          !isValidDate(article.reviewedAt)
        ) {
          fail(`Artykuł reviewed wymaga autora, pełnego recenzenta i reviewedAt: ${article.slug}`);
        }
        if (
          article.nextReviewAt &&
          (!isValidDate(article.nextReviewAt) || article.nextReviewAt <= article.reviewedAt)
        ) {
          fail(`Nieprawidłowe nextReviewAt: ${article.slug}`);
        }
        if ((article.sources ?? []).filter((source) => source.quality === "high").length < 2) {
          fail(`Artykuł reviewed wymaga dwóch źródeł high-quality: ${article.slug}`);
        }
      }
    }

    for (const topic of knowledgeTopics) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.slug ?? "")) {
        fail(`Nieprawidłowy slug tematu: ${topic.slug}`);
      }
      if (topicSlugs.has(topic.slug)) {
        fail(`Nieunikalny slug tematu: ${topic.slug}`);
      }
      topicSlugs.add(topic.slug);
      if (!hasText(topic.label) || !hasText(topic.description)) {
        fail(`Temat musi mieć etykietę i opis: ${topic.slug}`);
      }
      for (const slug of topic.articleSlugs ?? []) {
        if (!articleSlugs.has(slug)) {
          fail(`Temat odwołuje się do nieistniejącego artykułu: ${topic.slug}/${slug}`);
        }
      }
    }

    for (const article of knowledgeArticles) {
      for (const topicSlug of article.topics ?? []) {
        if (!topicSlugs.has(topicSlug)) {
          fail(`Artykuł ma nieistniejący temat: ${article.slug}/${topicSlug}`);
        }
      }
      for (const slug of article.relatedSlugs ?? []) {
        if (!articleSlugs.has(slug) || slug === article.slug) {
          fail(`Artykuł ma nieprawidłowe relatedSlugs: ${article.slug}/${slug}`);
        }
      }
    }

    if (!Array.isArray(publicKnowledgeArticles) || !Array.isArray(publicKnowledgeTopics)) {
      fail("Model wiedzy nie eksportuje publicznych selektorów artykułów i tematów.");
    } else {
      if (publicKnowledgeArticles.some((article) => !isPublicKnowledgeArticle(article))) {
        fail("publicKnowledgeArticles zawiera artykuł niespełniający kryteriów publikacji.");
      }
      if (publicKnowledgeArticles.some((article) => article.reviewStatus === "review-required")) {
        fail("publicKnowledgeArticles nie może zawierać artykułów review-required.");
      }
      if (publicKnowledgeTopics.some((topic) => !isPublicKnowledgeTopic(topic))) {
        fail("publicKnowledgeTopics zawiera temat niespełniający kryteriów publikacji.");
      }
      if (!companyConfig.publicDataVerified && publicKnowledgeArticles.length > 0) {
        fail("Przy niezweryfikowanych danych publicKnowledgeArticles musi pozostać puste.");
      }
      if (!companyConfig.publicDataVerified && publicKnowledgeTopics.length > 0) {
        fail("Przy niezweryfikowanych danych publicKnowledgeTopics musi pozostać puste.");
      }
      if (!Array.isArray(visibleKnowledgeArticles) || !Array.isArray(previewKnowledgeArticles)) {
        fail("Model wiedzy nie eksportuje selektorów widocznych i preview.");
      } else if (!configModule.isLocalDemoPreview) {
        if (
          visibleKnowledgeArticles.length !== publicKnowledgeArticles.length ||
          previewKnowledgeArticles.length !== publicKnowledgeArticles.length
        ) {
          fail("Poza lokalnym demo selektory widoczne muszą zwracać wyłącznie publiczne materiały.");
        }
        if (
          knowledgeArticles.some(
            (article) =>
              !isPublicKnowledgeArticle(article) && getVisibleKnowledgeArticle(article.slug),
          )
        ) {
          fail("Poza lokalnym demo getter widocznej wiedzy nie może zwracać szkiców.");
        }
      } else if (
        visibleKnowledgeArticles.length !== knowledgeArticles.length ||
        previewKnowledgeArticles.length !== knowledgeArticles.length ||
        knowledgeArticles.some(
          (article) => !getVisibleKnowledgeArticle(article.slug),
        )
      ) {
        fail("Lokalne demo musi udostępniać wszystkie materiały wyłącznie przez selektory preview.");
      }
    }

    for (const topic of knowledgeTopics) {
      const publicCount = knowledgeArticles.filter(
        (article) => article.topics.includes(topic.slug) && isPublicKnowledgeArticle(article),
      ).length;
      if (isPublicKnowledgeTopic(topic) !== (publicCount >= 3)) {
        fail(`Temat publiczny musi mieć co najmniej 3 publiczne artykuły: ${topic.slug}`);
      }
    }
  }
}

if (!read("src/app/wiedza/page.tsx").includes("visibleKnowledgeArticles")) {
  fail("Strona /wiedza musi korzystać z selektora widocznych materiałów.");
}
if (!read("src/app/wiedza/[slug]/page.tsx").includes("getVisibleKnowledgeArticle")) {
  fail("Strona artykułu musi korzystać z getVisibleKnowledgeArticle.");
}
if (!read("src/components/KnowledgeCard.tsx").includes("preview?: boolean")) {
  fail("KnowledgeCard musi mieć jawny prop preview.");
}
if (!read("src/app/wiedza/tematy/[slug]/page.tsx").includes("publicKnowledgeTopics")) {
  fail("Strona tematu musi korzystać z publicKnowledgeTopics.");
}

const sitemapSource = read("src/app/sitemap.ts");
const navSource = read("src/lib/siteContent.ts");
if (sitemapSource.includes('"/informacja-dla-pacjenta"') || navSource.includes('href: "/informacja-dla-pacjenta"')) {
  fail("Dawna strona /informacja-dla-pacjenta nie może trafić do sitemap ani nawigacji.");
}
if (!read("src/app/informacja-dla-pacjenta/page.tsx").includes('permanentRedirect("/jak-wyglada-wizyta")')) {
  fail("/informacja-dla-pacjenta musi permanentnie przekierowywać do /jak-wyglada-wizyta.");
}
if (!sitemapSource.includes("areLegalDocumentsPublic")) {
  fail("Sitemap musi stosować bramkę review dokumentów prawnych.");
}
if (!read("src/components/LegalPageLayout.tsx").includes("areLegalDocumentsPublic")) {
  fail("Dokumenty prawne muszą mieć bramkę review prawnego.");
}

const homeSource = read("src/app/page.tsx");
const consultationSource = read("src/app/konsultacja/page.tsx");
if ((homeSource.match(/<ComplianceNotice\b/g) ?? []).length !== 1) {
  fail("Strona główna musi zawierać dokładnie jeden ComplianceNotice.");
}
if ((consultationSource.match(/<ComplianceNotice\b/g) ?? []).length > 1) {
  fail("Strona konsultacji może zawierać najwyżej jeden ComplianceNotice.");
}
const medicalDataNoticeCount = activeContentFiles.reduce(
  (count, file) =>
    count +
    (readFileSync(file, "utf8").match(/<p>\{formMedicalDataNotice\}<\/p>/g) ?? []).length,
  0,
);
if (medicalDataNoticeCount > 1) {
  fail("Nota o niewysyłaniu danych medycznych może występować najwyżej raz.");
}

if (failures.length > 0) {
  console.error("Walidacja treści: FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Walidacja treści: PASS");
  console.log("Sprawdzono kontrakt runtime wiedzy, bramki publikacji i zgodność treści.");
}
