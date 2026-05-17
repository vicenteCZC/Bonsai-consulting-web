/* global React */
const { useState: useState2, useEffect: useEffect2 } = React;

// ============================================================
// Problems Section — Hoy: Excel, WhatsApp, reportes manuales, datos dispersos
// ============================================================
function ProblemsSection() {
  const items = [
    {
      tag: "Excel",
      h: "Planillas que viven en versiones",
      p: "El cierre depende de la planilla del fundador. Tres copias, ninguna es la verdadera. Errores que cuestan días.",
    },
    {
      tag: "WhatsApp",
      h: "Decisiones perdidas en chats",
      p: "Aprobaciones, pedidos, instrucciones. Conversaciones críticas sin trazabilidad ni acceso para el resto del equipo.",
    },
    {
      tag: "Reportes",
      h: "Reportes hechos a mano cada mes",
      p: "Cinco días al mes copiando y pegando. KPIs que llegan tarde y desactualizados cuando se presentan.",
    },
    {
      tag: "Datos",
      h: "Datos dispersos en seis sistemas",
      p: "ERP, contabilidad, banco, mensajería, planillas. Ninguno habla con el otro. La información existe pero no se usa.",
    },
  ];
  return (
    <section className="s" id="problemas" style={{paddingTop: 80}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">El problema</span>
            <h2 className="h-display" style={{marginTop:18}}>
              La operación está dispersa. La información, también.
            </h2>
          </div>
          <p className="lead">
            La mayoría de las empresas en crecimiento operan con herramientas que no escalan.
            No es falta de talento — es falta de estructura. Estos son los cuatro síntomas que vemos siempre.
          </p>
        </div>

        <div className="problems-grid">
          {items.map((it, i) => (
            <article className="problem-card" key={i}>
              <div className="problem-tag">
                <span className="tag-strike">{it.tag}</span>
              </div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Solutions transition — Antes vs Después
// ============================================================
function SolutionsTransition() {
  const rows = [
    { hoy: "Planillas con 3 versiones distintas",      con: "Un sistema con datos únicos y versionados" },
    { hoy: "Aprobaciones perdidas en WhatsApp",        con: "Flujo formal con trazabilidad y permisos" },
    { hoy: "Reportes manuales de 5 días al mes",       con: "Board pack en vivo, generado solo" },
    { hoy: "Equipo dependiente del fundador",          con: "Sistema operable por cualquier rol del equipo" },
    { hoy: "Datos dispersos en 6 herramientas",        con: "Una capa única de datos, integrada" },
  ];
  return (
    <section className="s dark" id="soluciones" style={{paddingTop: 96, paddingBottom: 96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">La solución</span>
            <h2 className="h-display" style={{marginTop:18, color:"var(--stone)"}}>
              Apps internas, dashboards, automatizaciones y agentes con IA.
            </h2>
          </div>
          <p className="lead" style={{color:"rgba(255,255,255,0.72)"}}>
            Reemplazamos los puntos ciegos por sistemas que cualquier equipo puede operar.
            No "transformación digital" — automatización medible, en producción, con resultados a 90 días.
          </p>
        </div>

        <div className="solutions-table">
          <div className="solutions-head">
            <div>Hoy</div>
            <div></div>
            <div>Con Bonsai</div>
          </div>
          {rows.map((r, i) => (
            <div className="solutions-row" key={i}>
              <div className="hoy">{r.hoy}</div>
              <div className="arrow" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
                </svg>
              </div>
              <div className="con">{r.con}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Services — the 6 official offerings
// ============================================================
function ServicesSection() {
  const services = [
    {
      n: "01",
      ico: <Icon.Flow width="20" height="20" />,
      h: "Bonsai Automation Sprint",
      tag: "10–15 días · precio fijo",
      p: "Automatizamos un proceso crítico end-to-end: cobranzas, conciliación, reporting, alertas. Sprint cerrado con sistema en producción al final.",
      fit: "Cuando hay UN proceso doloroso que ya se identificó",
      featured: true,
    },
    {
      n: "02",
      ico: <Icon.Stack width="20" height="20" />,
      h: "Internal Tools Lab",
      tag: "4–8 semanas · scope cerrado",
      p: "Portales internos, CRMs hechos a medida, módulos de gestión. Cuando el SaaS genérico ya no alcanza para tu manera de operar.",
      fit: "Cuando armaste un workflow en Excel y necesita ser app",
    },
    {
      n: "03",
      ico: <Icon.Bot width="20" height="20" />,
      h: "AI AgentOps Setup",
      tag: "3–6 semanas · privado",
      p: "Agentes IA internos con guardrails: redactan, clasifican, responden, resumen. Entrenados con tu lenguaje y reglas. Sin enviar datos a modelos públicos.",
      fit: "Cuando una persona pasa el día en tareas repetitivas de texto",
    },
    {
      n: "04",
      ico: <Icon.Chart width="20" height="20" />,
      h: "Data & Dashboard Systems",
      tag: "4–6 semanas",
      p: "Board packs en vivo, KPIs operativos, stress scenarios. Consolidamos ERP, contabilidad, bancos y planillas en un solo tablero ejecutivo.",
      fit: "Cuando el reporte mensual lleva más de 2 días de trabajo manual",
    },
    {
      n: "05",
      ico: <Icon.Dash width="20" height="20" />,
      h: "MVP Studio",
      tag: "6–10 semanas",
      p: "Construcción de MVP de producto digital. Diseño, código y métricas para validar una idea en mercado real con foco en aprendizaje.",
      fit: "Cuando hay una hipótesis de producto y plata para probarla",
    },
    {
      n: "06",
      ico: <Icon.Leaf width="20" height="20" />,
      h: "Bonsai OS",
      tag: "Continuo · capa unificadora",
      p: "El sistema operativo común donde viven todos tus flujos, agentes, dashboards y reglas. Diseñado para que el equipo opere con calma.",
      fit: "Cuando ya hay 2+ sistemas Bonsai y se necesita unificar",
    },
  ];
  return (
    <section className="s" id="servicios" style={{paddingTop: 96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Servicios · Bonsai Development</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Seis servicios. Cada uno con alcance, plazo y precio definidos.
            </h2>
          </div>
          <p className="lead">
            La oferta detallada de la división Development. No vendemos horas: cada servicio
            es un compromiso de resultado — un proceso automatizado, un sistema en producción,
            un dashboard funcionando.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <article className={"service-card" + (s.featured ? " featured" : "")} key={i}>
              <div className="service-top">
                <div className="service-ico">{s.ico}</div>
                <div className="service-num">{s.n}</div>
              </div>
              <h3>{s.h}</h3>
              <div className="service-tag">{s.tag}</div>
              <p>{s.p}</p>
              <div className="service-fit">
                <span>Ideal cuando</span>
                {s.fit}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Industries — 6 sectors
// ============================================================
function IndustriesSection() {
  const industries = [
    { n: "Agro",                 p: "Trazabilidad de cosecha, board packs, modelos de inversión por unidad productiva y simulación a 10 años.",
      use: "ROI por hectárea y por camión en vivo" },
    { n: "Logística",            p: "Despacho automatizado, integración con clientes, alertas operativas y tableros de flota.",
      use: "Reducción de re-trabajo en facturación" },
    { n: "Restaurantes",         p: "Sistemas de delivery propio, control de costo de plato, conciliación de plataformas y caja.",
      use: "Margen real por canal, día y sucursal" },
    { n: "Empresas familiares",  p: "Arquitectura patrimonial: holding, vehículos, reglas automáticas de asignación de excedente.",
      use: "Separación operación / patrimonio sin fricción" },
    { n: "Real estate",          p: "Gestión de inventario inmobiliario, CRM de leads, automatización de seguimientos y reportes a inversionistas.",
      use: "Pipeline visible y velocidad de venta" },
    { n: "Servicios",            p: "Operativa de proyectos, time-tracking, facturación automatizada, dashboards de utilización y rentabilidad.",
      use: "Margen por proyecto en tiempo real" },
  ];
  return (
    <section className="s" id="industrias" style={{paddingTop: 96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Industrias</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Construimos para sectores donde la operación es real.
            </h2>
          </div>
          <p className="lead">
            Trabajamos con empresas que mueven mercadería, atienden clientes y manejan
            patrimonio. Conocemos los flujos reales de seis industrias.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((it, i) => (
            <article className="industry-card" key={i}>
              <div className="industry-num">0{i+1}</div>
              <h3>{it.n}</h3>
              <p>{it.p}</p>
              <div className="industry-use">
                <Icon.Check />
                {it.use}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Bonsai OS section — methodology / operating center
// ============================================================
function BonsaiOSSection() {
  return (
    <section className="s" id="bonsai-os" style={{paddingTop: 96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Metodología</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Bonsai OS — el centro operativo donde todo converge.
            </h2>
          </div>
          <p className="lead">
            No vendemos proyectos sueltos. Cada sistema que construimos se conecta a Bonsai OS:
            la capa común donde tu equipo ve flujos, decide, aprueba y mide.
            Diseñado para operar, no para impresionar.
          </p>
        </div>

        <div style={{
          display:"grid", gridTemplateColumns:"1.05fr 0.95fr", gap:48, alignItems:"start"
        }} className="bonsai-os-grid">
          <OSFeatureList />
          <OSPreview />
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .bonsai-os-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function OSFeatureList() {
  const feats = [
    { h: "Tablero ejecutivo en vivo",
      p: "KPIs, EBITDA, DSCR, ROIC, FCF. Stress scenarios con un clic. Datos consolidados de todas tus fuentes — siempre actualizados." },
    { h: "Flujos automáticos auditables",
      p: "Cada automatización deja huella: entradas, decisiones, salidas. Reversible, trazable y entendible por todo el equipo." },
    { h: "Agentes IA con guardrails",
      p: "Copilots privados que respetan tus reglas de negocio y tono. Sin enviar tu data a modelos públicos." },
    { h: "Reglas de asignación patrimonial",
      p: "Reglas automáticas: cuenta operativa → holding → vehículos. Transferencia mínima del 30% del cashflow sin intervención manual." },
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      {feats.map((f,i)=>(
        <div key={i} style={{
          padding:"22px 0",
          borderTop: i===0 ? "1px solid var(--line)" : "0",
          borderBottom:"1px solid var(--line)",
          display:"grid",
          gridTemplateColumns:"36px 1fr",
          gap:18,
          alignItems:"start",
        }}>
          <div style={{
            width:32, height:32, borderRadius:8,
            background:"var(--sage-soft)", color:"var(--forest)",
            display:"grid", placeItems:"center",
            fontFamily:"var(--font-mono)", fontSize:11, fontWeight:600
          }}>
            0{i+1}
          </div>
          <div>
            <h4 style={{
              fontFamily:"var(--font-display)", fontSize:20, fontWeight:600,
              color:"var(--forest)", letterSpacing:"-0.015em", marginBottom:6
            }}>{f.h}</h4>
            <p style={{fontSize:14.5, color:"var(--muted)", maxWidth:480, textWrap:"pretty"}}>{f.p}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Use cases — short, varied
// ============================================================
function UseCasesSection() {
  const cases = [
    {
      tag: "Agro · 10y horizon",
      h: "De planillas dispersas a board pack ejecutivo.",
      bullets: [
        ["Margen operativo", "37.6%"],
        ["FCF anual",        "Gs. 1.99MM"],
        ["DSCR implícito",   ">2.5×"],
      ],
      quote: "El riesgo no era financiero. Era arquitectónico.",
    },
    {
      tag: "Restaurante · 3 sucursales",
      h: "Conciliación automática de plataformas de delivery.",
      bullets: [
        ["Horas/mes ahorradas", "120"],
        ["Diferencias detectadas", "+8%"],
        ["Cierre mensual",      "−3 días"],
      ],
      quote: "Antes pagábamos comisiones que ni veíamos.",
    },
    {
      tag: "Servicios B2B · 45 personas",
      h: "Dashboard de utilización y margen por proyecto.",
      bullets: [
        ["Visibilidad de margen", "Tiempo real"],
        ["Reportes manuales",     "Eliminados"],
        ["Tiempo a decisión",     "−70%"],
      ],
      quote: "Decidimos sobre proyectos vivos, no sobre el cierre del mes pasado.",
    },
  ];
  return (
    <section className="s" id="casos" style={{paddingTop: 96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Casos de uso</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Lo que cambió en empresas reales.
            </h2>
          </div>
          <p className="lead">
            Resultados de tres sprints, en tres industrias distintas. Mismo método,
            métricas diferentes. Empresas anónimas a pedido de los clientes.
          </p>
        </div>

        <div className="use-grid">
          {cases.map((c, i) => (
            <article className="use-card" key={i}>
              <span className="tag"><Icon.Leaf width="11" height="11" /> {c.tag}</span>
              <h3>{c.h}</h3>
              <div className="use-stats">
                {c.bullets.map(([k, v], j) => (
                  <div key={j}>
                    <div className="k">{k}</div>
                    <div className="v">{v}</div>
                  </div>
                ))}
              </div>
              <div className="use-quote">"{c.quote}"</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Process — how a typical engagement runs
// ============================================================
function ProcessSection() {
  const steps = [
    { n: "01", h: "Diagnóstico", p: "Sesión de 60 minutos. Salimos con un mapa del proceso, métricas y el alcance del sprint. Sin compromiso." },
    { n: "02", h: "Diseño",      p: "Modelo de datos, integraciones, decisiones LLM vs. código. Firmamos antes de construir." },
    { n: "03", h: "Construcción", p: "Sprints diarios con demo al cierre. Sin sorpresas. Sin scope creep. Comunicación directa." },
    { n: "04", h: "Operación",   p: "Go-live, capacitación del equipo y tablero de seguimiento de ahorro. 30 días de soporte incluidos." },
  ];
  return (
    <section className="s" id="proceso" style={{paddingTop: 96}}>
      <div className="wrap">
        <div className="s-head" style={{marginBottom:40}}>
          <div>
            <span className="eyebrow">Proceso</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Cuatro pasos. Sin rituales innecesarios.
            </h2>
          </div>
          <p className="lead">
            Trabajamos en sprints porque la atención cuesta. Cada paso tiene una salida
            tangible y una decisión clara antes de avanzar.
          </p>
        </div>
        <div className="process">
          {steps.map((s,i)=>(
            <div className="step" key={i}>
              <div className="num">{s.n} —</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA banner — final
// ============================================================
function CTABanner() {
  return (
    <section className="s" id="contacto" style={{paddingTop: 96, paddingBottom:64}}>
      <div className="wrap">
        <div className="cta-banner">
          <div>
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Empezá hoy</span>
            <h2 style={{marginTop:14}}>
              60 minutos. Un mapa de tu operación. Cero compromiso.
            </h2>
            <p>
              Agendá un diagnóstico. Salís con un mapa del proceso más doloroso, una estimación
              de ahorro y una recomendación clara — usa Bonsai o no.
            </p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start"}}>
            <a className="btn btn-primary" href="mailto:hola@bonsai.consulting?subject=Quiero%20un%20diagn%C3%B3stico">
              Agendar diagnóstico <Icon.Arrow width="16" height="16" />
            </a>
            <a className="btn btn-ghost" style={{color:"var(--stone)", borderColor:"rgba(255,255,255,0.18)"}} href="#servicios">
              Ver soluciones primero
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

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <div className="brand" style={{marginBottom:10}}>
              <span className="mark"><BonsaiMark size={18} color="#16C08C" /></span>
              Bonsai Consulting
            </div>
            <p>Consultora AI-native con cuatro divisiones: Development, Web, Mkt Agency y Business. Software que crece con estructura.</p>
          </div>
          <div>
            <h5>Divisiones</h5>
            <ul>
              <li><a href="divisions/development.html">Bonsai Development</a></li>
              <li><a href="divisions/web.html">Bonsai Web</a></li>
              <li><a href="divisions/mkt.html">Bonsai Mkt Agency</a></li>
              <li><a href="divisions/business.html">Bonsai Business</a></li>
            </ul>
          </div>
          <div>
            <h5>Empresa</h5>
            <ul>
              <li><a href="sobre.html">Sobre nosotros</a></li>
              <li><a href="cases/index.html">Casos</a></li>
              <li><a href="blog/index.html">Blog</a></li>
              <li><a href="herramientas/index.html">Herramientas gratuitas</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li>hola@bonsai.consulting</li>
              <li>Asunción, Paraguay</li>
              <li>LATAM-wide</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 BONSAI CONSULTING · DEVELOPMENT / WEB / MKT / BUSINESS</div>
          <div style={{display:"flex", gap: 18}}>
            <a href="legal.html#privacidad">Privacidad</a>
            <a href="legal.html#terminos">Términos</a>
            <a href="legal.html#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// Divisiones — Las 4 marcas hijas (Development, Web, Mkt Agency, Business)
// ============================================================
function DivisionsSection() {
  const divisions = [
    {
      name: "Development",
      tagline: "Software, automatización y agentes IA",
      desc: "La división AI-native. Construye sistemas operativos a medida, automatizaciones y agentes inteligentes para empresas que necesitan estructura.",
      bullets: ["Automation Sprint", "Internal Tools", "AI AgentOps", "Dashboards"],
      mark: <BonsaiMark size={22} color="#16C08C" />,
      featured: true,
      href: "divisions/development.html",
    },
    {
      name: "Web",
      tagline: "Sitios y experiencias digitales",
      desc: "Landings premium, sites corporativos y plataformas web. Diseño y performance con la misma disciplina de un producto.",
      bullets: ["Landing Pages", "Sites Corporativos", "E-commerce", "SEO Técnico"],
      mark: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 9h18"/><circle cx="6.5" cy="7" r="0.5" fill="#16C08C"/><circle cx="8.5" cy="7" r="0.5" fill="#16C08C"/>
        </svg>
      ),
      href: "divisions/web.html",
    },
    {
      name: "Mkt Agency",
      tagline: "Marketing operado con sistemas",
      desc: "Performance, contenido y branding con métricas reales. Estrategias accionables conectadas a tus dashboards operativos.",
      bullets: ["Performance Ads", "Contenido", "Branding", "Analytics"],
      mark: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l11-7v16L3 13z"/>
          <path d="M14 9v6"/>
          <path d="M18 8v8"/>
        </svg>
      ),
      href: "divisions/mkt.html",
    },
    {
      name: "Business",
      tagline: "Consultoría estratégica y financiera",
      desc: "Arquitectura patrimonial, board packs, holding y modelos financieros. La capa estratégica detrás de cada decisión.",
      bullets: ["Holding & Patrimonio", "Board Packs", "Modelos 10y", "Stress Scenarios"],
      mark: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16C08C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 20h18"/><path d="M6 16V9"/><path d="M11 16V5"/><path d="M16 16v-5"/>
        </svg>
      ),
      href: "divisions/business.html",
    },
  ];
  return (
    <section className="s" id="divisiones" style={{paddingTop: 96, paddingBottom: 0}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Una casa, cuatro divisiones</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Bonsai Consulting opera en cuatro frentes coordinados.
            </h2>
          </div>
          <p className="lead">
            Software, web, marketing y estrategia bajo una misma disciplina. Podés contratar
            cada división por separado — o combinarlas para construir un sistema completo.
          </p>
        </div>

        <div className="divisions-grid">
          {divisions.map((d, i) => (
            <a className={"division-card" + (d.featured ? " featured" : "")} key={i} href={d.href}>
              <div className="division-top">
                <div className="division-mark">{d.mark}</div>
                <div className="division-arrow">
                  <Icon.Arrow width="16" height="16" />
                </div>
              </div>
              <div className="division-name">
                <span className="prefix">Bonsai</span>
                <span className="word">{d.name}</span>
              </div>
              <div className="division-tagline">{d.tagline}</div>
              <p>{d.desc}</p>
              <ul className="division-bullets">
                {d.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DivisionsSection });

// ============================================================
// Brand Reel — embedded animated loop
// ============================================================
function BrandReelSection() {
  return (
    <section className="s" id="reel" style={{paddingTop: 96, paddingBottom: 96}}>
      <div className="wrap">
        <div className="s-head" style={{marginBottom: 40}}>
          <div>
            <span className="eyebrow">El cambio, en 12 segundos</span>
            <h2 className="h-display" style={{marginTop:18}}>
              De operación dispersa<br/>a sistema en producción.
            </h2>
          </div>
          <p className="lead">
            Cada compromiso con Bonsai sigue el mismo arco: diagnosticamos el caos,
            diseñamos la arquitectura y entregamos un sistema corriendo solo.
            Mirá cómo se ve en vivo.
          </p>
        </div>
        <div className="reel-frame">
          <iframe
            src="brand-reel.html"
            title="Bonsai brand reel"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BrandReelSection });

Object.assign(window, {
  ProblemsSection, SolutionsTransition, ServicesSection, IndustriesSection,
  BonsaiOSSection, UseCasesSection, ProcessSection, CTABanner, Footer,
});
