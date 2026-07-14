const ITEMS = [
  "WordPress",
  "Shopify",
  "Symfony",
  "React",
  "Vue.js",
  "Figma",
  "Adobe XD",
  "PHP / MySQL",
  "API REST",
  "Git / CI-CD",
  "React Native",
  "WooCommerce",
];

export default function Ticker() {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span className="ticker-item" key={i}>
            {item} <span className="star">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
