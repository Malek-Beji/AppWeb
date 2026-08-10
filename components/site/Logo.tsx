/**
 * Marque AppWeb Plus — le « plus modulaire ».
 *
 * Cinq blocs qui composent le « + » du nom : quatre en or, et celui du haut en
 * crème, détaché — c'est ce que l'agence ajoute au client. Les intervalles entre
 * les blocs font la marque : sans eux on lit une croix pleine.
 *
 * Géométrie figée dans une viewBox 1024 pour rester nette à toute taille ;
 * les couleurs suivent les jetons de marque (--accent / --white).
 */

type MarkProps = {
  /** Côté du carré, en pixels. */
  size?: number;
  /** `ink` (défaut) sur fond sombre, `light` sur fond clair. */
  tone?: "ink" | "light";
  className?: string;
};

export function LogoMark({ size = 32, tone = "ink", className }: MarkProps) {
  const blocks = tone === "light" ? "#08090d" : "#c8a96e";
  const top = tone === "light" ? "#b08d47" : "#f5f3ef";

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="AppWeb Plus"
      focusable="false"
    >
      <g fill={blocks}>
        <rect x="178" y="415" width="208" height="208" rx="52" />
        <rect x="408" y="415" width="208" height="208" rx="52" />
        <rect x="638" y="415" width="208" height="208" rx="52" />
        <rect x="408" y="645" width="208" height="208" rx="52" />
      </g>
      <rect x="408" y="171" width="208" height="208" rx="52" fill={top} />
    </svg>
  );
}

type LogoProps = MarkProps & {
  /** Masque le nom et ne laisse que la marque (utile en très petit). */
  markOnly?: boolean;
};

/** Marque + nom, verrouillés ensemble. */
export default function Logo({
  size = 30,
  tone = "ink",
  markOnly = false,
  className,
}: LogoProps) {
  return (
    <span className={`brand-lockup${className ? ` ${className}` : ""}`}>
      <LogoMark size={size} tone={tone} />
      {!markOnly && (
        <span className="brand-name" aria-hidden="true">
          AppWeb<span className="dot">+</span>
        </span>
      )}
    </span>
  );
}
