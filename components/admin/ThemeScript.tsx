const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("admin-theme");
    if (stored !== "light") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
