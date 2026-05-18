/* global */
/* Bonsai — i18n: minimal client-side translation layer.
   Exposes window.i18n with t(key), getLang(), setLang(lang).
   Persists in localStorage. Triggers a "i18nchange" event on change.
*/

(function () {
  const STORAGE_KEY = "bonsai-lang";
  const DEFAULT = "es";

  const DICT = {
    es: {
      // Nav
      "nav.divisions":   "Divisiones",
      "nav.services":    "Servicios",
      "nav.industries":  "Industrias",
      "nav.os":          "Bonsai OS",
      "nav.faq":         "FAQ",
      "nav.about":       "Sobre nosotros",
      "nav.blog":        "Blog",
      "nav.cta":         "Diagnóstico 60 min",

      // Hero
      "hero.eyebrow":    "Consultora AI-native · Asunción / LATAM",
      "hero.title.a":    "Convertimos operaciones manuales en",
      "hero.title.em":   "sistemas inteligentes",
      "hero.title.b":    ".",
      "hero.lead":       "Diseñamos software, automatizaciones y agentes de IA para empresas que quieren operar con más claridad, velocidad y control.",
      "hero.cta.primary":"Agendar diagnóstico 60 min",
      "hero.cta.ghost":  "Ver soluciones",
      "hero.stat.1.k":   "Servicios especializados",
      "hero.stat.2.v":   "10–15 días",
      "hero.stat.2.k":   "Primer sprint a producción",
      "hero.stat.3.k":   "Industrias atendidas",

      // Sticky / UX
      "sticky.text":     "¿Listo para empezar?",
      "sticky.cta":      "Diagnóstico 60 min",
      "back.top":        "Volver al inicio",
      "skip.link":       "Saltar al contenido",

      // Footer
      "foot.tagline":    "Consultora AI-native con cuatro divisiones: Development, Web, Mkt Agency y Business. Software que crece con estructura.",
      "foot.divisions":  "Divisiones",
      "foot.dev":        "Servicios · Development",
      "foot.contact":    "Contacto",
    },

    en: {
      // Nav
      "nav.divisions":   "Divisions",
      "nav.services":    "Services",
      "nav.industries":  "Industries",
      "nav.os":          "Bonsai OS",
      "nav.faq":         "FAQ",
      "nav.about":       "About",
      "nav.blog":        "Blog",
      "nav.cta":         "60-min diagnostic",

      // Hero
      "hero.eyebrow":    "AI-native consultancy · Asunción / LATAM",
      "hero.title.a":    "We turn manual operations into",
      "hero.title.em":   "intelligent systems",
      "hero.title.b":    ".",
      "hero.lead":       "We design software, automations and AI agents for companies that want to operate with more clarity, speed and control.",
      "hero.cta.primary":"Book a 60-min diagnostic",
      "hero.cta.ghost":  "See solutions",
      "hero.stat.1.k":   "Specialized services",
      "hero.stat.2.v":   "10–15 days",
      "hero.stat.2.k":   "First sprint to production",
      "hero.stat.3.k":   "Industries served",

      // Sticky / UX
      "sticky.text":     "Ready to start?",
      "sticky.cta":      "60-min diagnostic",
      "back.top":        "Back to top",
      "skip.link":       "Skip to content",

      // Footer
      "foot.tagline":    "AI-native consultancy with four divisions: Development, Web, Mkt Agency and Business. Software that grows with structure.",
      "foot.divisions":  "Divisions",
      "foot.dev":        "Development services",
      "foot.contact":    "Contact",
    },
  };

  let currentLang = (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) || DEFAULT;
  if (!DICT[currentLang]) currentLang = DEFAULT;

  function t(key) {
    return (DICT[currentLang] && DICT[currentLang][key]) || (DICT[DEFAULT] && DICT[DEFAULT][key]) || key;
  }

  function getLang() { return currentLang; }

  function setLang(lang) {
    if (!DICT[lang]) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    window.dispatchEvent(new CustomEvent("i18nchange", { detail: { lang } }));
  }

  // Apply lang attr on init
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", currentLang);
  }

  window.i18n = { t, getLang, setLang, DICT };
})();
