import Link from "next/link";

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-brand-logo">
              AppWeb<span>+</span>
            </span>
            <p>
              Votre partenaire pour l&apos;excellence digitale. Développement
              web, e-commerce et intégration sur mesure depuis plus de 6 ans
              en Tunisie.
            </p>
            <div className="socials">
              <a className="soc-btn" href="#" title="Facebook">
                f
              </a>
              <a className="soc-btn" href="#" title="Instagram">
                ig
              </a>
              <a className="soc-btn" href="#" title="LinkedIn">
                in
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services">Sites Web</Link>
              </li>
              <li>
                <Link href="/services">Applications Mobile</Link>
              </li>
              <li>
                <Link href="/services">Design & Intégration</Link>
              </li>
              <li>
                <Link href="/services">Solutions Sur Mesure</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Entreprise</h4>
            <ul>
              <li>
                <Link href="/apropos">À Propos</Link>
              </li>
              <li>
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:contact@appwebplus.tn">contact@appwebplus.tn</a>
              </li>
              <li>
                <a href="tel:+21625789309">+216 25 789 309</a>
              </li>
              <li>Tunis, Tunisie</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AppWeb Plus — Tous droits réservés</span>
          <span>Conçu & développé en Tunisie ♥</span>
        </div>
      </div>
    </footer>
  );
}
