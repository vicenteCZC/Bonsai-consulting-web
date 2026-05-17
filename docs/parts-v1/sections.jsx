/* global React */
const { useState: useState2, useEffect: useEffect2 } = React;

// ============================================================
// Essence section: bonsai meaning ↔ development meaning
// ============================================================
function EssenceSection() {
  const pairs = [
    ["Crecimiento controlado", "Sistemas que escalan"],
    ["Paciencia estratégica",   "Ejecución técnica"],
    ["Diseño orgánico",         "Arquitectura digital"],
    ["Precisión japonesa",      "Automatización moderna"],
    ["Belleza funcional",       "Software útil"],
  ];
  return (
    <section className="s" id="esencia">
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Esencia</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Software que crece con estructura.
            </h2>
          </div>
          <p className="lead">
            Construimos como se cultiva un bonsái: poda deliberada, raíces firmes,
            crecimiento medido. Nada decorativo. Cada sistema tiene una razón de existir.
          </p>
        </div>
        <div className="essence">
          {pairs.map(([l, r], i) => (
            <div className="essence-row" key={i}>
              <div className="l">{l}</div>
              <div className="r">{r}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Capabilities — what we build
// ============================================================
function Capabilities() {
  const caps = [
    {
      ico: <Icon.Flow width="18" height="18" />,
      h: "Automatización de procesos",
      p: "Mapeamos un flujo crítico — cobranzas, conciliación, reporting — y lo dejamos corriendo sin intervención manual.",
      meta: ["10–15 días", "Sprint", "ROI ≤ 90d"],
    },
    {
      ico: <Icon.Bot width="18" height="18" />,
      h: "Agentes con IA internos",
      p: "Copilots privados sobre la operación: redactan, resumen, clasifican, responden — entrenados con tu lenguaje y reglas.",
      meta: ["Privado", "RAG", "LLM ag."],
    },
    {
      ico: <Icon.Dash width="18" height="18" />,
      h: "Tableros operativos",
      p: "Board packs, KPIs y stress scenarios en vivo. Datos consolidados desde ERP, planillas y APIs — un solo lugar.",
      meta: ["Tiempo real", "Multi-fuente", "Exportable"],
    },
    {
      ico: <Icon.Stack width="18" height="18" />,
      h: "Sistemas internos a medida",
      p: "Cuando el SaaS genérico no alcanza: portales, CRM internos, módulos de gestión hechos a tu manera de operar.",
      meta: ["Web", "Móvil", "API-first"],
    },
    {
      ico: <Icon.Link width="18" height="18" />,
      h: "Integraciones",
      p: "Conectamos lo disperso: ERPs, contabilidad, bancos, mensajería, planillas — un grafo de datos coherente.",
      meta: ["ETL", "Webhooks", "SSO"],
    },
    {
      ico: <Icon.Shield width="18" height="18" />,
      h: "Arquitectura de información",
      p: "Diseñamos el modelo antes del código. Holding, vehículos patrimoniales y reglas de asignación quedan documentadas y vivas.",
      meta: ["Modelado", "Docs", "Gobernanza"],
    },
  ];
  return (
    <section className="s" id="sistema" style={{paddingTop: 40}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Qué construimos</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Seis capacidades. <br/>Una sola disciplina.
            </h2>
          </div>
          <p className="lead">
            Vendemos resultados, no horas de programación: claridad, velocidad, control,
            menos tareas manuales y mejores decisiones.
          </p>
        </div>
        <div className="caps">
          {caps.map((c, i) => (
            <article className="cap" key={i}>
              <div className="ico">{c.ico}</div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
              <div className="meta">
                {c.meta.map((m,j)=>(<span key={j}><b>·</b> {m}</span>))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Sprint — the signature offer from the brandbook
// ============================================================
function SprintSection() {
  return (
    <section className="s dark" id="sprint">
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Oferta</span>
            <h2 className="h-display" style={{marginTop:18, color:"#F4F2ED"}}>
              Bonsai Automation Sprint.
            </h2>
          </div>
          <p className="lead" style={{color:"rgba(255,255,255,0.7)"}}>
            Automatizamos un proceso crítico de tu empresa en 10 a 15 días. Precio fijo,
            alcance cerrado, sistema en producción al final del sprint — no un PowerPoint.
          </p>
        </div>

        <div className="sprint">
          <div className="sprint-card" style={{background:"#FBFAF7"}}>
            <span className="eyebrow" style={{color:"#0F2D20"}}>Incluye</span>
            <h3 style={{marginTop:14}}>Un proceso, completamente automatizado.</h3>
            <div className="price">
              10–15 días<small>de descubrimiento → producción</small>
            </div>

            <ul>
              {[
                "Diagnóstico operacional y mapa del proceso",
                "Diseño de arquitectura e integraciones",
                "Implementación con código propietario o agentes IA",
                "Tablero de control para medir el ahorro real",
                "Capacitación del equipo y handoff documentado",
                "30 días de soporte post-deploy incluidos",
              ].map((t,i)=>(
                <li key={i}><Icon.Check /> {t}</li>
              ))}
            </ul>

            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <a className="btn btn-primary" href="#contacto">
                Empezar el sprint <Icon.Arrow width="16" height="16" />
              </a>
              <a className="btn btn-ghost" href="#proceso">Ver el proceso</a>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Cronograma</span>
            <h3 style={{
              fontFamily:"var(--font-display)", fontSize:28, fontWeight:600,
              letterSpacing:"-0.02em", color:"#F4F2ED", margin:"14px 0 28px"
            }}>
              De la primera reunión al primer ahorro medible.
            </h3>
            <div className="timeline">
              <div className="step">
                <div className="day">Días 1–2</div>
                <h4>Descubrimiento</h4>
                <p>Sesión profunda con el equipo. Mapeamos el proceso actual end-to-end y definimos las métricas de éxito.</p>
              </div>
              <div className="step">
                <div className="day">Días 3–5</div>
                <h4>Diseño & arquitectura</h4>
                <p>Modelo de datos, integraciones, decisiones LLM vs. código. Lo firmamos antes de tocar producción.</p>
              </div>
              <div className="step">
                <div className="day">Días 6–12</div>
                <h4>Construcción</h4>
                <p>Implementamos en sprints diarios. Demos al cierre de cada día. Sin sorpresas, sin scope creep.</p>
              </div>
              <div className="step">
                <div className="day">Días 13–15</div>
                <h4>Producción & handoff</h4>
                <p>Go-live controlado, capacitación del equipo y dashboard de seguimiento de ahorro real activado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Bonsai OS section — the dark botanical command center
// ============================================================
function BonsaiOSSection() {
  return (
    <section className="s" id="bonsai-os" style={{background:"#FBFAF7"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Bonsai OS</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Un command center para operar con calma.
            </h2>
          </div>
          <p className="lead">
            Cada sistema que construimos se conecta a Bonsai OS: la capa común donde tu
            equipo ve flujos, decide, aprueba y mide. Diseñado para operar, no para impresionar.
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
      p: "KPIs, EBITDA, DSCR, ROIC. Stress scenarios con un clic. Datos consolidados de todas tus fuentes." },
    { h: "Flujos automáticos auditables",
      p: "Cada automatización deja huella: entradas, decisiones, salidas. Reversible y trazable." },
    { h: "Agentes IA con guardrails",
      p: "Copilots privados que respetan tus reglas de negocio. Sin enviar tu data a modelos públicos." },
    { h: "Reservas y arquitectura patrimonial",
      p: "Reglas automáticas de asignación: cuenta operativa → holding → vehículos. 30% del cashflow al holding sin intervención." },
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
// Case study — built from Board Pack data (anonymized as "Cliente Agro")
// ============================================================
function CaseStudy() {
  return (
    <section className="s" id="caso" style={{paddingTop:40}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Caso anónimo</span>
            <h2 className="h-display" style={{marginTop:18}}>
              De planillas dispersas a board pack ejecutivo.
            </h2>
          </div>
          <p className="lead">
            Un cliente del sector agroindustrial pasó de cierres manuales mensuales a un
            tablero financiero en vivo con stress scenarios y arquitectura de holding —
            implementado durante un solo Sprint extendido.
          </p>
        </div>

        <div className="case">
          <div className="case-left">
            <span className="tag"><Icon.Leaf width="11" height="11" /> Agroindustrial · 10y horizon</span>
            <h3>"El riesgo no era financiero. Era arquitectónico."</h3>
            <p>
              Margen operativo excepcional, capacidad de capitalización inmediata — y un
              modelo dependiente del fundador, con flujos personales y empresariales mezclados.
              Construimos la arquitectura de holding, las reglas de asignación automática y el
              board pack que ahora corre en producción.
            </p>
            <div className="qbox">
              "El foco 2026 es estructural: blindar liquidez, formalizar holding y
              profesionalizar la asignación del excedente."
            </div>
            <div style={{marginTop:24, display:"flex", gap:10, flexWrap:"wrap"}}>
              <a className="btn btn-dark" href="#contacto">
                Quiero un diagnóstico así <Icon.Arrow width="16" height="16" />
              </a>
            </div>
          </div>
          <div className="case-right">
            <div className="stat-grid">
              <div className="case-stat">
                <div className="k">Margen operativo</div>
                <div className="v">37.6<small>%</small></div>
              </div>
              <div className="case-stat">
                <div className="k">Free cash flow / año</div>
                <div className="v">Gs. 1.99<small>MM</small></div>
              </div>
              <div className="case-stat">
                <div className="k">DSCR implícito</div>
                <div className="v">&gt;2.5<small>×</small></div>
              </div>
              <div className="case-stat">
                <div className="k">ROIC estimado</div>
                <div className="v">32–38<small>%</small></div>
              </div>
              <div className="case-stat">
                <div className="k">ROI por camión</div>
                <div className="v">31.2<small>% / a</small></div>
              </div>
              <div className="case-stat">
                <div className="k">ROI por hectárea</div>
                <div className="v">34.3<small>% / a</small></div>
              </div>
            </div>
            <div style={{
              marginTop:18, padding:"14px 16px",
              border:"1px dashed var(--line-2)", borderRadius:12,
              fontFamily:"var(--font-mono)", fontSize:11.5,
              color:"var(--muted)", letterSpacing:"0.04em"
            }}>
              REGLA AUTOMATIZADA &nbsp;·&nbsp; transferencia mínima del <b style={{color:"var(--forest)"}}>30%</b> del cashflow mensual al holding
            </div>
          </div>
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
    { n: "01", h: "Diagnóstico", p: "Sesión de 90 minutos. Salimos con un mapa del proceso, métricas y el alcance del sprint." },
    { n: "02", h: "Diseño",      p: "Modelo de datos, integraciones, decisiones LLM vs. código. Firmamos antes de construir." },
    { n: "03", h: "Construcción", p: "Sprints diarios con demo al cierre. Sin sorpresas. Sin scope creep." },
    { n: "04", h: "Operación",   p: "Go-live, capacitación y tablero de seguimiento. 30 días de soporte incluidos." },
  ];
  return (
    <section className="s" id="proceso" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="s-head" style={{marginBottom:32}}>
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
// CTA banner
// ============================================================
function CTABanner() {
  return (
    <section className="s" id="contacto" style={{paddingTop:0, paddingBottom:64}}>
      <div className="wrap">
        <div className="cta-banner">
          <div>
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Build what's next</span>
            <h2 style={{marginTop:14}}>
              ¿Listo para convertir un proceso manual en un sistema inteligente?
            </h2>
            <p>
              Agendá un diagnóstico de 30 minutos. Salís con un mapa del proceso, una estimación
              de ahorro y una decisión clara — sin compromiso.
            </p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start"}}>
            <a className="btn btn-primary" href="mailto:hola@bonsai.dev">
              Automatizar mi empresa <Icon.Arrow width="16" height="16" />
            </a>
            <a className="btn btn-ghost" style={{color:"var(--stone)", borderColor:"rgba(255,255,255,0.18)"}} href="#bonsai-os">
              Ver Bonsai OS primero
            </a>
            <div style={{
              fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.5)",
              letterSpacing:"0.06em", marginTop:6
            }}>
              hola@bonsai.dev · Asunción · LATAM
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
              Bonsai Development
            </div>
            <p>Software AI-native, automatización y sistemas internos para empresas en crecimiento. Grow smarter. Build lighter.</p>
          </div>
          <div>
            <h5>Producto</h5>
            <ul>
              <li><a href="#bonsai-os">Bonsai OS</a></li>
              <li><a href="#sprint">Automation Sprint</a></li>
              <li><a href="#sistema">Capacidades</a></li>
              <li><a href="#caso">Casos</a></li>
            </ul>
          </div>
          <div>
            <h5>Empresa</h5>
            <ul>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Brandbook v1</a></li>
              <li><a href="#">Carreras</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li>hola@bonsai.dev</li>
              <li>Asunción, Paraguay</li>
              <li>LATAM-wide</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 BONSAI DEVELOPMENT · BRAND KIT v1</div>
          <div>SISTEMAS INTELIGENTES · EMPRESAS EN CRECIMIENTO</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  EssenceSection, Capabilities, SprintSection, BonsaiOSSection,
  CaseStudy, ProcessSection, CTABanner, Footer,
});
