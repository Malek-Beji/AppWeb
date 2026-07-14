export default function Hero() {
  return (
    <section id="accueil">
      <div className="hero">
        <div className="hero-text">
          <div className="hero-eyebrow">Agence Digitale — 6+ ans d&apos;expertise</div>
          <h1>
            Créer des expériences
            <br />
            <em>digitales</em> qui
            <br />
            convertissent.
          </h1>
          <p className="hero-desc">
            Sites web, applications mobiles et solutions sur mesure — conçus
            avec précision pour propulser votre activité.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Démarrer un projet
            </a>
            <a href="#apropos" className="btn-ghost">
              Voir nos expertises
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot"></span>
              <span className="t-dot"></span>
              <span className="t-dot"></span>
              <span className="t-title">appweb.plus — terminal</span>
            </div>
            <div className="terminal-body">
              <div className="t-line">
                <span className="t-prompt">$</span>{" "}
                <span className="t-fn">init</span>{" "}
                <span className="t-str">new-project</span>
              </div>
              <div className="t-line">
                <span className="t-cm">{"// Configuration du stack technique"}</span>
              </div>
              <div className="t-line">
                <span className="t-kw">const</span> project = {"{"}
              </div>
              <div className="t-line">
                &nbsp;&nbsp;cms: [<span className="t-str">&apos;WordPress&apos;</span>,{" "}
                <span className="t-str">&apos;Shopify&apos;</span>],
              </div>
              <div className="t-line">
                &nbsp;&nbsp;backend: <span className="t-str">&apos;Symfony&apos;</span> +{" "}
                <span className="t-str">&apos;PHP&apos;</span>,
              </div>
              <div className="t-line">
                &nbsp;&nbsp;frontend: [<span className="t-str">&apos;React&apos;</span>,{" "}
                <span className="t-str">&apos;Vue.js&apos;</span>],
              </div>
              <div className="t-line">
                &nbsp;&nbsp;design: [<span className="t-str">&apos;Figma&apos;</span>,{" "}
                <span className="t-str">&apos;Adobe XD&apos;</span>],
              </div>
              <div className="t-line">
                <span className="t-cm">
                  {"}"}; <span className="t-prompt">{"// ✓ Prêt"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="hero-badge-float">
            <span className="badge-icon">⚡</span>
            <div className="badge-meta">
              <strong>Livraison garantie</strong>Délais respectés, qualité assurée
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-line"></span>Défiler
        </div>
        <div className="hero-line"></div>
      </div>
    </section>
  );
}
