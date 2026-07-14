const SERVICES = [
  {
    num: "01",
    name: "Création de sites web",
    desc: "Sites vitrine, e-commerce et plateformes sur mesure — modernes, rapides et optimisés SEO pour maximiser votre visibilité.",
    tags: ["WordPress", "Shopify", "WooCommerce"],
  },
  {
    num: "02",
    name: "Applications mobiles",
    desc: "Applications iOS & Android natives ou cross-platform. Expérience utilisateur irréprochable, performance optimisée.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    num: "03",
    name: "Design & Intégration",
    desc: "Identité visuelle, UI/UX et intégration pixel-perfect depuis Figma ou Adobe XD — fidèle à la maquette, sans compromis.",
    tags: ["Figma", "Adobe XD", "Sketch"],
  },
  {
    num: "04",
    name: "Solutions sur mesure",
    desc: "Développement d'outils métiers, APIs RESTful et modules personnalisés adaptés à vos processus uniques.",
    tags: ["Symfony", "PHP", "API REST"],
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header reveal">
          <div>
            <span className="s-label">Services</span>
            <h2 className="s-title">
              Ce que nous
              <br />
              construisons
            </h2>
          </div>
          <p className="s-sub">
            Des solutions digitales complètes et sur mesure — de la conception
            à la mise en production.
          </p>
        </div>

        <div className="services-list reveal">
          {SERVICES.map((s) => (
            <div className="service-item" key={s.num}>
              <span className="si-num">{s.num}</span>
              <div className="si-name">{s.name}</div>
              <p className="si-desc">{s.desc}</p>
              <div className="si-tags">
                {s.tags.map((t) => (
                  <span className="si-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
