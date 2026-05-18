/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */

const useBonsaiTweaks = typeof useTweaks === "function"
  ? useTweaks
  : (defaults) => ({ ...defaults, setTweak: () => {} });
const BonsaiTweaksPanel = typeof TweaksPanel === "function" ? TweaksPanel : () => null;
const BonsaiTweakSection = typeof TweakSection === "function" ? TweakSection : ({ children }) => <>{children}</>;
const BonsaiTweakRadio = typeof TweakRadio === "function" ? TweakRadio : () => null;
const BonsaiTweakColor = typeof TweakColor === "function" ? TweakColor : () => null;
const BonsaiTweakToggle = typeof TweakToggle === "function" ? TweakToggle : () => null;

function App() {
  const t = useBonsaiTweaks(/*EDITMODE-BEGIN*/{
    "accent": "#16C08C",
    "headlineStyle": "Spanish",
    "showLiveOS": true,
    "denseHero": false
  }/*EDITMODE-END*/);

  // Apply accent live
  React.useEffect(() => {
    document.documentElement.style.setProperty("--green", t.accent);
    // derived darker
    const dark = t.accent === "#16C08C" ? "#11a378"
              : t.accent === "#C9A14A" ? "#a8852f"
              : t.accent === "#E07A5F" ? "#b85a3a"
              : t.accent === "#4F8FB5" ? "#3a6f8f"
              : "#11a378";
    document.documentElement.style.setProperty("--green-2", dark);
  }, [t.accent]);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero variant={t.headlineStyle} dense={t.denseHero} />
        <TrustedBy />
        <DivisionsSection />
        <BrandReelSection />
        <ProblemsSection />
        <SolutionsTransition />
        <ServicesSection />
        <IndustriesSection />
        <BonsaiOSSection />
        <UseCasesSection />
        <TestimonialsSection />
        <VideoTestimonials />
        <PricingCalculator />
        <ProcessSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <StickyCTA />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />

      <BonsaiTweaksPanel title="Tweaks">
        <BonsaiTweakSection title="Color">
          <BonsaiTweakColor
            label="Color de acento"
            value={t.accent}
            onChange={(v) => t.setTweak("accent", v)}
            options={["#16C08C", "#C9A14A", "#E07A5F", "#4F8FB5"]}
          />
        </BonsaiTweakSection>
        <BonsaiTweakSection title="Hero">
          <BonsaiTweakRadio
            label="Headline"
            value={t.headlineStyle}
            onChange={(v) => t.setTweak("headlineStyle", v)}
            options={[
              { label: "Español", value: "Spanish" },
              { label: "English", value: "English" },
            ]}
          />
          <BonsaiTweakToggle
            label="Hero denso"
            value={t.denseHero}
            onChange={(v) => t.setTweak("denseHero", v)}
          />
        </BonsaiTweakSection>
      </BonsaiTweaksPanel>
    </>
  );
}

// Patch Hero to receive variants
const OriginalHero = window.Hero;
window.Hero = function HeroVariants({ variant = "Spanish", dense = false }) {
  if (variant === "English") {
    return <HeroEnglish dense={dense} />;
  }
  return <OriginalHero />;
};

function HeroEnglish() {
  return (
    <section className="hero">
      <div className="subtle-grid" />
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">AI-native studio · Asunción / LATAM</span>
          <h1 className="h-display">
            We turn manual operations into <em>intelligent systems</em>.
          </h1>
          <p className="lead">
            We design software, automations and AI agents for companies that want to
            operate with more clarity, speed and control.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contacto">
              Book a diagnostic
              <Icon.Arrow width="16" height="16" />
            </a>
            <a className="btn btn-ghost" href="#servicios">See solutions</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="v">6</div>
              <div className="k">Specialized services</div>
            </div>
            <div>
              <div className="v">10–15<span style={{fontSize:14,fontWeight:500,opacity:.6,marginLeft:6}}>days</span></div>
              <div className="k">First sprint to production</div>
            </div>
            <div>
              <div className="v">6</div>
              <div className="k">Industries served</div>
            </div>
          </div>
        </div>
        <OSPreview />
      </div>
    </section>
  );
}

// Re-export OSPreview to global so HeroEnglish can use it (it's defined inside nav-hero.jsx scope)
// We need OSPreview globally. Let me ensure it's exposed.
// (Done implicitly because it lives in same script; but we add safeguard:)
if (typeof OSPreview === "undefined") {
  // fallback – nothing
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
