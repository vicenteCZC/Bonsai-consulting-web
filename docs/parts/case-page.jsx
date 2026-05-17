/* global React, ReactDOM */
/* Case study page — reads window.CASE_SLUG and renders the matching detailed case study. */

const { useState: useSC, useEffect: useEC } = React;

const CASES = {
  agroindustrial: {
    tag: "Agroindustrial · 10y horizon",
    title: "De planillas dispersas a board pack en vivo",
    subtitle: "Un cliente del sector agroindustrial paraguayo, con margen del 37.6% y FCF anual de Gs. 1.99MM, pasó de cierres manuales mensuales a un tablero financiero en vivo con stress scenarios y arquitectura patrimonial.",
    hero: {
      industry: "Agroindustrial",
      size: "80+ FTE · 3 unidades productivas",
      duration: "Sprint extendido · 6 semanas",
      service: "Bonsai Development + Business",
    },
    challenge: [
      "Operación rentable pero dependiente del fundador.",
      "Cierres mensuales manuales que llevaban 4–5 días.",
      "Flujos personales y empresariales mezclados, sin arquitectura patrimonial.",
      "Ausencia de board pack ejecutivo — el directorio decidía sobre data de 30 días atrás.",
      "Stress scenarios proyectados en Excel, una sola persona los entendía.",
    ],
    solution: [
      "Mapeo end-to-end de procesos financieros con dueños y CFO.",
      "Diseño de arquitectura patrimonial con holding personal y vehículos.",
      "Construcción de board pack en vivo con ingresos, FCF, DSCR, ROIC y stress scenarios.",
      "Regla automática de transferencia del 30% del cashflow mensual al holding.",
      "Modelo proyectado a 10 años con escenarios agresivo y conservador.",
    ],
    results: [
      { k: "Margen operativo",    v: "37.6%",      d: "Sostenido" },
      { k: "FCF anual",           v: "Gs. 1.99MM", d: "Documentado" },
      { k: "DSCR implícito",      v: ">2.5×",      d: "Liquidez sólida" },
      { k: "ROIC estimado",       v: "32–38%",     d: "Por unidad" },
      { k: "ROI por hectárea",    v: "34.3% a.",   d: "Modelado 10y" },
      { k: "ROI por camión",      v: "31.2% a.",   d: "Modelado 10y" },
      { k: "Tiempo cierre mes",   v: "−80%",       d: "De 5 días a 1" },
      { k: "Regla holding",       v: "Activa",     d: "30% automático" },
    ],
    quote: "El riesgo no era financiero. Era arquitectónico. Bonsai nos hizo verlo y nos dio la estructura para resolverlo.",
    quoteAuthor: "Fundador · Agroindustrial paraguaya",
    timeline: [
      { week: "Semana 1", h: "Diagnóstico ejecutivo", d: "Sesiones con dueños, mapeo de procesos y consolidación de fuentes de datos." },
      { week: "Semana 2", h: "Diseño financiero",     d: "Modelo a 10 años, arquitectura patrimonial documentada, board pack diseñado." },
      { week: "Semanas 3–5", h: "Construcción",       d: "Implementación del tablero, integraciones con contabilidad y banco, automatización de transferencias." },
      { week: "Semana 6", h: "Go-live y handoff",     d: "Capacitación del directorio y CFO, primera sesión de board review con datos en vivo." },
    ],
    services: ["Bonsai Development", "Bonsai Business"],
    relatedPosts: ["regla-30-cashflow-holding", "la-arquitectura-importa-mas-que-las-finanzas"],
  },
  restaurante: {
    tag: "Restaurantes · 3 sucursales",
    title: "Conciliación automática de delivery — 120 horas/mes ahorradas",
    subtitle: "Una cadena premium de restaurantes con 3 sucursales pasó de 5 días de conciliación manual de plataformas de delivery a un sistema automatizado que detecta diferencias en tiempo real.",
    hero: {
      industry: "Gastronomía premium",
      size: "3 sucursales · 60+ empleados",
      duration: "Sprint estándar · 14 días",
      service: "Bonsai Development",
    },
    challenge: [
      "5 días al mes dedicados a conciliar Uber, Rappi, PedidosYa y caja interna.",
      "Diferencias entre comisiones cobradas y reportadas que nadie auditaba.",
      "Reportes manuales por sucursal sin consolidación.",
      "Comisiones de plataformas que se pagaban sin verificación cruzada.",
      "Equipo de operaciones saturado, cierre semanal era un dolor sistemático.",
    ],
    solution: [
      "Mapeo de las 4 fuentes de datos críticas — plataformas y caja.",
      "Sistema de ingesta automática vía APIs y conexión bancaria.",
      "Motor de conciliación que cruza pedido, plataforma y depósito.",
      "Dashboard de margen real por canal, día y sucursal.",
      "Alertas automáticas ante diferencias mayores al umbral configurado.",
    ],
    results: [
      { k: "Horas/mes ahorradas",      v: "120",       d: "Equipo de ops" },
      { k: "Diferencias detectadas",   v: "+8%",       d: "Recuperación real" },
      { k: "Tiempo cierre semanal",    v: "−92%",      d: "De 8h a 30 min" },
      { k: "Sucursales conectadas",    v: "3 / 3",     d: "100% cubierto" },
      { k: "Plataformas integradas",   v: "4",         d: "Uber · Rappi · PYa · POS" },
      { k: "Alertas automáticas",      v: "24/7",      d: "Operativas" },
      { k: "Pagaron sprint con",       v: "1 mes",     d: "De recuperación de comisiones" },
      { k: "ROI del sprint",           v: "11×",       d: "En 12 meses" },
    ],
    quote: "Antes pagábamos comisiones que ni veíamos. El sprint se pagó solo en el primer mes con diferencias detectadas.",
    quoteAuthor: "Directora de Operaciones · Restaurantes",
    timeline: [
      { week: "Días 1–2", h: "Descubrimiento",      d: "Sesiones con operaciones, mapeo del flujo end-to-end y métricas de éxito." },
      { week: "Días 3–5", h: "Diseño",              d: "Arquitectura del motor de conciliación, definición de fuentes y reglas." },
      { week: "Días 6–12", h: "Construcción",       d: "Integraciones con APIs de plataformas, motor de matching, dashboard live." },
      { week: "Días 13–14", h: "Producción",        d: "Go-live en las 3 sucursales, capacitación del equipo y monitoreo." },
    ],
    services: ["Bonsai Development"],
    relatedPosts: ["por-que-vendemos-sprints-no-horas", "como-elegir-primer-proceso-automatizar"],
  },
};

function CasePage() {
  const slug = window.CASE_SLUG;
  const c = CASES[slug];

  useEC(() => {
    if (c) document.title = c.title + " — Caso · Bonsai Consulting";
  }, []);

  if (!c) {
    return (
      <main id="main">
        <section className="s" style={{paddingTop:120, textAlign:"center"}}>
          <div className="wrap">
            <h1 className="h-display" style={{fontSize:48}}>Caso no encontrado</h1>
            <a href="../index.html" className="btn btn-primary" style={{marginTop:24}}>
              Volver al inicio
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <CasePageNav />
      <ReadingProgress />
      <main id="main">
        <section className="case-hero">
          <div className="subtle-grid" />
          <div className="wrap">
            <a href="../index.html" className="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
              Volver a Bonsai Consulting
            </a>
            <span className="case-tag"><Icon.Leaf width="11" height="11" /> {c.tag}</span>
            <h1 className="h-display case-title">{c.title}</h1>
            <p className="case-subtitle">{c.subtitle}</p>
            <div className="case-meta">
              <div><span className="m-k">Industria</span><span className="m-v">{c.hero.industry}</span></div>
              <div><span className="m-k">Tamaño</span><span className="m-v">{c.hero.size}</span></div>
              <div><span className="m-k">Duración</span><span className="m-v">{c.hero.duration}</span></div>
              <div><span className="m-k">Servicio</span><span className="m-v">{c.hero.service}</span></div>
            </div>
          </div>
        </section>

        <section className="s case-stats-section" style={{paddingTop: 64, paddingBottom: 0}}>
          <div className="wrap">
            <span className="eyebrow">Resultados</span>
            <h2 className="h-display" style={{marginTop:14, fontSize:32, marginBottom: 32}}>
              Lo que cambió, en números.
            </h2>
            <div className="case-stats-grid">
              {c.results.map((r, i) => (
                <div className="case-stat-card" key={i}>
                  <div className="cs-k">{r.k}</div>
                  <div className="cs-v">{r.v}</div>
                  <div className="cs-d">{r.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s" style={{paddingTop: 96}}>
          <div className="wrap" style={{maxWidth: 880}}>
            <div className="case-prose-grid">
              <div className="case-prose-block">
                <span className="eyebrow">El desafío</span>
                <h3 className="h-display" style={{fontSize:28, marginTop:14, marginBottom: 18}}>
                  Lo que encontramos.
                </h3>
                <ul className="case-list">
                  {c.challenge.map((x, i) => (<li key={i}>{x}</li>))}
                </ul>
              </div>
              <div className="case-prose-block">
                <span className="eyebrow">La solución</span>
                <h3 className="h-display" style={{fontSize:28, marginTop:14, marginBottom: 18}}>
                  Cómo lo resolvimos.
                </h3>
                <ul className="case-list check">
                  {c.solution.map((x, i) => (<li key={i}>{x}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="s dark" style={{paddingTop: 96, paddingBottom: 96}}>
          <div className="wrap" style={{maxWidth: 760, textAlign:"center"}}>
            <div className="case-quote-mark" aria-hidden="true">
              <svg viewBox="0 0 36 28" fill="none" width="48" height="36">
                <path d="M8 28V18c0-7 4-12 10-14l1 4c-4 1-7 4-7 8h6v12H8zm17 0V18c0-7 4-12 10-14l1 4c-4 1-7 4-7 8h6v12H25z" fill="#16C08C" opacity="0.6"/>
              </svg>
            </div>
            <blockquote className="case-quote">
              {c.quote}
            </blockquote>
            <div className="case-quote-author">— {c.quoteAuthor}</div>
          </div>
        </section>

        <section className="s" style={{paddingTop: 96}}>
          <div className="wrap">
            <span className="eyebrow">Cronograma</span>
            <h2 className="h-display" style={{marginTop:14, fontSize:32, marginBottom: 32}}>
              Sprint por sprint.
            </h2>
            <div className="case-timeline">
              {c.timeline.map((t, i) => (
                <div className="case-tstep" key={i}>
                  <div className="case-tweek">{t.week}</div>
                  <h4>{t.h}</h4>
                  <p>{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s" id="contacto" style={{paddingTop: 96, paddingBottom: 64}}>
          <div className="wrap">
            <div className="cta-banner">
              <div>
                <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>¿Tu situación es similar?</span>
                <h2 style={{
                  marginTop:14, fontFamily:"var(--font-display)",
                  fontSize:"clamp(28px, 3.4vw, 40px)",
                  letterSpacing:"-0.02em", color:"var(--stone)", lineHeight:1.05,
                }}>
                  Hablemos de tu caso.
                </h2>
                <p>
                  60 minutos. Salís con un mapa, una estimación de ahorro y una propuesta concreta — sin compromiso.
                </p>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start"}}>
                <a className="btn btn-primary" href="../agendar.html">
                  Agendar diagnóstico <Icon.Arrow width="16" height="16" />
                </a>
                <a className="btn btn-ghost" style={{color:"var(--stone)", borderColor:"rgba(255,255,255,0.18)"}} href="index.html">
                  Ver más casos
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

function CasePageNav() {
  const [open, setOpen] = useSC(false);
  useEC(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <nav className="nav" aria-label="Principal">
      <div className="wrap nav-inner">
        <a className="brand" href="../index.html" aria-label="Bonsai Consulting — Inicio">
          <span className="mark" aria-hidden="true"><BonsaiMark size={18} color="#16C08C" /></span>
          Bonsai Consulting
        </a>
        <div className="nav-links">
          <a href="../index.html#divisiones">Divisiones</a>
          <a href="index.html" className="active">Casos</a>
          <a href="../sobre.html">Sobre nosotros</a>
          <a href="../blog/index.html">Blog</a>
          <a href="../index.html#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="../agendar.html">
          <span className="dot" aria-hidden="true" />
          Agendar diagnóstico
        </a>
        <button
          className={"nav-burger" + (open ? " open" : "")}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={"mobile-nav" + (open ? " open" : "")} role="dialog" aria-modal="true">
        <div className="mobile-nav-inner">
          <a href="../index.html" onClick={() => setOpen(false)}>Home</a>
          <a href="index.html" onClick={() => setOpen(false)} className="active">Casos</a>
          <a href="../sobre.html" onClick={() => setOpen(false)}>Sobre nosotros</a>
          <a href="../blog/index.html" onClick={() => setOpen(false)}>Blog</a>
          <a href="../agendar.html" onClick={() => setOpen(false)} className="mobile-cta">
            Agendar diagnóstico <Icon.Arrow width="16" height="16" />
          </a>
        </div>
      </div>
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CasePage />);
