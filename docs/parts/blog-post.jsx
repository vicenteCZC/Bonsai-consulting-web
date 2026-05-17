/* global React, ReactDOM */
/* Blog post viewer — reads ?slug=... and renders the matching post */

const { useState: useSP, useEffect: useEP, useMemo: useMP } = React;

function BlogPost() {
  const slug = useMP(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
  }, []);

  const post = useMP(() => {
    return (window.BLOG_POSTS || []).find((p) => p.slug === slug);
  }, [slug]);

  useEP(() => {
    document.title = (post ? post.title : "Post") + " — Bonsai Blog";
  }, [post]);

  if (!post) {
    return (
      <>
        <BlogPostNav />
        <main id="main">
          <section className="s" style={{paddingTop:120, textAlign:"center"}}>
            <div className="wrap">
              <h1 className="h-display" style={{fontSize:48}}>Post no encontrado</h1>
              <p style={{color:"var(--muted)", marginTop:18}}>
                El post que buscás no existe o fue movido.
              </p>
              <a href="index.html" className="btn btn-primary" style={{marginTop:24}}>
                Ver todos los posts <Icon.Arrow width="16" height="16" />
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const otherPosts = (window.BLOG_POSTS || []).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <BlogPostNav />
      <ReadingProgress />
      <main id="main">
        <article className="post-article">
          <div className="wrap" style={{maxWidth: 760}}>
            <a href="index.html" className="back-link" style={{marginBottom: 32}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
              Volver al blog
            </a>
            <div className="post-meta">
              <span className="blog-cat">{post.category}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>{window.formatBlogDate(post.date)}</span>
            </div>
            <h1 className="h-display post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-author">
              <div className="post-avatar">{post.author.split(" ").map(s=>s[0]).join("")}</div>
              <div>
                <div className="post-author-name">{post.author}</div>
                <div className="post-author-role">Bonsai Consulting</div>
              </div>
            </div>
          </div>
          <div className="post-cover" style={{background: post.cover}}>
            <div className="post-cover-mark">
              <BonsaiMark size={56} color="#16C08C" />
            </div>
          </div>
          <div className="wrap" style={{maxWidth: 760}}>
            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />

            <div className="post-share">
              <span className="eyebrow">¿Te resonó?</span>
              <div className="post-share-actions">
                <a className="btn btn-ghost" href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent("Mirá este post de Bonsai: " + window.location.href)}`}>
                  Compartir por email
                </a>
                <a className="btn btn-primary" href="../index.html#contacto">
                  Agendar diagnóstico <Icon.Arrow width="14" height="14" />
                </a>
              </div>
            </div>
          </div>
        </article>

        {otherPosts.length > 0 && (
          <section className="s" id="more" style={{paddingTop: 64, paddingBottom: 96, background: "var(--stone-2)"}}>
            <div className="wrap">
              <span className="eyebrow">Seguir leyendo</span>
              <h2 className="h-display" style={{marginTop:14, fontSize:36, marginBottom:32}}>
                Más del blog
              </h2>
              <div className="blog-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
                {otherPosts.map((p, i) => <BlogCard key={p.slug} post={p} idx={i+1} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

function BlogPostNav() {
  const [open, setOpen] = useSP(false);
  useEP(() => {
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
          <a href="../sobre.html" onClick={() => setOpen(false)}>Sobre nosotros</a>
          <a href="index.html" onClick={() => setOpen(false)} className="active">Blog</a>
          <a href="../index.html#contacto" className="mobile-cta" onClick={() => setOpen(false)}>
            Agendar diagnóstico <Icon.Arrow width="16" height="16" />
          </a>
        </div>
      </div>
    </nav>
  );
}

function BlogCard({ post }) {
  return (
    <a className="blog-card" href={`post.html?slug=${post.slug}`}>
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

ReactDOM.createRoot(document.getElementById("root")).render(<BlogPost />);
