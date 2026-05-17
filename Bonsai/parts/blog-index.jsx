/* global React, ReactDOM */
/* Blog index — list of posts */

const { useState: useSB, useEffect: useEB, useMemo: useMB } = React;

function BlogIndex() {
  const [category, setCategory] = useSB("Todos");
  const posts = window.BLOG_POSTS || [];

  useEB(() => {
    document.title = "Blog — Bonsai Consulting";
  }, []);

  const filtered = useMB(() => {
    if (category === "Todos") return posts;
    return posts.filter((p) => p.category === category);
  }, [category, posts]);

  return (
    <>
      <BlogNav />
      <main id="main">
        <BlogHeader />
        <section className="s" id="posts" style={{paddingTop:48, paddingBottom: 96}}>
          <div className="wrap">
            <div className="blog-filters" role="tablist" aria-label="Categorías">
              {(window.BLOG_CATEGORIES || []).map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  className={"blog-filter" + (category === c ? " on" : "")}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="blog-grid">
              {filtered.map((p, i) => (
                <BlogCard key={p.slug} post={p} idx={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p style={{color:"var(--muted)", marginTop:32, textAlign:"center"}}>
                No hay posts en esta categoría todavía.
              </p>
            )}
          </div>
        </section>
        <BlogNewsletter />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

function BlogNav() {
  const [open, setOpen] = useSB(false);
  useEB(() => {
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
          <a href="../index.html#servicios">Servicios</a>
          <a href="../sobre.html">Sobre nosotros</a>
          <a href="index.html" className="active">Blog</a>
          <a href="../index.html#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="../index.html#contacto">
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
          <a href="../index.html" onClick={() => setOpen(false)}>Home</a>
          <a href="../index.html#divisiones" onClick={() => setOpen(false)}>Divisiones</a>
          <a href="../sobre.html" onClick={() => setOpen(false)}>Sobre nosotros</a>
          <a href="index.html" onClick={() => setOpen(false)} className="active">Blog</a>
          <a href="../index.html#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href="../index.html#contacto" className="mobile-cta" onClick={() => setOpen(false)}>
            Agendar diagnóstico <Icon.Arrow width="16" height="16" />
          </a>
        </div>
      </div>
    </nav>
  );
}

function BlogHeader() {
  return (
    <section className="blog-header">
      <div className="subtle-grid" />
      <div className="wrap">
        <span className="eyebrow">Diario de Bonsai</span>
        <h1 className="h-display" style={{marginTop:16}}>
          Notas sobre <em>sistemas</em>,<br/>estrategia y crecimiento.
        </h1>
        <p className="lead" style={{marginTop:18, maxWidth:600, fontSize:18}}>
          Cómo pensamos los problemas que vemos en empresas en crecimiento. Lectura corta, opinión directa, ejemplos reales.
        </p>
      </div>
    </section>
  );
}

function BlogCard({ post, idx }) {
  return (
    <a className={"blog-card" + (idx === 0 ? " featured" : "")} href={`post.html?slug=${post.slug}`}>
      <div className="blog-card-cover" style={{background: post.cover}}>
        <div className="blog-card-meta-top">
          <span className="blog-cat">{post.category}</span>
          <span className="blog-read">{post.readTime}</span>
        </div>
        <div className="blog-card-mark" aria-hidden="true">
          <BonsaiMark size={24} color="#16C08C" />
        </div>
      </div>
      <div className="blog-card-body">
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div className="blog-card-foot">
          <span>{post.author}</span>
          <span className="dot-sep">·</span>
          <span>{window.formatBlogDate(post.date)}</span>
        </div>
      </div>
    </a>
  );
}

function BlogNewsletter() {
  return (
    <section className="s" style={{paddingTop:0, paddingBottom: 64}}>
      <div className="wrap">
        <div className="cta-banner" style={{padding: "40px 48px"}}>
          <div>
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Newsletter</span>
            <h2 style={{
              marginTop:14, fontFamily:"var(--font-display)",
              fontSize:"clamp(24px, 3vw, 32px)",
              letterSpacing:"-0.02em", color:"var(--stone)", lineHeight:1.1,
            }}>
              Una nota cada dos semanas.<br/>Sin spam. Sin slop.
            </h2>
            <p>
              Pensamientos sobre estrategia, sistemas y crecimiento. Llega los viernes,
              dura 3 minutos, vale lo que dura.
            </p>
          </div>
          <form
            className="news-form"
            onSubmit={(e) => { e.preventDefault(); alert("Suscripción simulada — conectar a tu provider."); }}
          >
            <label htmlFor="news-email" className="sr-only">Email</label>
            <input
              id="news-email"
              type="email"
              required
              placeholder="tu@empresa.com"
            />
            <button type="submit" className="btn btn-primary">
              Suscribirme <Icon.Arrow width="14" height="14" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BlogIndex />);
