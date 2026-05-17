/* global React, ReactDOM */
/* Division page template — shared by all 4 division landing pages.
   The host HTML must set `window.DIVISION_KEY` before loading this script. */

const { useState: useStateD, useEffect: useEffectD } = React;

// ============================================================
// Division data
// ============================================================
const DIVISIONS = {
  development: {
    name: "Development",
    eyebrow: "División Development",
    tagline: "Convertimos procesos manuales en sistemas inteligentes.",
    lead: "La división AI-native de Bonsai Consulting. Software, automatización, dashboards y agentes IA construidos como sistemas en producción — no como proyectos sueltos.",
    accent: "#16C08C",
    mark: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-7" />
        <circle cx="7" cy="8" r="2.3" />
        <circle cx="14" cy="6" r="2" />
        <circle cx="17" cy="10.5" r="1.6" />
        <path d="M9 9c1 1 2 2 3 3" />
        <path d="M14 8c-1 1.5-1.5 3-2 4" />
        <path d="M16 12c-1 0.8-2.5 1-4 1" />
        <path d="M8 20h8" />
        <path d="M9.5 20v-1.5h5V20" />
      </svg>
    ),
    description: "Diseñamos y construimos los sistemas operativos que las empresas en crecimiento necesitan cuando el Excel, el WhatsApp y los reportes manuales dejaron de escalar. Cada compromiso es un sistema en producción con métricas reales — un proceso automatizado, un dashboard en vivo, un agente IA respondiendo solo. Sprints cerrados con alcance, plazo y precio definidos. Sabés exactamente qué recibís y cuándo.",
    problems: [
      "Planillas Excel con tres versiones distintas y ninguna confiable",
      "Aprobaciones y decisiones críticas perdidas en WhatsApp",
      "Reportes manuales que consumen 3–5 días al mes",
      "Datos dispersos entre ERP, contabilidad, bancos y planillas",
      "Procesos que dependen del fundador o un colaborador clave",
      "Tareas repetitivas de texto, clasificación o respuesta",
      "Falta de visibilidad sobre margen, flujo de caja y KPIs",
      "SaaS genéricos que no se adaptan a tu forma de operar",
    ],
    services: [
      { n: "Bonsai Automation Sprint", d: "Automatización de un proceso crítico end-to-end (10–15 días)." },
      { n: "Internal Tools Lab",        d: "Apps internas, portales y CRMs a medida." },
      { n: "AI AgentOps Setup",         d: "Agentes IA privados con guardrails y memoria." },
      { n: "Data & Dashboard Systems",  d: "Board packs y KPIs operativos en vivo." },
      { n: "MVP Studio",                d: "Construcción de productos digitales validables." },
      { n: "Bonsai OS",                 d: "Centro operativo unificador (continuo)." },
      { n: "Integraciones",             d: "Conexión entre ERP, bancos, mensajería y planillas." },
      { n: "Sistemas de cotización",    d: "Configuradores y reglas dinámicas de pricing." },
      { n: "Portales clientes",         d: "Self-service B2B con autenticación y permisos." },
      { n: "Mantenimiento y evolución", d: "Continuo bajo SLA mensual." },
    ],
    cases: [
      { tag: "Agroindustrial", h: "Board pack ejecutivo en vivo", stats: [["Margen", "37.6%"], ["FCF / año", "Gs. 1.99MM"], ["DSCR", ">2.5×"]] },
      { tag: "Restaurante",    h: "Conciliación automática de delivery", stats: [["Horas/mes", "−120"], ["Dif. detectadas", "+8%"], ["Cierre", "−3 días"]] },
      { tag: "Servicios B2B",  h: "Margen por proyecto en tiempo real", stats: [["Reportes manuales", "Cero"], ["Tiempo a decisión", "−70%"], ["Visibilidad", "Live"]] },
    ],
    benefits: [
      "Menos tareas manuales — el equipo se enfoca en decisiones",
      "Datos consolidados — una sola fuente de verdad",
      "Decisiones más rápidas — board packs en vivo",
      "Independencia del fundador — el sistema corre solo",
      "ROI medible a 90 días con tablero de seguimiento",
    ],
    packages: [
      {
        n: "Sprint Solo", price: "USD 6.000 – 12.000", duration: "10–15 días · scope cerrado",
        d: "Un proceso crítico automatizado, en producción, con dashboard de seguimiento. Ideal para el primer compromiso.",
        deliverables: ["Mapa del proceso", "Modelo de datos", "Sistema en producción", "Capacitación", "30 días de soporte"],
      },
      {
        n: "Operations Stack", price: "USD 18.000 – 35.000", duration: "6–10 semanas", featured: true,
        d: "Tres procesos automatizados + dashboard ejecutivo + integraciones base + agente IA inicial.",
        deliverables: ["Automation Sprint × 2", "Data & Dashboards", "AI AgentOps", "Integraciones", "60 días de soporte"],
      },
      {
        n: "Bonsai OS Partnership", price: "Desde USD 4.500 / mes", duration: "Continuo · SLA mensual",
        d: "Bonsai OS desplegado + evolución continua: nuevos flujos, agentes, optimización de dashboards.",
        deliverables: ["Roadmap trimestral", "Releases mensuales", "Soporte prioritario", "Board reviews"],
      },
    ],
    closing: "Vendemos resultados, no horas. Cuando termina el sprint, el sistema está corriendo.",
    cta: "Empezar mi Sprint",
  },

  web: {
    name: "Web",
    eyebrow: "División Web",
    tagline: "Tu presencia digital, hecha con disciplina de producto.",
    lead: "Sitios web, landings y experiencias digitales premium. Cada entrega es un activo de conversión: rápido, medible y elegante.",
    accent: "#16C08C",
    mark: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <path d="M3 9h18"/>
        <circle cx="6.5" cy="7" r="0.4" fill="#16C08C"/>
        <circle cx="8.5" cy="7" r="0.4" fill="#16C08C"/>
        <path d="M7 13h6"/>
        <path d="M7 16h10"/>
      </svg>
    ),
    description: "Convertimos marcas y negocios en experiencias digitales claras, elegantes y orientadas a conversión. No hacemos 'páginas web': construimos activos digitales que trabajan para tu empresa todos los días. Tratamos cada sitio como un producto: investigación de usuario, arquitectura de información, diseño visual premium, código performante y mediciones claras desde el día uno. Stacks modernos según el caso de uso — Next.js, Framer o Webflow. Cada entrega incluye SEO técnico inicial, analítica configurada y conexión a tu CRM.",
    problems: [
      "Sitio actual que parece antiguo o de bajo presupuesto",
      "Landings que no convierten y nadie sabe por qué",
      "Performance lenta que afecta SEO y experiencia",
      "Falta de medición y atribución — no se sabe qué canal vende",
      "Identidad visual incoherente entre redes, web y ventas",
      "Formularios que no se conectan al CRM",
      "Imposibilidad de actualizar contenido sin pedir ayuda externa",
      "Falta de mobile-first real (no solo 'responsive')",
    ],
    services: [
      { n: "Landing Pages",        d: "One-pagers optimizados para conversión." },
      { n: "Web Institucional",    d: "Sites corporativos premium con CMS." },
      { n: "Web Premium Empresa",  d: "Multi-página con CMS editable y SEO." },
      { n: "E-commerce",           d: "Tiendas en Shopify o headless." },
      { n: "Micrositios",          d: "Páginas de campaña o lanzamiento." },
      { n: "Optimización UX/UI",   d: "Auditoría y rediseño de funnels existentes." },
      { n: "Stack moderno",        d: "Next.js, Framer, Webflow según objetivo." },
      { n: "SEO técnico inicial",  d: "Schema, sitemap y Core Web Vitals en verde." },
      { n: "Performance web",      d: "Optimización de velocidad y LCP." },
      { n: "Integraciones",        d: "CRM, analítica, formularios, pagos." },
    ],
    cases: [
      { tag: "Consultora B2B", h: "Sitio institucional + leads al CRM", stats: [["Conv. lead", "×3"], ["Tiempo carga", "<1s"], ["Vitals", "Verde"]] },
      { tag: "Lanzamiento",    h: "Micrositio + analítica completa",   stats: [["CTR campaña", "+45%"], ["Tracking", "100%"], ["Mobile", "Optim."]] },
      { tag: "E-commerce",     h: "Tienda Shopify headless",           stats: [["Speed", "92/100"], ["Convers.", "+28%"], ["AOV", "+12%"]] },
    ],
    benefits: [
      "Conversión medible — cada visitante deja huella",
      "Performance real — Core Web Vitals en verde",
      "SEO técnico cubierto — sin flancos abiertos",
      "CMS editable — el equipo actualiza solo",
      "Coherencia de marca en todos los puntos de contacto",
    ],
    packages: [
      {
        n: "Bonsai Landing", price: "USD 2.500 – 4.500", duration: "2–3 semanas",
        d: "Landing one-pager premium optimizada para conversión, copy, diseño, código, analítica y conexión al CRM.",
        deliverables: ["Copy completo", "Diseño UI", "Desarrollo", "Analítica + CRM", "Capacitación"],
      },
      {
        n: "Bonsai Site", price: "USD 7.000 – 14.000", duration: "4–6 semanas", featured: true,
        d: "Web institucional multi-página con CMS, SEO técnico y conexión completa a la stack comercial.",
        deliverables: ["Arquitectura de información", "Copy", "Diseño + Desarrollo", "CMS editable", "SEO base"],
      },
      {
        n: "Bonsai Commerce", price: "Desde USD 12.000", duration: "6–10 semanas",
        d: "E-commerce completo (Shopify o headless) con integración logística, payments y dashboards de venta.",
        deliverables: ["Catálogo", "Checkout optimizado", "Logística", "Payments", "Dashboards"],
      },
    ],
    closing: "Un sitio premium no es un costo. Es la primera impresión de toda tu operación.",
    cta: "Cotizar mi sitio",
  },

  mkt: {
    name: "Mkt Agency",
    eyebrow: "División Mkt Agency",
    tagline: "Marketing con sistema, no con corazonadas.",
    lead: "Performance, contenido, branding y demand gen operados como un sistema. Atribución completa, decisiones rápidas y crecimiento sostenible.",
    accent: "#16C08C",
    mark: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l11-7v16L3 13z"/>
        <path d="M14 9v6"/>
        <path d="M17.5 7.5v9"/>
      </svg>
    ),
    description: "Ayudamos a las empresas a comunicar mejor, atraer clientes y convertir atención en oportunidades comerciales. No vendemos presencia en redes: vendemos un sistema comercial que trabaja todos los días. Cada compromiso parte de la estructura — buyer personas, embudo, métricas y atribución antes de producir el primer post. Después operamos: contenido, ads, email y branding bajo un calendario claro y un dashboard que el cliente ve en vivo. Cada lead tiene origen rastreable. Cada peso invertido devuelve un número.",
    problems: [
      "Redes activas pero sin generar leads ni ventas",
      "Inversión en Ads sin atribución ni control de retorno",
      "Falta de calendario y consistencia en la comunicación",
      "Branding incoherente entre canales",
      "Equipo comercial sin material de soporte",
      "Reportes mensuales decorativos que no sirven para decidir",
      "Imposibilidad de escalar campañas — no se sabe qué funciona",
      "Mensajes desalineados con el posicionamiento real",
    ],
    services: [
      { n: "Estrategia de contenido", d: "Plan editorial trimestral con buyer personas." },
      { n: "Social media",            d: "Producción + comunidad bajo calendario." },
      { n: "Meta Ads",                d: "Campañas con tracking completo y A/B." },
      { n: "Google Ads",              d: "Search, Performance Max, retargeting." },
      { n: "LinkedIn B2B",            d: "ABM y outreach estructurado." },
      { n: "Email marketing",         d: "Secuencias y newsletters segmentadas." },
      { n: "Calendarios de contenido", d: "Producción mensual coordinada con ventas." },
      { n: "Branding táctico",        d: "Refresh visual, guidelines y assets." },
      { n: "Campañas comerciales",    d: "Lanzamientos, fechas clave, promociones." },
      { n: "Reportes de performance", d: "Dashboards en vivo conectados al CRM." },
    ],
    cases: [
      { tag: "B2B · LinkedIn", h: "Sistema ABM con pipeline recurrente", stats: [["Leads/mes", "+8"], ["CPL", "−35%"], ["Pipeline", "Recurr."]] },
      { tag: "Inmobiliaria",   h: "Funnel Meta Ads + landings + CRM",    stats: [["CPL", "−40%"], ["Vol. leads", "×2.5"], ["Conv.", "+18%"]] },
      { tag: "SaaS B2B",       h: "Demand gen + contenido + email",      stats: [["MQL/mes", "×3"], ["Costo MQL", "−28%"], ["Pipeline", "+USD 220K"]] },
    ],
    benefits: [
      "Atribución clara — cada lead y cada peso rastreables",
      "Decisiones basadas en datos, no en sensaciones",
      "Consistencia operativa — el calendario corre solo",
      "Costo por lead controlado y escalable",
      "Coherencia con el resto del negocio",
    ],
    packages: [
      {
        n: "Activación", price: "USD 1.800 – 2.500 / mes", duration: "Mensual",
        d: "Operación base: social media + 1 plataforma de ads + reporte mensual. Ideal para empezar con orden.",
        deliverables: ["12 piezas/mes", "Gestión de comunidad", "1 plataforma de ads", "Reporte mensual"],
      },
      {
        n: "Crecimiento", price: "USD 3.500 – 5.500 / mes", duration: "Trimestral", featured: true,
        d: "Operación completa: estrategia + contenido + 2 plataformas + email + dashboards live + sesiones quincenales.",
        deliverables: ["Plan trimestral", "20 piezas/mes", "2 plataformas", "Secuencias email", "Dashboard live"],
      },
      {
        n: "Bonsai Demand", price: "Desde USD 7.500 / mes", duration: "Trimestral",
        d: "Demand generation B2B integrado: ABM, performance multi-canal, contenido premium, atribución al CRM.",
        deliverables: ["Estrategia ABM", "Contenido premium", "Ads multi-canal", "Integración CRM", "Reportes ejecutivos"],
      },
    ],
    closing: "Atención sin sistema es ruido. Atención con sistema es crecimiento.",
    cta: "Cotizar mi plan",
  },

  business: {
    name: "Business",
    eyebrow: "División Business",
    tagline: "Ordenamos la empresa antes de hacerla crecer.",
    lead: "Consultoría estratégica, financiera y operativa. Diagnóstico, modelos, procesos y estructura para que tu empresa pueda crecer sin romperse.",
    accent: "#16C08C",
    mark: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18"/><path d="M6 16V9"/><path d="M11 16V5"/><path d="M16 16v-5"/>
      </svg>
    ),
    description: "Ordenamos la empresa desde adentro para que pueda crecer con estructura. Acompañamos a fundadores y dueños en las decisiones estratégicas, financieras y operativas que definen los próximos cinco años del negocio. No somos una consultora corporativa pesada ni un coach motivacional. Trabajamos sobre tu modelo real, tus números reales y tus equipos reales — con disciplina práctica. Cada compromiso termina con entregables concretos: un board pack ejecutivo, un roadmap firmado, una estructura de holding o un pricing nuevo en uso.",
    problems: [
      "Dependencia operativa total del fundador",
      "Flujos personales y empresariales mezclados sin arquitectura",
      "Falta de claridad sobre dónde crecer y dónde no",
      "Pricing definido por costumbre, no por modelo",
      "KPIs que nadie mira porque no están bien definidos",
      "Procesos críticos documentados solo en la cabeza del dueño",
      "Imposibilidad de presentar el negocio a inversores con claridad",
      "Crecimiento que aumenta facturación pero erosiona margen",
    ],
    services: [
      { n: "Diagnóstico de negocio",         d: "Sesiones profundas con dueños y data review." },
      { n: "Business Model Canvas",          d: "Modelo actualizado y validado." },
      { n: "Plan estratégico",               d: "Roadmap de 12–36 meses firmado." },
      { n: "Roadmap de crecimiento",         d: "Prioridades, hitos y métricas." },
      { n: "Estructura financiera",          d: "Cuentas, holding y arquitectura patrimonial." },
      { n: "Procesos internos",              d: "SOPs y mapas operativos." },
      { n: "Definición de KPIs",             d: "Métricas relevantes por unidad de negocio." },
      { n: "Modelos de pricing",             d: "Estrategia, simulación y test." },
      { n: "Pitch decks",                    d: "Material para inversores o socios." },
      { n: "Propuestas y SOPs",              d: "Documentación operativa firmada." },
      { n: "Preparación para inversión",     d: "Data room, modelo y narrativa." },
    ],
    cases: [
      { tag: "Agroindustrial", h: "Modelo 10y + arquitectura patrimonial", stats: [["Valuación", "Gs. 11.3MM"], ["DSCR obj.", ">2.0"], ["Holding", "Activo"]] },
      { tag: "Empresa familiar", h: "Separación operación / patrimonio",   stats: [["Regla 30%", "Activa"], ["Vehículos", "4"], ["Board pack", "Mensual"]] },
      { tag: "Servicios B2B",    h: "Revisión y test de pricing",          stats: [["Margen", "+11pp"], ["Churn", "Estable"], ["Ciclo", "−20%"]] },
    ],
    benefits: [
      "Decisiones con base — modelos reales, no intuición",
      "Estructura patrimonial sólida — reglas claras",
      "Visibilidad ejecutiva — board pack mensual con KPIs reales",
      "Negocio menos dependiente del fundador",
      "Listo para crecer, vender o levantar capital",
    ],
    packages: [
      {
        n: "Diagnóstico Ejecutivo", price: "USD 2.500 – 4.500", duration: "2–3 semanas",
        d: "Sesiones con dueños + revisión de datos + entregable estratégico con prioridades, riesgos y roadmap inicial.",
        deliverables: ["Diagnóstico PDF", "Board pack inicial", "Roadmap 12 meses", "Sesión de cierre"],
      },
      {
        n: "Board Pack", price: "USD 5.500 – 12.000", duration: "4–8 semanas", featured: true,
        d: "Modelo financiero proyectado, KPIs por unidad, stress scenarios, valuación y arquitectura patrimonial.",
        deliverables: ["Modelo financiero", "Board pack ejecutivo", "Arquitectura patrimonial", "Sesión con directorio"],
      },
      {
        n: "Bonsai Capital", price: "Desde USD 8.000", duration: "6–10 semanas",
        d: "Preparación completa para inversión o financiamiento: data room, pitch deck, modelo, valuación, narrativa.",
        deliverables: ["Data room", "Pitch deck", "Modelo financiero", "Valuación", "Coaching de pitch"],
      },
    ],
    closing: "Crecer sin estructura no es crecimiento. Es deuda futura.",
    cta: "Agendar diagnóstico",
  },
};

// ============================================================
// Page
// ============================================================
function DivisionPage() {
  const key = window.DIVISION_KEY || "development";
  const d = DIVISIONS[key];
  if (!d) return <div>Division not found</div>;

  // Order of divisions in nav
  const order = ["development", "web", "mkt", "business"];

  useEffectD(() => {
    document.title = `Bonsai ${d.name} — Bonsai Consulting`;
  }, [key]);

  return (
    <>
      <DivisionNav active={key} order={order} />
      <main id="main">
        <DivisionHero d={d} />
        <DivisionProblems d={d} />
        <DivisionDescription d={d} />
        <DivisionServices d={d} />
        <DivisionReelEmbed dKey={key} dName={d.name} />
        <DivisionCases d={d} />
        <DivisionPackages d={d} />
        <DivisionBenefitsAndCTA d={d} />
        <CrossNav active={key} order={order} />
      </main>
      <Footer />
      <ReadingProgress />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

function DivisionNav({ active, order }) {
  const [open, setOpen] = useStateD(false);

  useEffectD(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffectD(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="nav" aria-label="Principal">
      <div className="wrap nav-inner">
        <a className="brand" href="../index.html" aria-label="Bonsai Consulting — Inicio">
          <span className="mark" aria-hidden="true"><BonsaiMark size={18} color="#16C08C" /></span>
          Bonsai Consulting
        </a>
        <div className="nav-links division-nav-links">
          {order.map(k => (
            <a key={k} href={`${k}.html`} className={k === active ? "active" : ""}>
              Bonsai {DIVISIONS[k].name}
            </a>
          ))}
          <a href="../sobre.html">Sobre</a>
          <a href="../blog/index.html">Blog</a>
        </div>
        <a className="nav-cta" href="#contacto">
          <span className="dot" aria-hidden="true" />
          Agendar diagnóstico
        </a>
        <button
          className={"nav-burger" + (open ? " open" : "")}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div id="mobile-nav" className={"mobile-nav" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-label="Menú">
        <div className="mobile-nav-inner">
          <div className="mn-eyebrow">Divisiones</div>
          {order.map(k => (
            <a key={k} href={`${k}.html`} onClick={() => setOpen(false)} className={k === active ? "active" : ""}>
              Bonsai {DIVISIONS[k].name}
            </a>
          ))}
          <a href="../index.html" onClick={() => setOpen(false)} className="mobile-back">← Volver a Bonsai Consulting</a>
          <a href="#contacto" className="mobile-cta" onClick={() => setOpen(false)}>
            Agendar diagnóstico
            <Icon.Arrow width="16" height="16" />
          </a>
        </div>
      </div>
    </nav>
  );
}

function DivisionHero({ d }) {
  return (
    <section className="division-hero">
      <div className="subtle-grid" />
      <div className="wrap">
        <a href="../index.html" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
          Bonsai Consulting
        </a>
        <div className="division-hero-grid">
          <div className="division-hero-content">
            <div className="division-hero-mark">{d.mark}</div>
            <span className="eyebrow" style={{marginTop:18}}>{d.eyebrow}</span>
            <h1 className="h-display" style={{marginTop:18}}>
              Bonsai <em>{d.name}</em>
            </h1>
            <p className="division-tagline-hero">{d.tagline}</p>
            <p className="lead" style={{marginTop:18, maxWidth:560}}>{d.lead}</p>
            <div className="hero-ctas" style={{marginTop:32}}>
              <a className="btn btn-primary" href="#contacto">
                {d.cta} <Icon.Arrow width="16" height="16" />
              </a>
              <a className="btn btn-ghost" href="#servicios">
                Ver servicios
              </a>
            </div>
          </div>
          <DivisionStatPanel d={d} />
        </div>
      </div>
    </section>
  );
}

function DivisionStatPanel({ d }) {
  // Show packages summary as a "panel"
  return (
    <aside className="division-stat-panel">
      <div className="dsp-head">
        <span>Paquetes vendibles</span>
        <span>{d.packages.length}</span>
      </div>
      {d.packages.map((p, i) => (
        <div className="dsp-row" key={i}>
          <div className="dsp-row-name">
            {p.n}
            {p.featured && <span className="dsp-pill">Top</span>}
          </div>
          <div className="dsp-row-price">{p.price}</div>
          <div className="dsp-row-dur">{p.duration}</div>
        </div>
      ))}
      <div className="dsp-foot">
        Todos los paquetes con scope, plazo y precio cerrados antes de empezar.
      </div>
    </aside>
  );
}

function DivisionProblems({ d }) {
  return (
    <section className="s" id="problemas" style={{paddingTop: 96, paddingBottom: 0}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Problemas que resuelve</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Los síntomas que vemos antes de cada compromiso.
            </h2>
          </div>
          <p className="lead">
            Si dos o más de estos puntos te resuenan, hay terreno fértil para empezar.
            Si ninguno aplica, tal vez todavía no es momento.
          </p>
        </div>

        <div className="div-problems-grid">
          {d.problems.map((p, i) => (
            <div className="div-problem" key={i}>
              <span className="num">{String(i+1).padStart(2, "0")}</span>
              <span className="text">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionDescription({ d }) {
  return (
    <section className="s dark" id="que-hacemos" style={{paddingTop: 96, paddingBottom: 96}}>
      <div className="wrap">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:64, alignItems:"start"}} className="div-desc-grid">
          <div>
            <span className="eyebrow">Qué hacemos</span>
            <h2 className="h-display" style={{marginTop:18, color:"var(--stone)"}}>
              Más que un servicio.<br/>Una disciplina.
            </h2>
          </div>
          <div>
            <p style={{fontSize:18, color:"rgba(255,255,255,0.86)", lineHeight:1.6, textWrap:"pretty"}}>
              {d.description}
            </p>
            <div className="div-benefits">
              {d.benefits.map((b, i) => (
                <div className="div-benefit" key={i}>
                  <span className="check"><Icon.Check /></span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .div-desc-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function DivisionServices({ d }) {
  return (
    <section className="s" id="servicios" style={{paddingTop: 96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Servicios principales</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Lo que entregamos, en concreto.
            </h2>
          </div>
          <p className="lead">
            Cada servicio tiene alcance definido y se puede contratar individualmente o
            como parte de un paquete.
          </p>
        </div>
        <div className="div-services-grid">
          {d.services.map((s, i) => (
            <div className="div-service" key={i}>
              <div className="div-service-num">{String(i+1).padStart(2, "0")}</div>
              <div className="div-service-body">
                <h4>{s.n}</h4>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionCases({ d }) {
  return (
    <section className="s" id="casos" style={{paddingTop: 96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Casos de uso</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Compromisos reales, métricas reales.
            </h2>
          </div>
          <p className="lead">
            Tres ejemplos representativos de Bonsai {d.name}. Empresas anónimas a pedido de los clientes.
          </p>
        </div>
        <div className="use-grid">
          {d.cases.map((c, i) => (
            <article className="use-card" key={i}>
              <span className="tag"><Icon.Leaf width="11" height="11" /> {c.tag}</span>
              <h3>{c.h}</h3>
              <div className="use-stats">
                {c.stats.map(([k, v], j) => (
                  <div key={j}>
                    <div className="k">{k}</div>
                    <div className="v">{v}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionPackages({ d }) {
  return (
    <section className="s" id="paquetes" style={{paddingTop: 96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Paquetes comerciales</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Tres formas de empezar. Precio cerrado en todas.
            </h2>
          </div>
          <p className="lead">
            Cada paquete tiene alcance, plazo y precio definidos antes de firmar. Sin sorpresas,
            sin scope creep, sin facturación por horas.
          </p>
        </div>
        <div className="packages-grid">
          {d.packages.map((p, i) => (
            <article className={"package-card" + (p.featured ? " featured" : "")} key={i}>
              {p.featured && <div className="package-badge">Más solicitado</div>}
              <h3>{p.n}</h3>
              <div className="package-price">{p.price}</div>
              <div className="package-duration">{p.duration}</div>
              <p>{p.d}</p>
              <ul className="package-deliv">
                {p.deliverables.map((dl, j) => (
                  <li key={j}><Icon.Check />{dl}</li>
                ))}
              </ul>
              <a className={p.featured ? "btn btn-primary" : "btn btn-ghost"} href="#contacto">
                {d.cta} <Icon.Arrow width="14" height="14" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionBenefitsAndCTA({ d }) {
  return (
    <section className="s" id="contacto" style={{paddingTop: 96, paddingBottom: 64}}>
      <div className="wrap">
        <div className="cta-banner">
          <div>
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Listo para empezar</span>
            <h2 style={{marginTop:14, fontFamily:"var(--font-display)", fontSize:"clamp(28px, 3.4vw, 40px)", letterSpacing:"-0.02em", color:"var(--stone)", lineHeight:1.05}}>
              {d.closing}
            </h2>
            <p>
              Agendá una reunión de 60 minutos. Salís con un diagnóstico claro y una propuesta —
              uses Bonsai o no.
            </p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start"}}>
            <a className="btn btn-primary" href={`mailto:hola@bonsai.consulting?subject=Bonsai%20${encodeURIComponent(d.name)}`}>
              {d.cta} <Icon.Arrow width="16" height="16" />
            </a>
            <a className="btn btn-ghost" style={{color:"var(--stone)", borderColor:"rgba(255,255,255,0.18)"}} href="#paquetes">
              Ver paquetes primero
            </a>
            <div style={{
              fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.5)",
              letterSpacing:"0.06em", marginTop:6
            }}>
              hola@bonsai.consulting · Asunción · LATAM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CrossNav({ active, order }) {
  const others = order.filter(k => k !== active);
  return (
    <section className="s" style={{paddingTop: 0, paddingBottom: 80}}>
      <div className="wrap">
        <div className="cross-nav-head">
          <span className="eyebrow">Otras divisiones</span>
          <h3 className="h-display" style={{fontSize:28, marginTop:14}}>
            Una casa, cuatro divisiones — explorá el resto.
          </h3>
        </div>
        <div className="cross-nav-grid">
          {others.map(k => {
            const o = DIVISIONS[k];
            return (
              <a className="cross-nav-card" key={k} href={`${k}.html`}>
                <div className="cross-mark">{o.mark}</div>
                <div className="cross-name">Bonsai {o.name}</div>
                <div className="cross-tag">{o.tagline}</div>
                <div className="cross-arrow"><Icon.Arrow width="14" height="14" /></div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DivisionReelEmbed({ dKey, dName }) {
  // Development uses the master brand-reel.html; others use the parametric division-reel.html
  const src = dKey === "development" ? "../brand-reel.html" : `../division-reel.html?d=${dKey}`;
  return (
    <section className="s" id="reel-division" style={{paddingTop: 96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Bonsai {dName} en movimiento</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Mirá la transformación en 10 segundos.
            </h2>
          </div>
          <p className="lead">
            Cómo se ve el cambio cuando Bonsai {dName} entra a una operación real.
          </p>
        </div>
        <div className="reel-frame">
          <iframe src={src} title={`Bonsai ${dName} reel`} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<DivisionPage />);
