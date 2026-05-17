/* global React, ReactDOM */
/* Bonsai Admin — DEMO panel that edits hero copy, brand color, and language.
   Stores overrides in localStorage and applies them on page load.
   NOT a real backend — this is a UX prototype.
   Password: bonsai */

const { useState: useSAd, useEffect: useEAd, useRef: useRAd } = React;

const ADMIN_KEY = "bonsai-admin";
const ADMIN_PASS = "bonsai";

// ============================================================
// 1. Apply overrides on every page load (called before React renders too)
// ============================================================
function applyAdminOverrides() {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}");
  } catch (e) {}
  if (data.accent) {
    document.documentElement.style.setProperty("--green", data.accent);
    document.documentElement.style.setProperty("--green-2", shadeColor(data.accent, -15));
  }
  // Hero copy override
  if (data.heroEyebrow || data.heroLead || data.heroTitle) {
    const observer = new MutationObserver(() => {
      const eyebrow = document.querySelector(".hero .eyebrow");
      const h1 = document.querySelector(".hero h1");
      const lead = document.querySelector(".hero p.lead");
      if (eyebrow && data.heroEyebrow) eyebrow.textContent = data.heroEyebrow;
      if (lead && data.heroLead) lead.textContent = data.heroLead;
      if (h1 && data.heroTitle) {
        const em = h1.querySelector("em");
        if (em && data.heroTitleEm) em.textContent = data.heroTitleEm;
        // Replace the title surrounding em — careful structure
        const parts = data.heroTitle.split("{em}");
        if (parts.length === 2) {
          h1.innerHTML = parts[0] + `<em>${data.heroTitleEm || (em ? em.textContent : "")}</em>` + parts[1];
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 4000);
  }
}

function shadeColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (percent / 100) * 255)));
  return "#" + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
}

// Apply immediately
applyAdminOverrides();

// ============================================================
// 2. Admin panel UI
// ============================================================
function AdminApp() {
  const [showTrigger, setShowTrigger] = useSAd(false);
  const [open, setOpen] = useSAd(false);
  const [authed, setAuthed] = useSAd(false);
  const [pass, setPass] = useSAd("");
  const [data, setData] = useSAd({});
  const [savedTick, setSavedTick] = useSAd(0);

  // Keyboard shortcut: Cmd/Ctrl + Shift + A to reveal admin trigger
  useEAd(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowTrigger(true);
      }
    };
    window.addEventListener("keydown", onKey);

    // Also reveal trigger if URL has ?admin=1
    if (new URLSearchParams(window.location.search).get("admin") === "1") {
      setShowTrigger(true);
    }

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Load saved data
  useEAd(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}");
      setData(saved);
    } catch (e) {}
  }, []);

  const tryLogin = () => {
    if (pass === ADMIN_PASS) {
      setAuthed(true);
      setPass("");
    } else {
      alert("Contraseña incorrecta. (Pista: bonsai)");
    }
  };

  const update = (key, value) => {
    const next = { ...data, [key]: value };
    setData(next);
  };

  const save = () => {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
    setSavedTick((v) => v + 1);
    // Apply live
    if (data.accent) {
      document.documentElement.style.setProperty("--green", data.accent);
      document.documentElement.style.setProperty("--green-2", shadeColor(data.accent, -15));
    }
    const eyebrow = document.querySelector(".hero .eyebrow");
    const h1 = document.querySelector(".hero h1");
    const lead = document.querySelector(".hero p.lead");
    if (eyebrow && data.heroEyebrow) eyebrow.textContent = data.heroEyebrow;
    if (lead && data.heroLead) lead.textContent = data.heroLead;
    if (h1 && data.heroTitle) {
      const parts = data.heroTitle.split("{em}");
      if (parts.length === 2) {
        h1.innerHTML = parts[0] + `<em>${data.heroTitleEm || ""}</em>` + parts[1];
      }
    }
    setTimeout(() => setSavedTick(0), 2000);
  };

  const reset = () => {
    if (!confirm("¿Restaurar todos los valores originales?")) return;
    localStorage.removeItem(ADMIN_KEY);
    setData({});
    location.reload();
  };

  const exportJson = () => {
    const json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert("JSON copiado al portapapeles. Lo podés pegar en cualquier lado.");
    });
  };

  if (!showTrigger) return null;

  // Login modal
  if (!authed && open) {
    return (
      <div className="admin-login-modal" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="admin-login">
          <h2>Acceso al panel</h2>
          <p>Esta es una versión demo. Probá con la contraseña <b>bonsai</b>.</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") tryLogin(); }}
            autoFocus
          />
          <button onClick={tryLogin}>Entrar</button>
          <div className="hint">DEMO · datos guardados localmente en este navegador</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        className="admin-trigger"
        onClick={() => setOpen(true)}
        aria-label="Abrir panel admin"
        title="Admin panel (Cmd/Ctrl + Shift + A)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v2"/><path d="M12 20v2"/>
          <path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/>
          <path d="M2 12h2"/><path d="M20 12h2"/>
          <path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/>
        </svg>
      </button>

      <aside className={"admin-panel" + (open ? " open" : "")} role="dialog" aria-label="Panel admin">
        <div className="admin-head">
          <h2>Admin <span className="badge">Demo</span></h2>
          <button className="admin-close" aria-label="Cerrar" onClick={() => setOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="admin-body">
          <div className="admin-section">
            <h3>Hero — Headline</h3>
            <div className="admin-field">
              <label>Eyebrow</label>
              <input
                type="text"
                value={data.heroEyebrow || ""}
                placeholder="Consultora AI-native · Asunción / LATAM"
                onChange={(e) => update("heroEyebrow", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Título (usá <b>{`{em}`}</b> para marcar la palabra resaltada)</label>
              <textarea
                value={data.heroTitle || ""}
                placeholder="Convertimos operaciones manuales en {em}."
                onChange={(e) => update("heroTitle", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Palabra resaltada</label>
              <input
                type="text"
                value={data.heroTitleEm || ""}
                placeholder="sistemas inteligentes"
                onChange={(e) => update("heroTitleEm", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Subtítulo (lead)</label>
              <textarea
                value={data.heroLead || ""}
                placeholder="Diseñamos software, automatizaciones..."
                onChange={(e) => update("heroLead", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-section">
            <h3>Color de acento</h3>
            <div className="admin-color-row">
              {[
                "#16C08C",  // verde Bonsai
                "#C9A14A",  // dorado
                "#E07A5F",  // terracota
                "#4F8FB5",  // azul
                "#9B6BC9",  // violeta
                "#D9484F",  // rojo
              ].map((c) => (
                <button
                  key={c}
                  className={"admin-color-swatch" + (data.accent === c ? " on" : "")}
                  style={{background: c}}
                  onClick={() => update("accent", c)}
                  aria-label={"Color " + c}
                />
              ))}
            </div>
          </div>

          <div className="admin-section">
            <h3>Estado</h3>
            <p style={{fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5}}>
              Los cambios se guardan en este navegador (localStorage). En producción,
              se conectarían a un backend o CMS. Probá los cambios en vivo con <b>Guardar</b>.
            </p>
            {savedTick > 0 && (
              <div style={{
                marginTop: 12, fontSize: 12.5, color: "var(--green-2)",
                fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
              }}>
                ✓ Guardado · refrescá para ver el cambio completo
              </div>
            )}
          </div>
        </div>

        <div className="admin-foot">
          <div className="row">
            <button className="save" onClick={save}>Guardar</button>
            <button className="export" onClick={exportJson}>Exportar JSON</button>
          </div>
          <button className="reset" onClick={reset}>Restaurar original</button>
        </div>
      </aside>
    </>
  );
}

// Mount admin into a portal node
function mountAdmin() {
  let mount = document.getElementById("admin-root");
  if (!mount) {
    mount = document.createElement("div");
    mount.id = "admin-root";
    document.body.appendChild(mount);
  }
  ReactDOM.createRoot(mount).render(<AdminApp />);
}

// Wait for React to be ready
if (typeof React !== "undefined" && typeof ReactDOM !== "undefined") {
  setTimeout(mountAdmin, 200);
}

Object.assign(window, { AdminApp, applyAdminOverrides });
