/* global React, ReactDOM */
/* About page — Sobre nosotros */

const { useState: useSA, useEffect: useEA } = React;

function AboutPage() {
  useEA(() => {
    document.title = "Sobre nosotros — Bonsai Consulting";
  }, []);

  return (
    <>
      <AboutNav />
      <main id="main">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutManifesto />
        <AboutCTA />
      </main>
      <Footer />
      <StickyCTA />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

function AboutNav() {
  const [open, setOpen] = useSA(false);
  useEA(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEA(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="nav" aria-label="Principal">
      <div className="wrap nav-inner">
        <a className="brand" href="index.html" aria-label="Bonsai Consulting — Inicio">
          <span className="mark" aria-hidden="true"><BonsaiMark size={18} color="#16C08C" /></span>
          Bonsai Consulting
        </a>
        <div className="nav-links">
          <a href="index.html#divisiones">Divisiones</a>
          <a href="index.html#servicios">Servicios</a>
          <a href="sobre.html" className="active">Sobre nosotros</a>
          <a href="blog/index.html">Blog</a>
          <a href="index.html#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="index.html#contacto">
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
      <div className={"mobile-nav" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-label="Menú">
        <div className="mobile-nav-inner">
          <a href="index.html" onClick={() => setOpen(false)}>Home</a>
          <a href="index.html#divisiones" onClick={() => setOpen(false)}>Divisiones</a>
          <a href="index.html#servicios" onClick={() => setOpen(false)}>Servicios</a>
          <a href="sobre.html" onClick={() => setOpen(false)} className="active">Sobre nosotros</a>
          <a href="blog/index.html" onClick={() => setOpen(false)}>Blog</a>
          <a href="index.html#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href="index.html#contacto" className="mobile-cta" onClick={() => setOpen(false)}>
            Agendar diagnóstico <Icon.Arrow width="16" height="16" />
          </a>
        </div>
      </div>
    </nav>
  );
}

function AboutHero() {
  return (
    <section className="about-hero">
      <div className="subtle-grid" />
      <div className="wrap">
        <div className="about-hero-grid">
          <div>
            <span className="eyebrow">Sobre nosotros</span>
            <h1 className="h-display" style={{marginTop:18}}>
              Una casa boutique <em>AI-native</em><br/>en LATAM.
            </h1>
            <p className="lead" style={{marginTop:22, maxWidth:580, fontSize:19}}>
              Construimos Bonsai Consulting para acompañar a empresas en crecimiento
              con la misma disciplina con la que se cultiva un bonsái:
              poda deliberada, raíces firmes, crecimiento medido.
            </p>
            <div className="hero-stats" style={{marginTop:48}}>
              <div>
                <div className="v">4</div>
                <div className="k">Divisiones bajo un mismo techo</div>
              </div>
              <div>
                <div className="v">6</div>
                <div className="k">Industrias atendidas</div>
              </div>
              <div>
                <div className="v">LATAM</div>
                <div className="k">Asunción · remoto</div>
              </div>
            </div>
          </div>
          <div className="about-hero-aside">
            <div className="about-mantra">
              <div className="mantra-icon"><BonsaiMark size={28} color="#16C08C" /></div>
              <p>Grow smarter.<br/>Build lighter.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section className="s" id="historia" style={{paddingTop: 96, paddingBottom: 0}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Cómo nació</span>
            <h2 className="h-display" style={{marginTop:18}}>
              La historia detrás del bonsái.
            </h2>
          </div>
          <p className="lead">
            Bonsai nació de una observación simple: las pymes y empresas familiares en LATAM
            tienen márgenes excepcionales pero arquitecturas frágiles. Resolverlo no requiere
            otra agencia. Requiere disciplina.
          </p>
        </div>

        <div className="story-timeline">
          <div className="story-step">
            <div className="story-year">2024</div>
            <h3>El insight</h3>
            <p>Mientras consultábamos a empresas familiares, encontramos el mismo patrón:
              operaciones rentables, dependientes del fundador y atadas a planillas Excel
              que viven en versiones distintas. El problema no era de talento, sino de estructura.</p>
          </div>
          <div className="story-step">
            <div className="story-year">2025</div>
            <h3>La primera división</h3>
            <p>Nació Bonsai Development. Sprints de 10–15 días que reemplazaban procesos
              manuales por sistemas en producción. Sin scope creep. Sin horas. Precio cerrado.</p>
          </div>
          <div className="story-step">
            <div className="story-year">2026</div>
            <h3>Una casa, cuatro divisiones</h3>
            <p>Sumamos Web, Mkt Agency y Business. Misma disciplina, frentes complementarios.
              Las cuatro divisiones hablan el mismo idioma y miran los mismos KPIs.</p>
          </div>
          <div className="story-step active">
            <div className="story-year">Hoy</div>
            <h3>Próximos pasos</h3>
            <p>Bonsai OS como capa común. Más clientes, más industrias, mismo método.
              El objetivo no es escalar Bonsai — es hacer que cada cliente escale con estructura.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  const values = [
    {
      n: "01",
      h: "Resultados, no horas",
      p: "Vendemos sistemas en producción. Cada compromiso tiene scope, plazo y precio cerrados antes de firmar.",
    },
    {
      n: "02",
      h: "Poda deliberada",
      p: "Decir que no a lo que no aporta es nuestra primera disciplina. Mil noes por cada sí.",
    },
    {
      n: "03",
      h: "Estructura primero",
      p: "El crecimiento sin estructura es deuda futura. Diagnosticamos antes de construir.",
    },
    {
      n: "04",
      h: "AI como stack, no como adorno",
      p: "Cada sistema asume que la IA es parte de la herramienta — no un agregado decorativo.",
    },
    {
      n: "05",
      h: "Una sola conversación",
      p: "Las cuatro divisiones comparten estrategia. El cliente no contrata cuatro proveedores: contrata una casa.",
    },
    {
      n: "06",
      h: "Premium, calmo, técnico",
      p: "Sin slop visual, sin promesas vacías, sin transformación 360. La disciplina es el lujo.",
    },
  ];
  return (
    <section className="s" id="valores" style={{paddingTop: 96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Cómo trabajamos</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Seis principios. Cero excepciones.
            </h2>
          </div>
          <p className="lead">
            Los valores que guían cada propuesta, cada sprint y cada decisión sobre con
            qué cliente trabajamos — y con cuál no.
          </p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <article className="value-card" key={i}>
              <div className="value-num">{v.n}</div>
              <h3>{v.h}</h3>
              <p>{v.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeam() {
  const team = [
    {
      name: "Vicente Correa",
      role: "Founder & CEO",
      bio: "Estratega y operador con 10+ años en empresas familiares y agroindustriales. Lidera Bonsai Business y la dirección estratégica.",
      initials: "VC",
      hue: "#16C08C",
    },
    {
      name: "[Por anunciar]",
      role: "Head of Development",
      bio: "Sistemas AI-native, automatización y agentes. Lidera Bonsai Development y la arquitectura de Bonsai OS.",
      initials: "—",
      hue: "#A7B89A",
    },
    {
      name: "[Por anunciar]",
      role: "Head of Web & Brand",
      bio: "Diseño, código y experiencia. Lidera Bonsai Web — sitios premium y sistemas de identidad.",
      initials: "—",
      hue: "#C9A14A",
    },
    {
      name: "[Por anunciar]",
      role: "Head of Mkt Agency",
      bio: "Performance, contenido y demand gen. Lidera Bonsai Mkt Agency con foco en atribución y crecimiento medible.",
      initials: "—",
      hue: "#E07A5F",
    },
  ];
  return (
    <section className="s" id="equipo" style={{paddingTop: 96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Equipo</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Pocos. Senior. Comprometidos.
            </h2>
          </div>
          <p className="lead">
            Estamos creciendo de manera controlada. Cada incorporación pasa por la misma
            vara: experiencia real en industria, criterio estratégico y respeto por la disciplina.
          </p>
        </div>
        <div className="team-grid">
          {team.map((m, i) => (
            <article className="team-card" key={i}>
              <div className="team-avatar" style={{background: m.hue + "22", color: m.hue}}>
                {m.initials}
              </div>
              <h3>{m.name}</h3>
              <div className="team-role">{m.role}</div>
              <p>{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutManifesto() {
  return (
    <section className="s dark" id="manifesto" style={{paddingTop: 96, paddingBottom: 96}}>
      <div className="wrap" style={{maxWidth: 900, marginInline: "auto"}}>
        <div style={{textAlign: "center"}}>
          <span className="eyebrow">Manifiesto</span>
        </div>
        <h2 className="h-display" style={{
          color: "var(--stone)", marginTop: 24, textAlign: "center",
          fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05,
        }}>
          Software que <em style={{fontStyle:"normal", color: "var(--green)"}}>crece</em> con estructura.
        </h2>
        <div className="manifesto-text">
          <p>Creemos en la disciplina antes que en la velocidad. En el sistema antes que en el héroe. En los resultados antes que en las horas facturadas.</p>
          <p>Creemos que <b>la mayoría de las "transformaciones digitales" fracasan</b> porque empiezan por la tecnología en lugar de empezar por la arquitectura.</p>
          <p>Creemos que <b>el AI es una herramienta</b>, no una religión. Lo usamos cuando aporta, lo evitamos cuando estorba.</p>
          <p>Creemos que <b>una empresa premium se construye con paciencia japonesa</b> — podando lo innecesario hasta que solo quede lo esencial.</p>
          <p>Y creemos que el riesgo nunca es financiero. Es <b>arquitectónico</b>.</p>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="s" id="contacto" style={{paddingTop: 96, paddingBottom: 64}}>
      <div className="wrap">
        <div className="cta-banner">
          <div>
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Empecemos a conversar</span>
            <h2 style={{
              marginTop:14, fontFamily:"var(--font-display)",
              fontSize:"clamp(28px, 3.4vw, 40px)",
              letterSpacing:"-0.02em", color:"var(--stone)", lineHeight:1.05,
            }}>
              ¿Compartimos los mismos valores?<br/>Hablemos.
            </h2>
            <p>
              Si esta forma de trabajar resuena con vos, agendá un diagnóstico de 60 minutos.
              Salís con un mapa, una estimación de ahorro y una propuesta — sin compromiso.
            </p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start"}}>
            <a className="btn btn-primary" href="mailto:hola@bonsai.consulting">
              Agendar diagnóstico <Icon.Arrow width="16" height="16" />
            </a>
            <a className="btn btn-ghost" style={{color:"var(--stone)", borderColor:"rgba(255,255,255,0.18)"}} href="index.html#divisiones">
              Ver las 4 divisiones
            </a>
            <div style={{
              fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.5)",
              letterSpacing:"0.06em", marginTop:6,
            }}>
              hola@bonsai.consulting · Asunción · LATAM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AboutPage />);
