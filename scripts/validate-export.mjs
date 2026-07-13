import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";

const root = process.cwd();
const outDirectory = join(root, "out");
const failures = [];
const require = createRequire(import.meta.url);
const typescript = require("typescript");

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function loadTypeScriptModule(relativePath, stubs = {}) {
  const source = readFileSync(join(root, relativePath), "utf8");
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
  process.env.NODE_ENV = nodeEnv;

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

function fail(message) {
  failures.push(message);
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
  return match?.[1];
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function renderedMarkup(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function visibleText(markup) {
  return decodeHtml(markup.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function exportedArticleFiles(slug) {
  return [
    join(outDirectory, "wiedza", slug, "index.html"),
    join(outDirectory, "wiedza", `${slug}.html`),
  ].filter(existsSync);
}

function routeForFile(filePath) {
  const outputPath = relative(outDirectory, filePath).replace(/\\/g, "/");
  if (outputPath === "index.html") {
    return "/";
  }
  if (outputPath.endsWith("/index.html")) {
    return `/${outputPath.slice(0, -"index.html".length)}`;
  }
  return `/${outputPath}`;
}

function pageFileExists(pathname) {
  const normalized = pathname.replace(/^\/+|\/+$/g, "");
  if (!normalized) {
    return existsSync(join(outDirectory, "index.html"));
  }
  return (
    existsSync(join(outDirectory, normalized, "index.html")) ||
    existsSync(join(outDirectory, `${normalized}.html`)) ||
    existsSync(join(outDirectory, normalized))
  );
}

if (!existsSync(outDirectory)) {
  fail("Brak katalogu out/. Uruchom najpierw build:pages.");
} else {
  const configModule = loadTypeScriptModule("src/config/companyConfig.ts");
  const config = configModule.companyConfig;
  const localDemoConfig = loadCompanyConfigForEnvironment("development");
  const localDemoData = localDemoConfig.displayCompanyData;
  const knowledge = loadTypeScriptModule("src/lib/knowledge.ts", {
    "@/config/companyConfig": {
      isPublicReleaseReady: configModule.isPublicReleaseReady,
      isLocalDemoPreview: configModule.isLocalDemoPreview,
    },
  });
  if (configModule.isLocalDemoPreview) {
    fail("Eksport statyczny nie może uruchamiać lokalnego trybu demo.");
  }
  const nonPublicArticles = knowledge.knowledgeArticles.filter(
    (article) =>
      article.reviewStatus === "review-required" ||
      !knowledge.isPublicKnowledgeArticle(article),
  );
  const websiteUrl = new URL(config.websiteUrl);
  const basePath = websiteUrl.pathname.replace(/\/$/, "");
  const htmlFiles = walk(outDirectory).filter((file) => file.endsWith(".html"));
  const exportedFiles = walk(outDirectory).filter((file) => /\.(?:html|js|json|css)$/i.test(file));
  const forbiddenOutputPatterns = [
    /example\.com/i,
    /(?:test|kontakt|rejestracja)@/i,
    /\+?48[\s-]*22[\s-]*123[\s-]*45[\s-]*67/,
    /\b(?:medlife|medfile|docplanner|booksy)\b/i,
    /\b(?:iframe|api endpoint|secure proxy|allowed origin|widget rezerwacji)\b/i,
  ];

  if (configModule.isLocalDemoPreview || configModule.displayCompanyData) {
    fail("Eksport statyczny nie może uruchamiać displayCompanyData lokalnego demo.");
  }
  if (!config.publicDataVerified && configModule.isMedfileBookingReady) {
    fail("Niezweryfikowane dane publiczne nie mogą aktywować rezerwacji Medfile.");
  }
  if (
    config.publicDataVerified &&
    hasText(config.bookingWidget.publicBookingUrl) &&
    !configModule.isMedfileBookingReady
  ) {
    fail("Zweryfikowane dane z niepoprawnym publicBookingUrl nie mogą przejść eksportu.");
  }

  for (const file of exportedFiles) {
    const output = readFileSync(file, "utf8");
    for (const value of Object.values(localDemoData ?? {})) {
      if (hasText(value) && output.includes(value)) {
        fail(`Dane demonstracyjne wyciekły do eksportu: ${relative(root, file)}`);
        break;
      }
    }
  }

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const markup = renderedMarkup(html);
    const route = routeForFile(file);
    const label = relative(root, file);
    const isSystemFallback =
      route.includes("__unpublished-") ||
      route === "/404.html" ||
      route === "/404/" ||
      route === "/_not-found/";

    for (const pattern of forbiddenOutputPatterns) {
      if (pattern.test(html)) {
        fail(`Niedozwolona dana lub opis techniczny w eksporcie: ${label} (${pattern})`);
      }
    }
    if (!config.publicDataVerified && /(?:href=["']tel:|href=["']mailto:)/i.test(html)) {
      fail(`Niezweryfikowane dane publiczne nie mogą tworzyć tel:/mailto: w ${label}`);
    }
    if (
      config.demoMode &&
      /(?:\b300\s*zł\b|\b200\s*zł\b|Cennik demonstracyjny wersji próbnej)/i.test(markup)
    ) {
      fail(`Eksport nie może zawierać demonstracyjnego cennika: ${label}`);
    }

    const robots = [...html.matchAll(/<meta\b[^>]*>/gi)]
      .filter((tag) => getAttribute(tag[0], "name")?.toLowerCase() === "robots")
      .map((tag) => getAttribute(tag[0], "content")?.toLowerCase() ?? "");
    if (!config.publicDataVerified && !robots.some((value) => value.includes("noindex"))) {
      fail(`Brak noindex przy niezweryfikowanych danych: ${label}`);
    }

    const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].find(
      (tag) => getAttribute(tag[0], "rel")?.toLowerCase() === "canonical",
    )?.[0];
    const canonical = canonicalTag && getAttribute(canonicalTag, "href");
    if (!isSystemFallback && !canonical) {
      fail(`Brak canonical w ${label}`);
    }

    const anchors = [...markup.matchAll(/<a\b[^>]*>/gi)];
    if (!isSystemFallback) {
      const pageText = visibleText(markup);
      for (const article of nonPublicArticles) {
        if (pageText.includes(article.title.replace(/\s+/g, " ").trim())) {
          fail(`Tytuł niepublicznego artykułu jest widoczny w eksporcie: ${label} (${article.slug})`);
        }
        if (markup.includes(article.slug)) {
          fail(`Slug niepublicznego artykułu jest widoczny w eksporcie: ${label} (${article.slug})`);
        }
      }
    }

    for (const anchor of anchors) {
      const href = getAttribute(anchor[0], "href");
      if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) {
        continue;
      }

      let url;
      try {
        url = new URL(href, `${websiteUrl.origin}${basePath}${route}`);
      } catch {
        fail(`Nieprawidłowy link wewnętrzny w ${label}: ${href}`);
        continue;
      }
      if (url.origin !== websiteUrl.origin) {
        continue;
      }
      if (basePath && url.pathname !== basePath && !url.pathname.startsWith(`${basePath}/`)) {
        fail(`Link wewnętrzny pomija basePath w ${label}: ${href}`);
        continue;
      }

      const internalPath = basePath
        ? url.pathname.slice(basePath.length) || "/"
        : url.pathname || "/";
      if (
        !isSystemFallback &&
        nonPublicArticles.some(
          (article) => internalPath.replace(/\/$/, "") === `/wiedza/${article.slug}`,
        )
      ) {
        fail(`Link do niepublicznego artykułu w eksporcie: ${label} -> ${href}`);
      }
      if (!internalPath.startsWith("/_next/") && !pageFileExists(internalPath)) {
        fail(`Link wewnętrzny nie rozwiązuje się w eksporcie: ${label} -> ${href}`);
      }
    }
  }

  for (const article of nonPublicArticles) {
    for (const file of exportedArticleFiles(article.slug)) {
      const html = readFileSync(file, "utf8");
      const isNotFound =
        /<html\b[^>]*\bid=["']__next_error__["']/i.test(html) ||
        /NEXT_HTTP_ERROR_FALLBACK;404/.test(html);
      if (!isNotFound) {
        fail(`Niepubliczny artykuł ma wyeksportowaną stronę z treścią: ${relative(root, file)}`);
      }
    }
  }

  const expectedRoutes = ["/", "/wiedza/", "/informacja-dla-pacjenta/"];
  for (const route of expectedRoutes) {
    if (!pageFileExists(route)) {
      fail(`Brak wymaganej strony w eksporcie: ${route}`);
    }
  }

  const knowledgeIndex = join(outDirectory, "wiedza", "index.html");
  if (existsSync(knowledgeIndex) && knowledge.publicKnowledgeArticles.length === 0) {
    const markup = renderedMarkup(readFileSync(knowledgeIndex, "utf8"));
    if (!visibleText(markup).includes("Materiały dla pacjentów zostaną opublikowane przed uruchomieniem placówki.")) {
      fail("/wiedza nie ma neutralnego pustego stanu.");
    }
    if (/W tym temacie|\/wiedza\/tematy\//.test(markup)) {
      fail("/wiedza nie może wyświetlać kart tematów bez publicznych artykułów.");
    }
  }

  if (!config.publicDataVerified) {
    const sitemapFile = join(outDirectory, "sitemap.xml");
    if (existsSync(sitemapFile) && /<loc\b/i.test(readFileSync(sitemapFile, "utf8"))) {
      fail("Sitemap musi pozostać pusta przy niezweryfikowanych danych publicznych.");
    }
    const robotsFile = join(outDirectory, "robots.txt");
    if (existsSync(robotsFile) && !/Disallow:\s*\//i.test(readFileSync(robotsFile, "utf8"))) {
      fail("robots.txt musi blokować indeksację przy niezweryfikowanych danych publicznych.");
    }
  }

  const redirectFile = join(outDirectory, "informacja-dla-pacjenta", "index.html");
  if (existsSync(redirectFile)) {
    const html = readFileSync(redirectFile, "utf8");
    const target = `${basePath}/jak-wyglada-wizyta`;
    if (!html.includes(target) || !/(?:refresh|redirect|NEXT_REDIRECT|permanentRedirect)/i.test(html)) {
      fail("/informacja-dla-pacjenta nie realizuje redirectu do /jak-wyglada-wizyta.");
    }
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].find(
      (tag) => getAttribute(tag[0], "rel")?.toLowerCase() === "canonical",
    )?.[0];
    if (getAttribute(canonical ?? "", "href") !== `${config.websiteUrl.replace(/\/$/, "")}/jak-wyglada-wizyta/`) {
      fail("Redirect /informacja-dla-pacjenta musi mieć canonical docelowej strony.");
    }
  }
}

if (failures.length > 0) {
  console.error("Walidacja eksportu: FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Walidacja eksportu: PASS");
  console.log("Sprawdzono HTML, redirect, canonicale, robots i linki z basePath.");
}
