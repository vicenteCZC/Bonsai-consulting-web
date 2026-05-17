/* global React, ReactDOM */
/* Industry page — parameterized via window.INDUSTRY_SLUG */

const { useState: useSI, useEffect: useEI } = React;

const INDUSTRIES = {
  agro: {
    name: "Agroindustrial",
    eyebrow: "Sector · Agroindustrial · LATAM",
    tagline: "Operaciones rentables con arquitecturas frágiles.",
    lead: "El sector agro tiene márgenes excepcionales y modelos de inversión sofisticados — pero la mayoría de las empresas familiares opera con planillas, decisiones del fundador y arquitecturas patrimoniales improvisadas. Bonsai construye los sistemas que el sector necesita para escalar sin romperse.",
    accent: "#16C08C",
    iconColor: "#A7B89A",
    problems: [
      "Cierres financieros manuales que dependen de una sola persona.",
      "Modelo de inversión por unidad productiva (camión, hectárea, planta) sin trazabilidad.",
      "Flujos personales y empresariales mezclados sin arquitectura patrimonial.",
      "Decisiones de compra de maquinaria sin DSCR ni stress scenarios actualizados.",
      "Reportes a inversionistas o bancos hechos a mano cada mes.",
      "Cosechas, costos y márgenes proyectados en planillas que viven en versiones.",
    ],
    solutions: [
      { h: "Board pack en vivo", d: "EBITDA, FCF, DSCR, ROIC por unidad productiva — siempre actualizados desde tus fuentes." },
      { h: "Modelo 10y por unidad", d: "ROI por hectárea, por camión, por planta. Stress scenarios con un clic." },
      { h: "Arquitectura patrimonial", d: "Holding personal + vehículos. Regla del 30% automática mes a mes." },
      { h: "Trazabilidad de cosecha", d: "Datos consolidados desde campo, contabilidad y banco en una sola capa." },
      { h: "Reportes a inversores", d: "Board packs generados solos cada mes. PDF firmable o dashboard vivo." },
      { h: "Decisiones de capex", d: "Reglas claras: comprar cuando DSCR > 2.2, liquidez > 1 año, retorno > 18%." },
    ],
    caseSlug: "agroindustrial",
    caseHero: "De planillas dispersas a board pack en vivo",
    metrics: [
      { k: "Margen op. típico",  v: "32–38%" },
      { k: "DSCR objetivo",      v: ">2.0×"  },
      { k: "ROI hectárea",       v: "30–35%" },
      { k: "ROI camión",         v: "28–32%" },
    ],
    services: ["Bonsai Business", "Bonsai Development"],
  },
  restaurantes: {
    name: "Restaurantes",
    eyebrow: "Sector · Gastronomía · LATAM",
    tagline: "Operación intensiva. Margen invisible.",
    lead: "El sector gastronómico vive de la operación diaria — pero la mayoría de las cadenas premium no sabe su margen real por canal, por plato o por sucursal hasta semanas después. Bonsai conecta caja, plataformas y costos para que el margen sea visible en tiempo real.",
    accent: "#16C08C",
    iconColor: "#C9A14A",
    problems: [
      "Conciliación manual de plataformas de delivery (Uber, Rappi, PedidosYa) cada semana.",
      "Comisiones de plataformas pagadas sin verificación cruzada.",
      "Costo real por plato desconocido hasta cierre mensual.",
      "Reportes por sucursal hechos a mano, sin consolidación.",
      "Inventario y mermas controlados en planillas independientes.",
      "Decisiones de pricing tomadas sin data de margen actualizada.",
    ],
    solutions: [
      { h: "Conciliación auto delivery", d: "Motor que cruza pedido, plataforma y depósito bancario. Diferencias detectadas en tiempo real." },
      { h: "Margen real por plato", d: "Conexión de costos, precios y volumen. Dashboard de plato más rentable por canal." },
      { h: "Dashboard multisucursal", d: "Consolidación automática. Comparativa por sucursal, día y canal." },
      { h: "Control de inventario", d: "Sistema de mermas con alertas. Reducción medible del waste mensual." },
      { h: "Pricing dinámico", d: "Reglas de precio por canal según costo + margen objetivo." },
      { h: "Alertas operativas", d: "Notificaciones automáticas cuando un canal baja del umbral de margen." },
    ],
    caseSlug: "restaurante",
    caseHero: "Conciliación automática de delivery — 120 hs/mes ahorradas",
    metrics: [
      { k: "Horas ahorradas",   v: "~120/mes" },
      { k: "Diferencias delivery", v: "5–10%" },
      { k: "ROI sprint típico", v: "8–12× / 12m" },
      { k: "Plataformas soportadas", v: "4+" },
    ],
    services: ["Bonsai Development"],
  },
};

function IndustryPage() {
  const slug = window.INDUSTRY_SLUG;
  const ind = INDUSTRIES[slug];

  useEI(() => {
    if (ind) document.title = `Bonsai para ${ind.name} — Bonsai Consulting`;
  }, []);

  if (!ind) {
    return (
      <main id="main">
        <section className="s" style={{paddingTop: 120, textAlign: "center"}}>
          <div className="wrap">
            <h1 className="h-display">Industria no encontrada</h1>
            <a href="../index.html" className="btn btn-primary" style={{marginTop: 24}}>Volver</a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <IndustryNav active={slug} />
      <main id="main">
        <section className="case-hero">
          <div className="subtle-grid" />
          <div className="wrap">
            <a href="../index.html" className="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
              Volver a Bonsai Consulting
            </a>
            <span className="eyebrow">{ind.eyebrow}</span>
            <h1 className="h-display case-title">
              Bonsai para <em>{ind.name}</em>.
            </h1>
            <p className="case-subtitle">{ind.lead}</p>

            <div className="case-meta" style={{marginTop: 36}}>
              {ind.metrics.map((m, i) => (
                <div key={i}>
                  <span className="m-k">{m.k}</span>
                  <span className="m-v">{m.v}</span>
                </div>
              ))}
            </div>

            <div className="hero-ctas" style={{marginTop: 32}}>
              <a className="btn btn-primary" href="../agendar.html">
                Agendar diagnóstico para {ind.name}
                <Icon.Arrow width="16" height="16" />
              </a>
              <a className="btn btn-ghost" href={`../cases/${ind.caseSlug}.html`}>
                Ver caso real
              </a>
            </div>
          </div>
        </section>

        <section className="s" id="problemas" style={{paddingTop: 96}}>
          <div className="wrap">
            <div className="s-head">
              <div>
                <span className="eyebrow">Problemas típicos del sector</span>
                <h2 className="h-display" style={{marginTop:18}}>
                  Lo que vemos antes de cada compromiso.
                </h2>
              </div>
              <p className="lead">
                Patrones que se repiten en empresas de {ind.name.toLowerCase()} con
                operación real. Si reconocés tres de estos, hay terreno fértil para empezar.
              </p>
            </div>
            <div className="div-problems-grid">
              {ind.problems.map((p, i) => (
                <div className="div-problem" key={i}>
                  <span className="num">{String(i+1).padStart(2,"0")}</span>
                  <span className="text">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s" id="soluciones" style={{paddingTop: 96, background: "var(--stone-2)"}}>
          <div className="wrap">
            <div className="s-head">
              <div>
                <span className="eyebrow">Cómo trabajamos {ind.name.toLowerCase()}</span>
                <h2 className="h-display" style={{marginTop:18}}>
                  Sistemas específicos para tu operación.
                </h2>
              </div>
              <p className="lead">
                Cada solución es un sistema en producción, no una recomendación en PDF.
                Adaptados a la dinámica del sector.
              </p>
            </div>
            <div className="caps">
              {ind.solutions.map((s, i) => (
                <article className="cap" key={i}>
                  <div className="ico" style={{background: ind.iconColor + "33", color: ind.accent}}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <h3>{s.h}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="s" style={{paddingTop: 96}}>
          <div className="wrap">
            <span className="eyebrow">Caso real en este sector</span>
            <h2 className="h-display" style={{marginTop:14, fontSize:34, marginBottom: 24}}>
              Ya hicimos esto para {ind.name.toLowerCase()}.
            </h2>
            <a className="case-card-big" href={`../cases/${ind.caseSlug}.html`} style={{display:"grid"}}>
              <div className="case-card-cover" style={{background: ind.accent}}>
                <span className="case-card-tag" style={{color: "#0F2D20", background:"rgba(0,0,0,0.12)"}}>{ind.eyebrow}</span>
                <div className="case-card-mark" style={{background:"rgba(15,45,32,0.15)", borderColor:"rgba(15,45,32,0.3)"}}>
                  <BonsaiMark size={28} color="#0F2D20" />
                </div>
              </div>
              <div className="case-card-body">
                <h2>{ind.caseHero}</h2>
                <p>Métricas reales documentadas. Sprints cerrados, sistemas en producción.</p>
                <div className="case-card-services">
                  {ind.services.map((s, i) => (<span key={i}>{s}</span>))}
                </div>
              </div>
            </a>
          </div>
        </section>

        <section className="s" id="contacto" style={{paddingTop: 96, paddingBottom: 64}}>
          <div className="wrap">
            <div className="cta-banner">
              <div>
                <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Para {ind.name.toLowerCase()}</span>
                <h2 style={{
                  marginTop:14, fontFamily:"var(--font-display)",
                  fontSize:"clamp(28px, 3.4vw, 40px)",
                  letterSpacing:"-0.02em", color:"var(--stone)", lineHeight:1.05,
                }}>
                  60 minutos. Un diagnóstico del sector.
                </h2>
                <p>
                  Agendá una sesión específica para tu industria. Salís con un mapa
                  de procesos del sector y una propuesta concreta.
                </p>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start"}}>
                <a className="btn btn-primary" href="../agendar.html">
                  Agendar diagnóstico <Icon.Arrow width="16" height="16" />
                </a>
                <a className="btn btn-ghost" style={{color:"var(--stone)", borderColor:"rgba(255,255,255,0.18)"}} href="../index.html#divisiones">
                  Ver divisiones
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <BackToTop />
    </>
  );
}

function IndustryNav({ active }) {
  const [open, setOpen] = useSI(false);
  useEI(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <nav className="nav" aria-label="Principal">
      <div className="wrap nav-inner">
        <a className="brand" href="../index.html"><span className="mark" aria-hidden="true"><BonsaiMark size={18} color="#16C08C" /></span>Bonsai Consulting</a>
        <div className="nav-links">
          <a href="../index.html#divisiones">Divisiones</a>
          <a href="../cases/index.html">Casos</a>
          <a href="../sobre.html">Sobre</a>
          <a href="../blog/index.html">Blog</a>
        </div>
        <a className="nav-cta" href="../agendar.html"><span className="dot" aria-hidden="true" />Agendar diagnóstico</a>
        <button className={"nav-burger" + (open ? " open" : "")} onClick={() => setOpen(v => !v)} aria-label="Menú"><span /><span /><span /></button>
      </div>
      <div className={"mobile-nav" + (open ? " open" : "")}>
        <div className="mobile-nav-inner">
          <a href="../index.html" onClick={() => setOpen(false)}>Home</a>
          <a href="../cases/index.html" onClick={() => setOpen(false)}>Casos</a>
          <a href="../sobre.html" onClick={() => setOpen(false)}>Sobre</a>
          <a href="../blog/index.html" onClick={() => setOpen(false)}>Blog</a>
          <a href="../agendar.html" className="mobile-cta" onClick={() => setOpen(false)}>Agendar diagnóstico <Icon.Arrow width="16" height="16" /></a>
        </div>
      </div>
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<IndustryPage />);
