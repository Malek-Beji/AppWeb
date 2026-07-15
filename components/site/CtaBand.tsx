import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box reveal">
          <div>
            <h2>
              Prêt à lancer
              <br />
              votre <em>prochain projet</em> ?
            </h2>
            <p>
              Parlons de vos besoins.{" "}
              <a href="tel:+21625789309">Appelez-nous directement</a> ou
              remplissez le formulaire — réponse garantie sous 24h.
            </p>
          </div>
          <div className="cta-right-block">
            <div className="cta-phone-num">+216 25 789 309</div>
            <Link href="/contact" className="btn-primary">
              Nous contacter maintenant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
