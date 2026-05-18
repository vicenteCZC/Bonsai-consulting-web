/* global React */
/* Bonsai — Extra sections: Testimonials, Pricing Calculator, FAQ, Division Reel embed */

const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React;

// ============================================================
// Testimonials — quotes from anonymous clients with initial avatars
// ============================================================
function TestimonialsSection() {
  const items = [
    {
      quote: "Pasamos de cerrar el mes en planillas a tener un board pack en vivo. Hoy el directorio mira KPIs reales, no presentaciones de hace 30 días.",
      name: "V.C.",
      role: "Fundador",
      sector: "Agroindustrial · 80+ empleados",
      hue: "#16C08C",
    },
    {
      quote: "El sprint fue de 14 días. Al día 15 estábamos ahorrando 120 horas mensuales en conciliación de delivery. Sin discusiones.",
      name: "M.R.",
      role: "Directora de Operaciones",
      sector: "Restaurantes · 3 sucursales",
      hue: "#A7B89A",
    },
    {
      quote: "Otras agencias nos pedían 3 meses para diagnosticar. Bonsai diagnosticó en una sesión y entregó código en producción al mes.",
      name: "J.P.",
      role: "CEO",
      sector: "Consultoría B2B · 45 personas",
      hue: "#C9A14A",
    },
  ];
  return (
    <section className="s" id="testimonios" style={{paddingTop:96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Voces de clientes</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Lo que dicen los que ya operan con sistema.
            </h2>
          </div>
          <p className="lead">
            Testimonios anónimos a pedido de los clientes. Sectores, tamaños y métricas, reales.
          </p>
        </div>
        <div className="testi-grid">
          {items.map((it, i) => (
            <article className="testi-card" key={i}>
              <div className="testi-mark" aria-hidden>
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                  <path d="M8 28V18c0-7 4-12 10-14l1 4c-4 1-7 4-7 8h6v12H8zm17 0V18c0-7 4-12 10-14l1 4c-4 1-7 4-7 8h6v12H25z" fill="currentColor" opacity="0.18"/>
                </svg>
              </div>
              <p className="testi-quote">{it.quote}</p>
              <div className="testi-foot">
                <div className="testi-avatar" style={{background: it.hue + "22", color: it.hue}}>
                  {it.name}
                </div>
                <div className="testi-bio">
                  <div className="testi-role">{it.role}</div>
                  <div className="testi-sector">{it.sector}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Pricing Calculator — interactive estimator of monthly/annual savings
// ============================================================
function PricingCalculator() {
  const [hours, setHours]   = useS(20);  // horas manuales / semana
  const [people, setPeople] = useS(2);
  const [rate, setRate]     = useS(12);  // USD por hora
  const [company, setCompany] = useS("");
  const [processName, setProcessName] = useS("");
  const [contact, setContact] = useS("");

  const monthly = useM(() => Math.round(hours * people * rate * 4.33), [hours, people, rate]);
  const annual  = monthly * 12;

  // Recommend package based on monthly savings
  const recommendation = useM(() => {
    if (monthly < 1500) return {
      name: "Sprint Solo",
      price: "USD 6.000 – 12.000",
      payback: Math.ceil(8000 / monthly),
      div: "development",
    };
    if (monthly < 4500) return {
      name: "Operations Stack",
      price: "USD 18.000 – 35.000",
      payback: Math.ceil(25000 / monthly),
      div: "development",
    };
    return {
      name: "Bonsai OS Partnership",
      price: "Desde USD 4.500 / mes",
      payback: 1,
      div: "development",
    };
  }, [monthly]);

  const leadSummary = useM(() => {
    return [
      "Hola Bonsai, quiero revisar este proceso.",
      "",
      `Empresa: ${company || "A completar"}`,
      `Proceso manual: ${processName || "A completar"}`,
      `Contacto: ${contact || "A completar"}`,
      "",
      `Horas manuales por semana: ${hours}`,
      `Personas involucradas: ${people}`,
      `Costo hora promedio: USD ${rate}`,
      `Ahorro mensual estimado: USD ${monthly.toLocaleString()}`,
      `Ahorro anual estimado: USD ${annual.toLocaleString()}`,
      `Paquete sugerido: ${recommendation.name}`,
      "",
      "Me gustaria agendar un diagnostico de 60 minutos."
    ].join("\n");
  }, [company, processName, contact, hours, people, rate, monthly, annual, recommendation.name]);

  const leadMailto = `mailto:hola@bonsai.consulting?subject=${encodeURIComponent("Diagnostico Bonsai - calculadora de ahorro")}&body=${encodeURIComponent(leadSummary)}`;
  const leadWhatsApp = `https://wa.me/595981234567?text=${encodeURIComponent(leadSummary)}`;

  return (
    <section className="s" id="calculadora" style={{paddingTop:96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Calculadora de ahorro</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Cuánto te cuesta operar manual hoy.
            </h2>
          </div>
          <p className="lead">
            Estimación basada en horas mensuales que tu equipo dedica a tareas repetitivas
            que pueden automatizarse. Indicativo, no contractual.
          </p>
        </div>

        <div className="calc-grid">
          <div className="calc-inputs">
            <CalcSlider
              label="Horas manuales por semana"
              hint="Sumá las horas que el equipo dedica a planillas, copy-paste, conciliación, reportes."
              min={5} max={60} step={5} value={hours} onChange={setHours} suffix=" h"
            />
            <CalcSlider
              label="Personas involucradas"
              hint="Cuántas personas tocan ese flujo cada semana."
              min={1} max={10} step={1} value={people} onChange={setPeople} suffix=""
            />
            <CalcSlider
              label="Costo hora promedio"
              hint="Salario + cargas dividido horas mensuales. Default LATAM ~USD 12."
              min={5} max={40} step={1} value={rate} onChange={setRate} suffix=" USD/h"
            />
          </div>

          <aside className="calc-output">
            <div className="calc-out-row">
              <div className="calc-k">Ahorro mensual estimado</div>
              <div className="calc-v big">USD {monthly.toLocaleString()}</div>
              <div className="calc-bar"><span style={{width: Math.min(100, monthly/100) + "%"}} /></div>
            </div>
            <div className="calc-out-row">
              <div className="calc-k">Ahorro anual</div>
              <div className="calc-v">USD {annual.toLocaleString()}</div>
            </div>

            <div className="calc-reco">
              <span className="eyebrow" style={{color:"var(--green-2)"}}>Paquete sugerido</span>
              <div className="reco-name">{recommendation.name}</div>
              <div className="reco-price">{recommendation.price}</div>
              <div className="reco-payback">
                Payback estimado: <b>{recommendation.payback} {recommendation.payback === 1 ? "mes" : "meses"}</b>
              </div>
              <a className="btn btn-primary" href={`divisions/${recommendation.div}.html#paquetes`} style={{marginTop:14}}>
                Ver paquete completo <Icon.Arrow width="14" height="14" />
              </a>
            </div>

            <div className="calc-reco" style={{marginTop:18}}>
              <span className="eyebrow" style={{color:"var(--green-2)"}}>Diagnostico con tus datos</span>
              <div style={{display:"grid", gap:10, marginTop:14}}>
                <LeadInput
                  label="Empresa"
                  value={company}
                  onChange={setCompany}
                  placeholder="Nombre de tu empresa"
                />
                <LeadInput
                  label="Proceso a automatizar"
                  value={processName}
                  onChange={setProcessName}
                  placeholder="Ej. conciliacion de delivery"
                />
                <LeadInput
                  label="Email o WhatsApp"
                  value={contact}
                  onChange={setContact}
                  placeholder="Donde te respondemos"
                />
              </div>
              <div style={{display:"flex", gap:10, flexWrap:"wrap", marginTop:14}}>
                <a className="btn btn-primary" href={leadMailto}>
                  Enviar por email <Icon.Arrow width="14" height="14" />
                </a>
                <a className="btn btn-ghost" href={leadWhatsApp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
              <p style={{fontSize:12, color:"var(--muted)", marginTop:10}}>
                Se abre tu cliente de email o WhatsApp con el resumen ya armado. No guardamos datos en el navegador.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LeadInput({ label, value, onChange, placeholder }) {
  return (
    <label style={{display:"grid", gap:6}}>
      <span style={{
        fontFamily:"var(--font-mono)",
        fontSize:11,
        textTransform:"uppercase",
        letterSpacing:"0.08em",
        color:"var(--muted)"
      }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width:"100%",
          border:"1px solid var(--line)",
          borderRadius:8,
          background:"var(--paper)",
          color:"var(--ink)",
          padding:"12px 13px",
          font:"inherit",
          outline:"none"
        }}
      />
    </label>
  );
}

function CalcSlider({ label, hint, min, max, step, value, onChange, suffix }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="calc-slider">
      <div className="calc-slider-head">
        <label>{label}</label>
        <output>{value}{suffix}</output>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pct": pct + "%" }}
      />
      <div className="calc-slider-hint">{hint}</div>
    </div>
  );
}

// ============================================================
// FAQ accordion
// ============================================================
function FAQSection() {
  const faqs = [
    {
      q: "¿Cuánto cuesta un Sprint?",
      a: "Un Bonsai Automation Sprint va de USD 6.000 a 12.000, precio cerrado, 10–15 días. Incluye diagnóstico, diseño, implementación, dashboard de seguimiento y 30 días de soporte post-deploy. Cada división tiene sus propios paquetes con precio fijo — ver landings individuales.",
    },
    {
      q: "¿En qué se diferencian de una agencia tradicional?",
      a: "No vendemos horas: vendemos resultados con scope, plazo y precio cerrados antes de empezar. Cada sprint termina con un sistema en producción y métricas reales, no con un PowerPoint. Tenemos las 4 divisiones (Development, Web, Mkt, Business) bajo el mismo techo y comparten estrategia.",
    },
    {
      q: "¿Con qué tecnologías trabajan?",
      a: "Stack moderno y AI-native: Next.js, Postgres, Supabase, n8n para automatización, OpenAI / Anthropic para agentes IA, Webflow / Framer para webs rápidas, Shopify headless para e-commerce. Elegimos la herramienta según el problema, no al revés.",
    },
    {
      q: "¿Necesito tener todo 'ordenado' antes de empezar?",
      a: "No. De hecho ese es exactamente el problema que resolvemos. El diagnóstico inicial mapea tu caos actual y diseñamos sobre eso. Si tu operación estuviera ordenada, no nos necesitarías.",
    },
    {
      q: "¿Trabajan 100% remoto o presencial?",
      a: "Trabajamos remoto con reuniones de video — ágil, sincrónico, sin viajes. Para sprints largos podemos hacer kick-off presencial en Asunción u onsite con cliente si el caso lo justifica.",
    },
    {
      q: "¿Qué pasa después del sprint?",
      a: "Cada sprint incluye 30 días de soporte. Después podés operar el sistema por tu cuenta, contratar mantenimiento bajo SLA mensual, o engancharte a un Bonsai OS Partnership para evolución continua.",
    },
    {
      q: "¿Mis datos están seguros si usamos IA?",
      a: "Sí. Los agentes IA que construimos corren en infraestructura privada con guardrails. No enviamos datos sensibles a modelos públicos sin tu autorización explícita y siempre con anonimización. Tu data se queda en tus servidores o en proveedores con DPA firmado.",
    },
    {
      q: "¿Cómo empezamos?",
      a: "Agendá un diagnóstico de 60 minutos. Salís con un mapa del proceso más doloroso, una estimación de ahorro y una propuesta concreta — uses Bonsai o no. Sin compromiso.",
    },
  ];

  const [open, setOpen] = useS(0);

  return (
    <section className="s" id="faq" style={{paddingTop:96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Lo que nos preguntan antes de firmar.
            </h2>
          </div>
          <p className="lead">
            Si tu duda no está acá, escribinos directamente — respondemos en menos de 24h.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <FAQItem key={i} f={f} idx={i} open={open === i} onOpen={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ f, idx, open, onOpen }) {
  const ref = useR(null);
  const [h, setH] = useS(0);
  useE(() => {
    if (ref.current) setH(ref.current.scrollHeight);
  }, [f.a]);
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="faq-q" onClick={onOpen} aria-expanded={open}>
        <span className="faq-num">{String(idx+1).padStart(2,"0")}</span>
        <span className="faq-q-text">{f.q}</span>
        <span className="faq-toggle" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M12 5v14"/><path d="M5 12h14"/>
          </svg>
        </span>
      </button>
      <div className="faq-a-wrap" style={{maxHeight: open ? h + 24 : 0}}>
        <div className="faq-a" ref={ref}>{f.a}</div>
      </div>
    </div>
  );
}

// ============================================================
// Division Reel embed — small variant for each division landing
// ============================================================
function DivisionReelSection({ divisionKey, divisionName }) {
  return (
    <section className="s" id="reel-division" style={{paddingTop:96}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Bonsai {divisionName} en 10 segundos</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Mirá la transformación.
            </h2>
          </div>
          <p className="lead">
            Visualizá cómo se ve el cambio cuando Bonsai {divisionName} entra a una operación.
          </p>
        </div>
        <div className="reel-frame">
          <iframe
            src={`../division-reel.html?d=${divisionKey}`}
            title={`Bonsai ${divisionName} reel`}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  TestimonialsSection,
  PricingCalculator,
  FAQSection,
  DivisionReelSection,
});

// ============================================================
// Sticky CTA — appears after 40% scroll, dismissible
// ============================================================
function StickyCTA() {
  const [show, setShow] = useS(false);
  const [dismissed, setDismissed] = useS(false);

  useE(() => {
    if (dismissed) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? scrolled / max : 0;
      setShow(pct > 0.35 && pct < 0.92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !show) return null;
  return (
    <div className="sticky-cta" role="complementary" aria-label="Acción rápida">
      <span className="sticky-dot" aria-hidden="true" />
      <span className="sticky-text">¿Listo para empezar?</span>
      <a className="sticky-btn" href="#contacto">
        Diagnóstico 60 min
        <Icon.Arrow width="14" height="14" />
      </a>
      <button
        className="sticky-close"
        aria-label="Cerrar"
        onClick={() => setDismissed(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
          <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

// ============================================================
// Back-to-top button
// ============================================================
function BackToTop() {
  const [show, setShow] = useS(false);
  useE(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={"back-top" + (show ? " show" : "")}
      aria-label="Volver al inicio"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 19V5"/><path d="M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}

// ============================================================
// Reading progress bar (for division landings)
// ============================================================
function ReadingProgress() {
  const [pct, setPct] = useS(0);
  useE(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-bar" style={{ width: pct + "%" }} />
    </div>
  );
}

Object.assign(window, { StickyCTA, BackToTop, ReadingProgress });

// ============================================================
// Cookie consent banner — appears on first visit, remembers choice
// ============================================================
function CookieConsent() {
  const [shown, setShown] = useS(false);
  const [details, setDetails] = useS(false);

  useE(() => {
    const choice = localStorage.getItem("bonsai-cookies");
    if (!choice) setTimeout(() => setShown(true), 800);
  }, []);

  const accept = (analytics) => {
    localStorage.setItem("bonsai-cookies", JSON.stringify({
      essential: true,
      analytics,
      timestamp: new Date().toISOString(),
    }));
    setShown(false);
    if (analytics) window.dispatchEvent(new CustomEvent("cookies-accepted"));
  };

  if (!shown) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <div className="cookie-inner">
        <div className="cookie-text">
          <div className="cookie-title">🍃 Usamos cookies</div>
          <p>
            Cookies esenciales para que el sitio funcione, y analíticas anónimas para mejorarlo.
            Podés aceptar todas o solo las esenciales. {!details && (
              <button className="cookie-link" onClick={() => setDetails(true)}>Más detalles</button>
            )}
          </p>
          {details && (
            <ul className="cookie-list">
              <li><b>Esenciales</b> — idioma, consentimiento, sesión. No se pueden desactivar.</li>
              <li><b>Analíticas</b> — Google Analytics. Anónimas y agregadas.</li>
              <li>Para más info, ver <a href="legal.html#cookies">Política de cookies</a>.</li>
            </ul>
          )}
        </div>
        <div className="cookie-actions">
          <button className="cookie-btn ghost" onClick={() => accept(false)}>
            Solo esenciales
          </button>
          <button className="cookie-btn primary" onClick={() => accept(true)}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WhatsApp floating button — LATAM-relevant
// ============================================================
function WhatsAppButton() {
  // Replace with your actual WhatsApp Business number
  const phone = "595981234567";  // demo
  const message = encodeURIComponent("Hola Bonsai, me interesa agendar un diagnóstico.");
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      title="WhatsApp"
      onClick={() => {
        if (window.dataLayer) window.dataLayer.push({ event: "whatsapp_click" });
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
        <path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a8 8 0 0 0-6.95 12L4 20l4.1-1A8 8 0 0 0 20 12a7.9 7.9 0 0 0-2.4-5.7zM12 18.5a6.6 6.6 0 0 1-3.4-.9l-.2-.1-2.4.6.6-2.4-.2-.2A6.4 6.4 0 0 1 5.5 12a6.5 6.5 0 0 1 11-4.6A6.5 6.5 0 0 1 12 18.5zm3.6-4.7c-.2-.1-1.2-.6-1.4-.7s-.3-.1-.5.1-.5.7-.6.8-.3.1-.5 0a5.4 5.4 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.2-.3v-.3l-.7-1.5c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.7 1.8 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.7 3.3 4 4 0 0 0 1.6.4 2.2 2.2 0 0 0 1.4-.6 1.8 1.8 0 0 0 .4-1c0-.1-.1-.2-.3-.3z"/>
      </svg>
      <span className="whatsapp-tip">Escribinos</span>
    </a>
  );
}

Object.assign(window, { CookieConsent, WhatsAppButton });

// ============================================================
// Trusted by — sector strip with credibility logos (as text marks)
// ============================================================
function TrustedBy() {
  const sectors = [
    "Agroindustrial · 80+ FTE",
    "Holding familiar · 3 verticales",
    "Restaurante · 3 sucursales",
    "Logística · flota 30+",
    "Servicios B2B · 45 personas",
    "Real estate · LATAM",
    "SaaS B2B · seed",
    "Inmobiliaria · Asunción",
  ];
  return (
    <section className="trusted" aria-label="Clientes anónimos">
      <div className="wrap">
        <div className="trusted-head">
          <span className="eyebrow">Confían en Bonsai</span>
          <p className="trusted-note">
            Clientes anónimos a pedido. Cada uno representa un sistema en producción.
          </p>
        </div>
        <div className="trusted-strip">
          {sectors.map((s, i) => (
            <div className="trusted-item" key={i}>
              <span className="trusted-dot" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Video Testimonials — rotating animated "video" quotes with play UI
// ============================================================
function VideoTestimonials() {
  const items = [
    {
      role: "Fundador · Agroindustrial",
      duration: "1:42",
      heroQuote: "Pasamos de cerrar el mes en planillas a tener un board pack en vivo.",
      fullQuote: "Pasamos de cerrar el mes en planillas a tener un board pack en vivo. Hoy el directorio mira KPIs reales, no presentaciones de hace 30 días. La diferencia es estructural — el equipo dejó de operar a ciegas.",
      tags: ["Board pack", "Stress scenarios", "DSCR > 2.5×"],
      hue: "#16C08C",
      initials: "VC",
    },
    {
      role: "Directora de Operaciones · Restaurantes",
      duration: "2:08",
      heroQuote: "Al día 15 estábamos ahorrando 120 horas mensuales. Sin discusiones.",
      fullQuote: "El sprint fue de 14 días. Al día 15 estábamos ahorrando 120 horas mensuales en conciliación de delivery. Sin discusiones. Y lo más importante — el equipo dejó de odiar el cierre mensual.",
      tags: ["Conciliación auto", "−120 h/mes", "3 sucursales"],
      hue: "#A7B89A",
      initials: "MR",
    },
    {
      role: "CEO · Consultoría B2B",
      duration: "1:24",
      heroQuote: "Otras agencias nos pedían 3 meses para diagnosticar. Bonsai entregó código al mes.",
      fullQuote: "Otras agencias nos pedían 3 meses para diagnosticar. Bonsai diagnosticó en una sesión y entregó código en producción al mes. Es otro nivel de seriedad operativa.",
      tags: ["MVP en 4 sem.", "+45% velocidad", "Pricing nuevo"],
      hue: "#C9A14A",
      initials: "JP",
    },
  ];
  const [active, setActive] = useS(0);
  useE(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, []);

  const it = items[active];

  return (
    <section className="s" id="video-testimonials" style={{paddingTop: 96, background: "var(--stone-2)"}}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <span className="eyebrow">Testimoniales en video</span>
            <h2 className="h-display" style={{marginTop:18}}>
              Voces directas.<br/>Sin scripts.
            </h2>
          </div>
          <p className="lead">
            Tres clientes contando, en sus palabras, qué cambió. Grabados sin guión.
            (Versión animada — los videos reales estarán pronto.)
          </p>
        </div>

        <div className="vtm-grid">
          <div className="vtm-player" key={active}>
            <div className="vtm-screen" style={{"--vtm-hue": it.hue}}>
              <div className="vtm-overlay" />
              <div className="vtm-quote-mark" aria-hidden="true">
                <svg viewBox="0 0 36 28" fill="none" width="48" height="36">
                  <path d="M8 28V18c0-7 4-12 10-14l1 4c-4 1-7 4-7 8h6v12H8zm17 0V18c0-7 4-12 10-14l1 4c-4 1-7 4-7 8h6v12H25z" fill="currentColor" opacity="0.32"/>
                </svg>
              </div>
              <div className="vtm-quote">
                <div className="vtm-quote-hero">{it.heroQuote}</div>
                <div className="vtm-quote-full">{it.fullQuote}</div>
              </div>
              <div className="vtm-avatar" style={{background: it.hue}}>
                {it.initials}
              </div>
              <div className="vtm-role">{it.role}</div>

              <div className="vtm-controls">
                <button className="vtm-play" aria-label="Reproducir">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8 5v14l11-7-11-7z"/></svg>
                </button>
                <div className="vtm-progress">
                  <div className="vtm-progress-bar" />
                </div>
                <div className="vtm-time">{it.duration}</div>
              </div>
            </div>
          </div>

          <div className="vtm-sidebar">
            <div className="vtm-meta">
              {it.tags.map((t, i) => (
                <span className="vtm-tag" key={i}>{t}</span>
              ))}
            </div>
            <div className="vtm-thumbs">
              {items.map((p, i) => (
                <button
                  key={i}
                  className={"vtm-thumb" + (i === active ? " on" : "")}
                  onClick={() => setActive(i)}
                  aria-label={`Ver testimonio: ${p.role}`}
                >
                  <div className="vtm-thumb-avatar" style={{background: p.hue + "33", color: p.hue}}>
                    {p.initials}
                  </div>
                  <div className="vtm-thumb-body">
                    <div className="vtm-thumb-role">{p.role}</div>
                    <div className="vtm-thumb-time">{p.duration}</div>
                  </div>
                </button>
              ))}
            </div>
            <a className="btn btn-ghost" href="cases/index.html" style={{marginTop: 18}}>
              Ver casos completos <Icon.Arrow width="14" height="14" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TrustedBy, VideoTestimonials });
