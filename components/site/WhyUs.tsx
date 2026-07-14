const WHY = [
  {
    num: "01",
    title: "Livraison rapide",
    desc: "Processus agile, délais tenus. Votre projet livré dans les temps, sans compromis sur la qualité.",
  },
  {
    num: "02",
    title: "Design moderne & mémorable",
    desc: "Interfaces élégantes et intuitives qui impressionnent vos utilisateurs dès la première visite.",
  },
  {
    num: "03",
    title: "Support continu 24/7",
    desc: "Accompagnement avant, pendant et après la livraison — maintenance, mises à jour, évolutions.",
  },
  {
    num: "04",
    title: "100% sur mesure",
    desc: "Aucun template générique. Chaque projet est conçu spécifiquement pour votre activité.",
  },
];

const STEPS = [
  {
    num: 1,
    title: "Découverte & Brief",
    desc: "Nous écoutons vos besoins, analysons votre marché et définissons ensemble les objectifs du projet.",
  },
  {
    num: 2,
    title: "Design & Prototype",
    desc: "Conception des maquettes sur Figma — vous validez chaque écran avant le développement.",
  },
  {
    num: 3,
    title: "Développement",
    desc: "Code propre, documenté, versionné sur Git. Accès à un tableau de bord de suivi en temps réel.",
  },
  {
    num: 4,
    title: "Tests & Mise en ligne",
    desc: "Tests complets sur tous les appareils, déploiement sécurisé et formation à la prise en main.",
  },
  {
    num: 5,
    title: "Suivi & Maintenance",
    desc: "Support continu, mises à jour régulières et évolutions selon vos retours post-lancement.",
  },
];

export default function WhyUs() {
  return (
    <section className="why">
      <div className="container">
        <div className="why-inner">
          <div>
            <span className="s-label">Pourquoi nous</span>
            <h2 className="s-title">
              Nos
              <br />
              <em>engagements</em>
            </h2>
            <p className="s-sub">
              Chaque collaboration repose sur des principes clairs. Voici ce
              que nous promettons — et tenons.
            </p>

            <div className="why-list reveal">
              {WHY.map((w) => (
                <div className="why-item" key={w.num}>
                  <span className="why-num">{w.num}</span>
                  <div className="why-content">
                    <h3>{w.title}</h3>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span
              className="s-label"
              style={{ marginBottom: "1.2rem", display: "inline-flex" }}
            >
              Notre processus
            </span>
            <div className="process-steps reveal">
              {STEPS.map((s) => (
                <div className="p-step" key={s.num}>
                  <div className="p-step-num">{s.num}</div>
                  <div className="p-step-content">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
