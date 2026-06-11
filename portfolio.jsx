/* butiDev — single-page bilingual portfolio app */
const { useState, useEffect, useRef, useCallback } = React;

const LANG_KEY = "butidev_lang";
function waHref(msg) { return "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(msg); }

/* ---------------- hooks ---------------- */
function useReveal(dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.in)"));
    const reveal = (el) => {
      const d = el.getAttribute("data-delay");
      if (d) el.style.transitionDelay = d + "ms";
      el.classList.add("in");
    };
    const vh = window.innerHeight || 800;
    els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < vh * 0.92) reveal(el); });
    if (!("IntersectionObserver" in window)) { els.forEach(reveal); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    const fallback = setTimeout(() => document.querySelectorAll("[data-reveal]:not(.in)").forEach(reveal), 1400);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [dep]);
}

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["problema", "porque", "servicios", "proyectos", "proceso", "contacto"];
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const mid = window.scrollY + window.innerHeight * 0.34;
      let cur = "";
      for (const id of ids) { const el = document.getElementById(id); if (el && el.offsetTop <= mid) cur = id; }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { scrolled, active };
}

/* ---------------- logo ---------------- */
function Logo({ dark }) {
  return (
    <a className="logo" href="#top" aria-label="butiDev inicio">
      <span className="logo-mark"><img src="assets/butidev-emblem.png" alt="butiDev" /></span>
      <span style={dark ? { color: "var(--cream)" } : null}>
        <span className="b">buti</span>
        <span className="d">Dev</span>
      </span>
    </a>
  );
}

/* ---------------- language toggle ---------------- */
function LangToggle({ lang, setLang, dark }) {
  return (
    <div className={"lang-toggle" + (dark ? " on-dark" : "")} role="group" aria-label="Idioma / Language">
      {["es", "en"].map((l) => (
        <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)}
          aria-pressed={lang === l}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

/* ---------------- nav ---------------- */
function Nav({ scrolled, active, onJump, c, lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <Logo />
        <div className="nav-links">
          {c.nav.map((n) => (
            <a key={n.id} href={"#" + n.id} className={"nav-link" + (active === n.id ? " active" : "")}
              onClick={(e) => { e.preventDefault(); onJump(n.id); }}>{n.label}</a>
          ))}
        </div>
        <div className="nav-cta">
          <LangToggle lang={lang} setLang={setLang} />
          <a className="btn btn-primary" href="#contacto" onClick={(e) => { e.preventDefault(); onJump("contacto"); }}>
            {c.navCta} <ArrowR />
          </a>
          <button className={"burger" + (open ? " open" : "")} aria-label="Menú" onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        {c.nav.map((n) => (
          <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); setOpen(false); onJump(n.id); }}>{n.label}</a>
        ))}
        <a className="btn btn-primary" href="#contacto" onClick={(e) => { e.preventDefault(); setOpen(false); onJump("contacto"); }}>
          {c.navCta} <ArrowR />
        </a>
      </div>
    </nav>
  );
}

/* ---------------- hero ---------------- */
function Hero({ onJump, c }) {
  const h = c.hero, cc = h.code;
  return (
    <section className="hero bg-cream" id="top" data-screen-label="Hero">
      <div className="wrap hero-grid">
        <div className="hero-head">
          <div className="kicker" data-reveal style={{ marginBottom: 28 }}>
            <span className="dot"></span> {h.kicker}
          </div>
          <h1 className="display" data-reveal data-delay="60">
            {h.title[0]}<br />{h.title[1]}<br />
            <span className="hero-line2">{h.accent}<Squiggle /></span>
          </h1>
          <p className="lead muted" data-reveal data-delay="160" style={{ marginTop: 34, maxWidth: 520 }}>
            {h.subPre}<strong style={{ color: "var(--black)", fontWeight: 700 }}>{h.subStrong}</strong>{h.subPost}
          </p>
          <div className="cta-row" data-reveal data-delay="240" style={{ marginTop: 40, position: "relative" }}>
            <a className="btn btn-primary btn-lg" href="#contacto" onClick={(e) => { e.preventDefault(); onJump("contacto"); }}>
              {h.ctaPrimary} <ArrowR size={18} />
            </a>
            <a className="btn btn-ghost btn-lg" href="#proyectos" onClick={(e) => { e.preventDefault(); onJump("proyectos"); }}>
              {h.ctaSecondary}
            </a>
            <CurvyArrow size={86} style={{ position: "absolute", left: -104, top: -16, transform: "scaleX(-1) rotate(-8deg)", opacity: 0.85 }} />
          </div>
        </div>

        <div className="hero-panel" data-reveal data-delay="200">
          <div className="codecard">
            <div className="codecard-bar">
              <span className="d" style={{ background: "#E0A06F" }}></span>
              <span className="d" style={{ background: "#7FC9A0" }}></span>
              <span className="d" style={{ background: "#7FB0E6" }}></span>
              <span className="label">{cc.file}</span>
            </div>
            <div className="codecard-body">
              <div className="cl"><span className="ln">1</span><span><span className="c-com">{cc.c1}</span></span></div>
              <div className="cl"><span className="ln">2</span><span><span className="c-key">{cc.c2a}</span>{cc.c2b}<span className="c-key">{cc.c2c}</span>{cc.c2d}</span></div>
              <div className="cl"><span className="ln">3</span><span>&nbsp;</span></div>
              <div className="cl"><span className="ln">4</span><span><span className="c-key">{cc.c4a}</span>{cc.c4b}<span className="c-str">{cc.c4c}</span>{cc.c4d}</span></div>
              <div className="cl"><span className="ln">5</span><span>&nbsp;&nbsp;{cc.c5}</span></div>
              <div className="cl"><span className="ln">6</span><span>{cc.c6a}<span className="c-com">{cc.c6b}</span></span></div>
              <div className="cl"><span className="ln">7</span><span>&nbsp;</span></div>
              <div className="cl"><span className="ln">8</span><span><span className="c-ok">✓</span> <span className="c-com">{cc.c8}</span></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- problem + why (black) ---------------- */
function ProblemWhy({ c }) {
  const p = c.problem, w = c.why;
  return (
    <div className="bg-black">
      <section className="sec-pad" id="problema" data-screen-label="El problema">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "clamp(36px,5vw,80px)", alignItems: "center" }} className="pw-top">
            <div>
              <div className="kicker muted-d" data-reveal style={{ marginBottom: 24 }}><span className="dot"></span> {p.kicker}</div>
              <h2 className="h2" data-reveal data-delay="60">{p.title[0]}<br />{p.title[1]}</h2>
              <p className="lead muted-d" data-reveal data-delay="140" style={{ marginTop: 28, maxWidth: 540 }}>{p.body}</p>
            </div>
            <div data-reveal data-delay="180" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 26 }}>
              <Bulb size={56} style={{ color: "var(--terra)" }} />
              <Disconnect size={62} style={{ color: "var(--cream)", opacity: 0.85 }} />
              <p className="mono muted-d" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>{p.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(72px,11vw,150px)" }} id="porque" data-screen-label="Por qué butiDev">
        <div className="wrap">
          <div className="kicker muted-d" data-reveal style={{ marginBottom: 22 }}><span className="dot"></span> {w.kicker}</div>
          <h2 className="h2" data-reveal data-delay="60" style={{ marginBottom: 48, maxWidth: 720 }}>{w.title}</h2>
          <div className="why-grid">
            {w.reasons.map((r, i) => (
              <div className="card-d why-card" key={i} data-reveal data-delay={i * 90}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Check size={26} className="why-ico" />
                  <span className="why-num">0{i + 1}</span>
                </div>
                <h3 className="h3" style={{ marginTop: 4 }}>{r.title}</h3>
                <p className="muted-d" style={{ fontSize: 15.5 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- services (cream) ---------------- */
function Services({ c }) {
  const s = c.services;
  return (
    <section className="sec-pad bg-cream" id="servicios" data-screen-label="Lo que hacemos">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 50 }}>
          <div>
            <div className="kicker" data-reveal style={{ marginBottom: 22 }}><span className="dot"></span> {s.kicker}</div>
            <h2 className="h2" data-reveal data-delay="60" style={{ maxWidth: 640 }}>{s.title[0]}<br />{s.title[1]}</h2>
          </div>
          <div data-reveal data-delay="120" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "var(--terra)" }}>
            <Infinity8 size={42} />
            <span className="mono muted" style={{ fontSize: 12, marginTop: 8, letterSpacing: ".1em" }}>{s.infinity}</span>
          </div>
        </div>

        <div className="svc-grid">
          {s.items.map((sv, i) => (
            <div className="card svc-card" key={i} data-reveal data-delay={i * 100}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="ico"><Spark size={26} /></span>
                <span className="svc-idx">0{i + 1} / 03</span>
              </div>
              <h3 className="h3" style={{ marginTop: 6 }}>{sv.name}</h3>
              <p className="muted" style={{ fontSize: 15.5, flex: 1 }}>{sv.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 2 }}>
                {sv.points.map((pt, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Check size={17} style={{ color: "var(--blue)" }} />
                    <span className="mono" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div data-reveal style={{ marginTop: 54, textAlign: "center" }}>
          <p className="mono muted" style={{ fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 18 }}>{s.stackLabel}</p>
          <div className="stack-wrap">
            {STACK.map((t) => (<span className="badge badge-line" key={t}>{t}</span>))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- projects (cream, black cards) ---------------- */
function Projects({ onOpen, c }) {
  const p = c.projects;
  return (
    <section className="sec-pad bg-cream" id="proyectos" data-screen-label="Proyectos" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="kicker" data-reveal style={{ marginBottom: 22 }}><span className="dot"></span> {p.kicker}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
          <h2 className="h2" data-reveal data-delay="60" style={{ maxWidth: 620 }}>{p.title[0]}<br />{p.title[1]}</h2>
          <p className="mono muted" data-reveal data-delay="120" style={{ fontSize: 13.5, maxWidth: 260 }}>{p.hint}</p>
        </div>

        <div className="proj-grid">
          {p.items.map((pr, i) => (
            <button className="card-d proj-card" key={i} data-reveal data-delay={(i % 2) * 90}
              onClick={() => onOpen(i)} aria-label={p.open + " — " + pr.name}>
              <div className="proj-top">
                <span className="proj-idx">{p.labelTag.toUpperCase()} 0{i + 1}</span>
                <span className="proj-open">{p.open} <ArrowR size={14} /></span>
              </div>
              <div>
                <div className="proj-name">{pr.name}</div>
                <div className="proj-type" style={{ marginTop: 8 }}>{pr.type}</div>
              </div>
              <div className="proj-stack">{pr.stack.map((st) => (<span className="badge badge-line-d" key={st}>{st}</span>))}</div>
              <div className="proj-bullets">
                {pr.highlights.map((hl, j) => (
                  <div className="pb" key={j}><span className="ck"><Check size={16} /></span><span>{hl}</span></div>
                ))}
              </div>
              <div style={{ marginTop: "auto", paddingTop: 6 }}>
                <span className="tag-pill" style={{ background: "var(--terra)", color: "var(--offwhite)" }}>{pr.tag}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- process (black) ---------------- */
function Process({ c }) {
  const p = c.process;
  return (
    <section className="sec-pad bg-black" id="proceso" data-screen-label="Cómo trabajamos">
      <div className="wrap">
        <div className="kicker muted-d" data-reveal style={{ marginBottom: 22 }}><span className="dot"></span> {p.kicker}</div>
        <h2 className="h2" data-reveal data-delay="60" style={{ marginBottom: 64, maxWidth: 680 }}>{p.title[0]}<br />{p.title[1]}</h2>
        <div className="proc-grid">
          {p.steps.map((s, i) => (
            <div className="proc-step" key={i} data-reveal data-delay={i * 100}>
              <div className="proc-num">{s.n}</div>
              <div className="proc-title">{s.title}</div>
              <div className="proc-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- final CTA + form (cream) ---------------- */
function FinalCTA({ c }) {
  const t = c.cta;
  const [form, setForm] = useState({ nombre: "", contacto: "", caso: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: "" })); };
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.nombre.trim()) er.nombre = t.errName;
    if (!form.contacto.trim()) er.contacto = t.errContact;
    if (form.caso.trim().length < 8) er.caso = t.errCase;
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <section className="sec-pad bg-cream" id="contacto" data-screen-label="Contacto">
      <div className="wrap cta-final">
        <div className="kicker" data-reveal style={{ marginBottom: 26 }}><span className="dot"></span> {t.kicker}</div>
        <h2 className="display" data-reveal data-delay="60" style={{ fontSize: "clamp(40px,7vw,92px)", maxWidth: 980 }}>{t.title[0]}<br />{t.title[1]}</h2>
        <p className="lead muted" data-reveal data-delay="140" style={{ marginTop: 26, marginBottom: 44, maxWidth: 560, position: "relative" }}>
          {t.sub}
          <Check size={40} style={{ color: "var(--terra)", position: "absolute", right: -54, top: -22 }} />
        </p>

        <div className="form-card" data-reveal data-delay="180">
          {!sent ? (
            <form onSubmit={submit} noValidate>
              <div className={"field" + (errors.nombre ? " err" : "")}>
                <label>{t.fName}</label>
                <input type="text" value={form.nombre} onChange={set("nombre")} placeholder={t.fNamePh} />
                {errors.nombre && <span className="msg">{errors.nombre}</span>}
              </div>
              <div className={"field" + (errors.contacto ? " err" : "")}>
                <label>{t.fContact}</label>
                <input type="text" value={form.contacto} onChange={set("contacto")} placeholder={t.fContactPh} />
                {errors.contacto && <span className="msg">{errors.contacto}</span>}
              </div>
              <div className={"field" + (errors.caso ? " err" : "")}>
                <label>{t.fCase}</label>
                <textarea rows="3" value={form.caso} onChange={set("caso")} placeholder={t.fCasePh}></textarea>
                {errors.caso && <span className="msg">{errors.caso}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 6 }}>
                {t.submit} <ArrowR size={18} />
              </button>
              <p className="mono muted" style={{ fontSize: 12, textAlign: "center", marginTop: 16 }}>{t.reassure}</p>
            </form>
          ) : (
            <div className="form-success">
              <span style={{ color: "var(--blue)" }}><Check size={56} /></span>
              <h3 className="h3">{t.successTitle} {form.nombre.split(" ")[0]}!</h3>
              <p className="muted" style={{ maxWidth: 400 }}>{t.successBody}</p>
              <a className="btn btn-wa" href={waHref(c.waMessage)} target="_blank" rel="noopener" style={{ marginTop: 4 }}>
                <Whatsapp size={20} /> {t.waBtn}
              </a>
              <a className="ig-link" href={INSTAGRAM_URL} target="_blank" rel="noopener"><Insta /> @butiDev</a>
            </div>
          )}
        </div>

        <a className="ig-link" data-reveal href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{ marginTop: 32 }}>
          <Insta /> @butiDev
        </a>
      </div>
    </section>
  );
}

/* ---------------- footer (black) ---------------- */
function Footer({ onJump, c, lang, setLang }) {
  const f = c.footer;
  return (
    <footer className="footer bg-black">
      <div className="wrap footer-inner">
        <div style={{ maxWidth: 340 }}>
          <a href="#top" className="logo-full" aria-label="butiDev inicio">
            <img src="assets/butidev-logo.png" alt="butiDev — Diagnóstico primero. Código después." />
          </a>
          <p className="muted-d" style={{ fontSize: 14.5, marginTop: 18 }}>{f.tagline}</p>
          <div style={{ marginTop: 20 }}><LangToggle lang={lang} setLang={setLang} dark /></div>
        </div>
        <div style={{ display: "flex", gap: "clamp(36px,6vw,90px)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <span className="mono muted-d" style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 4 }}>{f.navLabel}</span>
            {c.nav.map((n) => (
              <a key={n.id} href={"#" + n.id} className="mono" style={{ fontSize: 14, color: "var(--cream-soft)" }}
                onClick={(e) => { e.preventDefault(); onJump(n.id); }}>{n.label}</a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <span className="mono muted-d" style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 4 }}>{f.contactLabel}</span>
            <a className="mono" href={waHref(c.waMessage)} target="_blank" rel="noopener" style={{ fontSize: 14, color: "var(--cream-soft)", display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Whatsapp size={15} /> WhatsApp
            </a>
            <a className="mono" href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{ fontSize: 14, color: "var(--cream-soft)", display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Insta size={15} /> @butiDev
            </a>
            <span className="mono muted-d" style={{ fontSize: 14 }}>{f.city}</span>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid var(--line-on-dark)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span className="mono muted-d" style={{ fontSize: 13 }}>{f.rights}</span>
        <span className="mono muted-d" style={{ fontSize: 13 }}>{f.madeWith}</span>
      </div>
    </footer>
  );
}

/* ---------------- whatsapp floating button ---------------- */
function WhatsAppFab({ c }) {
  return (
    <a className="wa-fab" href={waHref(c.waMessage)} target="_blank" rel="noopener" aria-label="WhatsApp">
      <span className="wa-pulse"></span>
      <Whatsapp size={32} />
      <span className="wa-tip">{c.cta.waBtn}</span>
    </a>
  );
}

/* ---------------- project modal ---------------- */
function ProjectModal({ project, labels, onClose }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setShow(true));
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; cancelAnimationFrame(t); };
  }, []);
  const close = () => { setShow(false); setTimeout(onClose, 260); };
  if (!project) return null;
  return (
    <div className={"modal-back" + (show ? " show" : "")} onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={project.name}>
        <button className="modal-close" onClick={close} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none"><path d="M5 5 L19 19 M19 5 L5 19" /></svg>
        </button>
        <div className="modal-head">
          <span className="tag-pill" style={{ background: "var(--black)", color: "var(--cream)", marginBottom: 18 }}>{project.tag}</span>
          <h3 className="h2" style={{ fontSize: "clamp(30px,5vw,52px)" }}>{project.name}</h3>
          <p className="muted" style={{ fontSize: 16, marginTop: 12 }}>{project.type}</p>
        </div>
        <div className="modal-body">
          <p className="lead muted" style={{ fontSize: 17, lineHeight: 1.55 }}>{project.detail}</p>
          <div className="detail-block">
            <span className="detail-label">{labels.detailLabel}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {project.features.map((ft, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--terra)", flex: "none", marginTop: 2 }}><Check size={19} /></span>
                  <span style={{ fontSize: 15.5 }}>{ft}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-block">
            <span className="detail-label">{labels.stackLabel}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {project.stack.map((st) => (<span className="badge badge-line" key={st}>{st}</span>))}
            </div>
          </div>
          <a className="btn btn-dark" href="#contacto"
            onClick={(e) => { e.preventDefault(); close(); setTimeout(() => { const el = document.getElementById("contacto"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 280); }}
            style={{ marginTop: 32 }}>
            {labels.modalCta} <ArrowR />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- app ---------------- */
function App() {
  const { scrolled, active } = useScrollState();
  const [lang, setLangState] = useState(() => {
    try { const s = localStorage.getItem(LANG_KEY); if (s === "es" || s === "en") return s; } catch (e) {}
    return "es";
  });
  const [openIdx, setOpenIdx] = useState(null);
  const c = CONTENT[lang];
  useReveal(lang);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  }, []);

  const jump = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: id === "top" ? 0 : y, behavior: "smooth" });
    }
  }, []);

  return (
    <React.Fragment>
      <Nav scrolled={scrolled} active={active} onJump={jump} c={c} lang={lang} setLang={setLang} />
      <main>
        <Hero onJump={jump} c={c} />
        <ProblemWhy c={c} />
        <Services c={c} />
        <Projects onOpen={setOpenIdx} c={c} />
        <Process c={c} />
        <FinalCTA c={c} />
      </main>
      <Footer onJump={jump} c={c} lang={lang} setLang={setLang} />
      <WhatsAppFab c={c} />
      {openIdx !== null && (
        <ProjectModal project={c.projects.items[openIdx]} labels={c.projects} onClose={() => setOpenIdx(null)} />
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
