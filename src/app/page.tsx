import Image from "next/image";
import { BookingWidgetSlot } from "@/components/BookingWidgetSlot";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CTAButton } from "@/components/CTAButton";
import { FAQ } from "@/components/FAQ";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { PriceTable } from "@/components/PriceTable";
import { ProcessSlider } from "@/components/ProcessSlider";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { companyConfig } from "@/config/companyConfig";
import { knowledgeArticles } from "@/lib/knowledge";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const phoneHref = `tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`;

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-shell" id="hero">
        <div aria-hidden="true" className="hero-shell__hairline" />
        <div className="site-shell hero-shell__grid">
          <div className="hero-copy">
            <Reveal delay={60}>
              <p className="eyebrow">Warszawa · Wizyta stacjonarna</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display-heading hero-title">
                Konsultacje lekarskie w Warszawie
              </h1>
            </Reveal>
            <Reveal delay={190}>
              <p className="hero-lede">
                Kwalifikacja do terapii kannabinoidowej odbywa się podczas
                wizyty stacjonarnej w gabinecie. Tu znajdują się informacje
                organizacyjne i możliwość kontaktu w sprawie terminu.
              </p>
            </Reveal>
            <StaggerGroup className="hero-actions" step={90}>
              <CTAButton href="/kontakt">Zarezerwuj wizytę stacjonarną</CTAButton>
              <CTAButton href="/jak-wyglada-wizyta" variant="secondary">
                Jak wygląda wizyta
              </CTAButton>
            </StaggerGroup>
            <Reveal delay={360}>
              <p className="hero-quiet-note">
                <span aria-hidden="true" className="hero-quiet-note__mark" />
                Decyzję medyczną podejmuje lekarz po osobistym badaniu.
              </p>
            </Reveal>
          </div>

          <Reveal className="hero-visual-column" delay={240} distance={12}>
            <div className="hero-visual-frame">
              <div className="hero-media">
                <Image
                  alt="Jasny gabinet lekarski przygotowany do konsultacji stacjonarnej"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={`${publicBasePath}/images/medical-office-hero-soft.jpg`}
                />
                <div className="hero-media__veil" />
                <div className="hero-media__label">
                  <span>Gabinet</span>
                  Konsultacja na miejscu
                </div>
                <p className="hero-media__caption">
                  Przestrzeń przygotowana do spokojnej rozmowy z lekarzem
                </p>
              </div>
              <div className="hero-booking">
                <BookingWidgetSlot compact />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="compliance-band" aria-label="Ważna informacja medyczna">
        <div className="site-shell compliance-band__inner">
          <span className="compliance-band__label">Ważne przed kontaktem</span>
          <ComplianceNotice compact className="compliance-band__notice" />
        </div>
      </section>

      <ProcessSlider />

      <section className="home-section price-section" id="cennik">
        <div className="site-shell price-layout">
          <Reveal className="price-intro">
            <p className="eyebrow">Przejrzyste warunki</p>
            <h2 className="display-heading section-title">Cennik konsultacji</h2>
            <p className="section-lede">
              Stawki dotyczą czasu lekarza, badania i rozmowy podczas wizyty.
              Nie są opłatą za określony wynik decyzji medycznej.
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
                Odpowiedzi o organizacji wizyty, formularzu i roli decyzji
                lekarza.
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
            <p className="eyebrow">Kontakt</p>
            <h2 className="display-heading contact-panel__title">
              Skontaktuj się w sprawie terminu
            </h2>
            <p className="contact-panel__text">
              Kontakt przez stronę służy wyłącznie sprawom organizacyjnym.
              Informacje medyczne są omawiane podczas wizyty albo przekazywane
              przez zabezpieczony system dokumentacji medycznej.
            </p>
            <div className="contact-panel__actions">
              <CTAButton href="/kontakt">Przejdź do kontaktu</CTAButton>
              <CTAButton href={phoneHref} variant="secondary">
                {companyConfig.phone}
              </CTAButton>
            </div>
            <ComplianceNotice compact className="contact-panel__notice" />
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
          <StaggerGroup className="knowledge-grid" step={100}>
            {knowledgeArticles.slice(0, 3).map((article) => (
              <KnowledgeCard article={article} key={article.slug} />
            ))}
          </StaggerGroup>
          <Reveal delay={160}>
            <CTAButton className="section-link" href="/wiedza" variant="secondary">
              Zobacz wszystkie materiały
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
