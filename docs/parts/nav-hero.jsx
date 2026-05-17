/* global React */
const { useState, useEffect, useMemo, useRef } = React;

// ============================================================
// Icons (inline SVG, monoline, brand-aligned)
// ============================================================
const Icon = {
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16-2 0-2-2-2-2Z"/>
      <path d="M4 20c4-4 8-8 12-10"/>
    </svg>
  ),
  Bonsai: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 19v-7"/>
      <path d="M9 12c0-2 1-3 3-3s3 1 3 3"/>
      <circle cx="8" cy="8" r="2.4"/>
      <circle cx="14.5" cy="6" r="2"/>
      <circle cx="16" cy="10" r="1.6"/>
      <path d="M7 21h10"/>
      <path d="M9 21v-1.5h6V21"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <path d="M5 12l4 4 10-10"/>
    </svg>
  ),
  Dash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <rect x="3" y="4" width="8" height="8" rx="1.5"/>
      <rect x="13" y="4" width="8" height="5" rx="1.5"/>
      <rect x="13" y="11" width="8" height="9" rx="1.5"/>
      <rect x="3" y="14" width="8" height="6" rx="1.5"/>
    </svg>
  ),
  Bot: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <rect x="4" y="7" width="16" height="12" rx="3"/>
      <circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>
      <path d="M12 7V4"/><path d="M10 4h4"/>
    </svg>
  ),
  Flow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <rect x="3" y="3" width="6" height="6" rx="1"/>
      <rect x="15" y="3" width="6" height="6" rx="1"/>
      <rect x="9" y="15" width="6" height="6" rx="1"/>
      <path d="M6 9v3h12V9"/><path d="M12 12v3"/>
    </svg>
  ),
  Brain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <path d="M9 4a3 3 0 0 0-3 3v1a2 2 0 0 0-1 4 2 2 0 0 0 1 4v1a3 3 0 0 0 6 0V4"/>
      <path d="M15 4a3 3 0 0 1 3 3v1a2 2 0 0 1 1 4 2 2 0 0 1-1 4v1a3 3 0 0 1-6 0"/>
    </svg>
  ),
  Stack: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <path d="M3 7l9-4 9 4-9 4-9-4Z"/>
      <path d="M3 12l9 4 9-4"/>
      <path d="M3 17l9 4 9-4"/>
    </svg>
  ),
  Chart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <path d="M3 20h18"/><path d="M6 16V9"/><path d="M11 16V5"/><path d="M16 16v-5"/>
    </svg>
  ),
  Link: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/>
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...p}>
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z"/>
    </svg>
  ),
};

// ============================================================
// Logo mark (bonsai + circuit motif)
// ============================================================
function BonsaiMark({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
  );
}

// ============================================================
// Nav
// ============================================================
function Nav() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(window.i18n ? window.i18n.getLang() : "es");

  React.useEffect(() => {
    const onChange = (e) => setLang(e.detail.lang);
    window.addEventListener("i18nchange", onChange);
    return () => window.removeEventListener("i18nchange", onChange);
  }, []);

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const t = (k) => (window.i18n ? window.i18n.t(k) : k);
  const toggleLang = () => window.i18n && window.i18n.setLang(lang === "es" ? "en" : "es");

  return (
    <nav className="nav" aria-label="Principal">
      <div className="wrap nav-inner">
        <a className="brand" href="#" aria-label="Bonsai Consulting — Inicio">
          <span className="mark" aria-hidden="true"><BonsaiMark size={18} color="#16C08C" /></span>
          Bonsai Consulting
        </a>
        <div className="nav-links" id="primary-nav">
          <a href="#divisiones">{t("nav.divisions")}</a>
          <a href="#servicios">{t("nav.services")}</a>
          <a href="sobre.html">{t("nav.about")}</a>
          <a href="blog/index.html">{t("nav.blog")}</a>
          <a href="#faq">{t("nav.faq")}</a>
        </div>
        <div className="nav-right">
          <button
            className="lang-toggle"
            onClick={toggleLang}
            aria-label={"Switch language to " + (lang === "es" ? "English" : "Spanish")}
            title="ES / EN"
          >
            <span className={lang === "es" ? "on" : ""}>ES</span>
            <span className="sep" aria-hidden="true">/</span>
            <span className={lang === "en" ? "on" : ""}>EN</span>
          </button>
          <a className="nav-cta" href="agendar.html">
            <span className="dot" aria-hidden="true" />
            {t("nav.cta")}
          </a>
        </div>
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
          <a href="#divisiones" onClick={() => setOpen(false)}>{t("nav.divisions")}</a>
          <a href="#servicios" onClick={() => setOpen(false)}>{t("nav.services")}</a>
          <a href="#industrias" onClick={() => setOpen(false)}>{t("nav.industries")}</a>
          <a href="#bonsai-os" onClick={() => setOpen(false)}>{t("nav.os")}</a>
          <a href="sobre.html" onClick={() => setOpen(false)}>{t("nav.about")}</a>
          <a href="blog/index.html" onClick={() => setOpen(false)}>{t("nav.blog")}</a>
          <a href="#testimonios" onClick={() => setOpen(false)}>Testimonios</a>
          <a href="#calculadora" onClick={() => setOpen(false)}>Calculadora</a>
          <a href="#faq" onClick={() => setOpen(false)}>{t("nav.faq")}</a>
          <a href="#contacto" className="mobile-cta" onClick={() => setOpen(false)}>
            {t("nav.cta")}
            <Icon.Arrow width="16" height="16" />
          </a>
          <button
            className="lang-toggle mobile"
            onClick={toggleLang}
            aria-label={"Switch language to " + (lang === "es" ? "English" : "Spanish")}
          >
            <span className={lang === "es" ? "on" : ""}>ES</span>
            <span className="sep">/</span>
            <span className={lang === "en" ? "on" : ""}>EN</span>
          </button>
          <div className="mobile-divs">
            <div className="mn-eyebrow">{t("nav.divisions")}</div>
            <a href="divisions/development.html">Bonsai Development</a>
            <a href="divisions/web.html">Bonsai Web</a>
            <a href="divisions/mkt.html">Bonsai Mkt Agency</a>
            <a href="divisions/business.html">Bonsai Business</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// Hero (with right-column live OS preview)
// ============================================================
function Hero() {
  const [, setTick] = useState(0);
  React.useEffect(() => {
    const onChange = () => setTick((v) => v + 1);
    window.addEventListener("i18nchange", onChange);
    return () => window.removeEventListener("i18nchange", onChange);
  }, []);
  const t = (k) => (window.i18n ? window.i18n.t(k) : k);

  return (
    <section className="hero">
      <div className="subtle-grid" />
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="h-display">
            {t("hero.title.a")} <em>{t("hero.title.em")}</em>{t("hero.title.b")}
          </h1>
          <p className="lead">{t("hero.lead")}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contacto">
              {t("hero.cta.primary")}
              <Icon.Arrow width="16" height="16" />
            </a>
            <a className="btn btn-ghost" href="#servicios">
              {t("hero.cta.ghost")}
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <div className="v">6</div>
              <div className="k">{t("hero.stat.1.k")}</div>
            </div>
            <div>
              <div className="v">{t("hero.stat.2.v")}</div>
              <div className="k">{t("hero.stat.2.k")}</div>
            </div>
            <div>
              <div className="v">6</div>
              <div className="k">{t("hero.stat.3.k")}</div>
            </div>
          </div>
        </div>

        <OSPreview />
      </div>
    </section>
  );
}

// ============================================================
// OS Preview (the dark botanical command center the brandbook describes)
// ============================================================
function OSPreview() {
  const [tab, setTab] = useState("Resumen");
  return (
    <div className="os-card">
      <div className="os-shell">
        <aside className="os-side">
          <div className="logo">
            <span className="m"><BonsaiMark size={14} color="#16C08C" /></span>
            Bonsai OS
          </div>
          <div className="group">Operación</div>
          <div className="item active"><span className="ico"><Icon.Dash /></span>Tablero ejecutivo</div>
          <div className="item"><span className="ico"><Icon.Flow /></span>Flujos automáticos</div>
          <div className="item"><span className="ico"><Icon.Bot /></span>Agentes IA</div>
          <div className="item"><span className="ico"><Icon.Stack /></span>Datos & fuentes</div>
          <div className="group">Decisiones</div>
          <div className="item"><span className="ico"><Icon.Chart /></span>Board pack</div>
          <div className="item"><span className="ico"><Icon.Shield /></span>Reservas</div>
          <div className="item"><span className="ico"><Icon.Link /></span>Integraciones</div>
        </aside>
        <div className="os-main">
          <div className="os-topbar">
            <div className="crumb">OPERACIÓN / <b>Tablero ejecutivo</b></div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div className="tabs" role="tablist">
                {["Resumen","Stress","12M"].map((t) => (
                  <button key={t} className={tab===t?"on":""} onClick={()=>setTab(t)}>{t}</button>
                ))}
              </div>
              <div className="live">EN VIVO</div>
            </div>
          </div>

          <KPIs tab={tab} />
          <Chart tab={tab} />
        </div>
      </div>
    </div>
  );
}

function fmtGs(n){
  // Gs in millions short: 5,901,000,000 -> Gs. 5.9MM
  if (n >= 1e9) return "Gs. " + (n/1e9).toFixed(2).replace(/\.?0+$/,"") + "MM";
  if (n >= 1e6) return "Gs. " + (n/1e6).toFixed(0) + "M";
  return "Gs. " + n.toLocaleString();
}

function KPIs({ tab }) {
  // Data from Board_Pack_Vicente_Correa_2026 + stress scenario
  const real = {
    Resumen: [
      { k: "Facturación anual",   v: 5901000000, d: "+12.4% vs PY", neg: false },
      { k: "Resultado neto",      v: 2221000000, d: "Margen 37.6%", neg: false },
      { k: "Free Cash Flow",      v: 1998900000, d: "FCF/mes 166M", neg: false },
    ],
    Stress: [
      { k: "Ingresos −20%",       v: 4720800000, d: "Stress test",  neg: true  },
      { k: "Resultado stress",    v: 1040800000, d: "−52.7% neto",  neg: true  },
      { k: "DSCR implícito",      v: null, vt: ">2.5×",  d: "Continuidad OK", neg: false },
    ],
    "12M": [
      { k: "ROIC estimado",       v: null, vt: "32–38%", d: "Tendencia ↑",  neg: false },
      { k: "Cash Conversion",     v: null, vt: "0.38",   d: "Estable",      neg: false },
      { k: "Operating Leverage",  v: null, vt: "Alto",   d: "Escalable",    neg: false },
    ],
  };
  const rows = real[tab];
  return (
    <div className="kpi-row">
      {rows.map((r,i) => (
        <div className="kpi" key={i}>
          <div className="label">{r.k}</div>
          <div className="value">{r.v != null ? fmtGs(r.v) : r.vt}</div>
          <div className={"delta" + (r.neg?" neg":"")}>
            {!r.neg && <Icon.Check width="11" height="11" />} {r.d}
          </div>
        </div>
      ))}
    </div>
  );
}

function Chart({ tab }) {
  // Faux line chart for revenue vs FCF over 12 months
  const months = ["E","F","M","A","M","J","J","A","S","O","N","D"];
  // base monthly avg ~491M (5901M / 12). Vary by month.
  const baseRev = [380, 420, 460, 470, 490, 510, 500, 530, 540, 560, 575, 585];
  const baseFCF = baseRev.map(r => r * 0.34);
  const data = useMemo(() => {
    if (tab === "Stress") return { rev: baseRev.map(v => v*0.8), fcf: baseFCF.map(v => v*0.5) };
    if (tab === "12M")    return { rev: baseRev.map((v,i) => v + i*4), fcf: baseFCF.map((v,i) => v + i*2) };
    return { rev: baseRev, fcf: baseFCF };
  }, [tab]);

  const W = 460, H = 130, P = 8;
  const max = 620;
  const x = (i) => P + (i / (months.length - 1)) * (W - P*2);
  const y = (v) => H - P - (v / max) * (H - P*2);
  const linePath = (arr) => arr.map((v,i)=> (i===0?"M":"L") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  const areaPath = (arr) => linePath(arr) + ` L${x(months.length-1).toFixed(1)},${(H-P)} L${P},${(H-P)} Z`;

  return (
    <div className="chart-card">
      <div className="chart-head">
        <div className="t">Ingresos vs Free Cash Flow</div>
        <div className="sub">12M · Gs. millones</div>
      </div>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gRev" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#16C08C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#16C08C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[0.25,0.5,0.75].map((g,i)=>(
          <line key={i} x1={P} x2={W-P} y1={H-P-g*(H-P*2)} y2={H-P-g*(H-P*2)} stroke="#0F2D20" strokeOpacity="0.06" />
        ))}
        <path d={areaPath(data.rev)} fill="url(#gRev)" />
        <path d={linePath(data.rev)} fill="none" stroke="#0F2D20" strokeWidth="1.7" />
        <path d={linePath(data.fcf)} fill="none" stroke="#16C08C" strokeWidth="1.7" strokeDasharray="3 3" />
        {/* labels along bottom */}
        {months.map((m,i)=>(
          <text key={i} x={x(i)} y={H-1} fontSize="7" fill="#1A1F1E" opacity="0.45" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{m}</text>
        ))}
      </svg>
      <div className="chart-legend">
        <span><i style={{background:"#0F2D20"}}/>Ingresos</span>
        <span><i style={{background:"#16C08C"}}/>FCF</span>
      </div>
    </div>
  );
}

// ============================================================
// Marquee row
// ============================================================
function Marquee() {
  return (
    <div className="marquee">
      <div className="wrap marquee-row">
        <div className="label">Trabajamos con</div>
        <div className="items">
          <span>Agro</span>
          <span>Logística</span>
          <span>Restaurantes</span>
          <span>Empresas familiares</span>
          <span>Real estate</span>
          <span>Servicios</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, Marquee, BonsaiMark, Icon, OSPreview });
