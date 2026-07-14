import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <span className="s-label">Erreur 404</span>
      <h1 className="s-title">
        Cette page n&apos;existe <em>pas</em>
      </h1>
      <p className="s-sub" style={{ margin: "0 auto 2rem" }}>
        La page que vous cherchez a peut-être été déplacée ou supprimée.
      </p>
      <Link href="/" className="btn-primary">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
