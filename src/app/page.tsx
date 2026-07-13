import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CTAButton } from "@/components/CTAButton";
import { FAQ } from "@/components/FAQ";
import { HeroMedia } from "@/components/HeroMedia";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { PriceTable } from "@/components/PriceTable";
import { ProcessSlider } from "@/components/ProcessSlider";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { isDemoPreview, isPublicDataVerified } from "@/config/companyConfig";
import { visibleKnowledgeArticles } from "@/lib/knowledge";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <div className="home-page">
      <ProcessSlider medicalNotice={<ComplianceNotice compact />} />

      <section className="hero-shell hero-support" id="hero">
        <div aria-hidden="true" className="hero-shell__hairline" />
        <div className="site-shell hero-shell__grid">
          <div className="hero-copy">
            <Reveal delay={60}>
              <p className="eyebrow">Warszawa · Wizyta stacjonarna</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display-heading hero-title">Wizyta w gabinecie</h2>
            </Reveal>
            <Reveal delay={190}>
              <p className="hero-lede">
                Podczas stacjonarnej wizyty lekarz ocenia zasadność i
                bezpieczeństwo terapii kannabinoidowej, analizuje dokumentację
                i omawia możliwe dalsze postępowanie.
              </p>
            </Reveal>
            <StaggerGroup className="hero-actions" step={90}>
              {isPublicDataVerified ? (
                <CTAButton href="/kontakt">Kontakt w sprawie terminu</CTAButton>
              ) : null}
              <CTAButton href="/jak-wyglada-wizyta" variant="secondary">
                Jak przebiega konsultacja
              </CTAButton>
            </StaggerGroup>
          </div>

          <Reveal className="hero-visual-column" delay={240} distance={12}>
            <div className="hero-visual-frame">
              <HeroMedia
                src={`${publicBasePath}/images/medical-office-hero-soft.jpg`}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section price-section" id="cennik">
        <div className="site-shell price-layout">
          <Reveal className="price-intro">
            <p className="eyebrow">Przejrzyste informacje</p>
            <h2 className="display-heading section-title">Cennik konsultacji</h2>
            <p className="section-lede">
              Informacje dotyczą stacjonarnych konsultacji lekarskich oraz ich
              zakresu organizacyjnego.
            </p>
            <CTAButton href="/cennik" variant="secondary">
              Zobacz pełny cennik
            </CTAButton>
          </Reveal>
          <Reveal className="price-table-wrap" delay={120} distance={12}>
            <PriceTable />
          </Reveal>
        </div>
      </section>

      <section className="home-section faq-contact-section" id="faq">
        <div className="site-shell faq-contact-layout">
          <div className="faq-column">
            <Reveal>
              <p className="eyebrow">Najczęstsze pytania</p>
              <h2 className="display-heading section-title">
                Ważne informacje przed kontaktem
              </h2>
              <p className="section-lede">
                Odpowiedzi na praktyczne pytania o organizację konsultacji i
                kontakt z placówką.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <FAQ limit={4} />
              <CTAButton className="section-link" href="/faq" variant="secondary">
                Zobacz wszystkie odpowiedzi
              </CTAButton>
            </Reveal>
          </div>

          <Reveal className="contact-panel" delay={170} distance={12}>
            <p className="eyebrow">Przygotowanie do wizyty</p>
            <h2 className="display-heading contact-panel__title">
              Jak przebiega konsultacja
            </h2>
            <p className="contact-panel__text">
              Sprawdź kolejne etapy wizyty i informacje, które warto mieć pod
              ręką przed spotkaniem z lekarzem.
            </p>
            <div className="contact-panel__actions">
              <CTAButton href="/jak-wyglada-wizyta">
                Zobacz przebieg konsultacji
              </CTAButton>
              {isPublicDataVerified ? (
                <CTAButton href="/kontakt" variant="secondary">
                  Kontakt w sprawie terminu
                </CTAButton>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section knowledge-section" id="wiedza">
        <div className="site-shell">
          <div className="knowledge-heading">
            <Reveal>
              <p className="eyebrow">Wiedza dla pacjenta</p>
              <h2 className="display-heading section-title">
                Informacja oparta na źródłach
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="section-lede">
                Materiały pomagają przygotować pytania do rozmowy z lekarzem.
                Nie zastępują osobistego badania ani indywidualnej decyzji
                medycznej.
              </p>
            </Reveal>
          </div>
          {visibleKnowledgeArticles.length > 0 ? (
            <StaggerGroup className="knowledge-grid" step={100}>
              {visibleKnowledgeArticles.map((article) => (
                <KnowledgeCard
                  article={article}
                  key={article.slug}
                  preview={isDemoPreview}
                />
              ))}
            </StaggerGroup>
          ) : (
            <Reveal className="knowledge-grid" delay={140}>
              <p className="section-lede">
                Materiały dla pacjentów zostaną opublikowane przed uruchomieniem
                placówki.
              </p>
            </Reveal>
          )}
          <Reveal delay={160}>
            <CTAButton className="section-link" href="/wiedza" variant="secondary">
              Przejdź do centrum wiedzy
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
