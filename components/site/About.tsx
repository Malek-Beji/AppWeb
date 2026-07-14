const EXPERTISE = [
  {
    num: "01 — CMS & E-commerce",
    icon: "🌐",
    title: "Développement CMS & E-commerce",
    desc: "Sites robustes et évolutifs sur les plateformes les plus utilisées. Boutiques, blogs, vitrines — livrés clé en main.",
    tags: ["WordPress", "Shopify", "WooCommerce"],
    gold: false,
  },
  {
    num: "02 — Back-end",
    icon: "⚙️",
    title: "Développement Symfony",
    desc: "Applications métier, APIs RESTful et portails sur mesure. Architectures solides, sécurisées et maintenables.",
    tags: ["Symfony", "PHP", "API REST", "MySQL"],
    gold: false,
  },
  {
    num: "03 — Design",
    icon: "🎨",
    title: "Intégration Pixel-Perfect",
    desc: "Votre maquette devient un site réel, fidèle au pixel près — depuis vos fichiers de design, sans compromis.",
    tags: ["Figma", "Adobe XD", "Sketch"],
    gold: true,
  },
  {
    num: "04 — Front-end",
    icon: "💻",
    title: "Front-end Moderne",
    desc: "Interfaces fluides, rapides et accessibles sur tous les écrans. Expériences utilisateur qui convertissent.",
    tags: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"],
    gold: false,
  },
  {
    num: "05 — Extensions",
    icon: "🛒",
    title: "Modules Sur Mesure",
    desc: "Fonctionnalités uniques pour WordPress et Shopify — développées spécifiquement pour vos besoins métier.",
    tags: ["Plugins WP", "Apps Shopify", "Hooks & APIs"],
    gold: false,
  },
  {
    num: "06 — Gestion",
    icon: "🔧",
    title: "Gestion & Versioning",
    desc: "Suivi rigoureux avec Git, déploiements sécurisés, collaboration fluide. Visibilité totale à chaque étape.",
    tags: ["Git", "GitHub / GitLab", "CI/CD", "Agile"],
    gold: false,
  },
];

const STATS = [
  { num: "100", suffix: "+", label: "Projets livrés" },
  { num: "6", suffix: "+", label: "Années d'expérience" },
  { num: "50", suffix: "+", label: "Clients satisfaits" },
  { num: "24/7", suffix: "", label: "Support client" },
];

export default function About() {
  return (
    <section id="apropos" className="about">
      <div className="container">
        <div className="about-head reveal">
          <span className="s-label">À propos</span>
          <h2 className="s-title">
            Une expertise <em>complète</em>
            <br />& éprouvée
          </h2>
          <p className="s-sub" style={{ margin: "1rem auto 0" }}>
            Depuis plus de 6 ans, AppWeb Plus accompagne entreprises et
            entrepreneurs dans la création de solutions web performantes — de
            la conception à la mise en ligne.
          </p>
        </div>

        <div className="expertise-grid reveal">
          {EXPERTISE.map((e) => (
            <div className="exp-card" key={e.num}>
              <span className="exp-num">{e.num}</span>
              <div className="exp-icon">{e.icon}</div>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              <div className="exp-tags">
                {e.tags.map((t) => (
                  <span className={`exp-tag${e.gold ? " gold" : ""}`} key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stats-row reveal">
          {STATS.map((s) => (
            <div className="stat-cell" key={s.label}>
              <div className="stat-num">
                {s.num}
                {s.suffix && <span style={{ fontSize: "2rem" }}>{s.suffix}</span>}
              </div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
