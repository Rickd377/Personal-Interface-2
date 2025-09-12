const radios = document.querySelectorAll('.theme-picker input[type="radio"]');
const html = document.documentElement;
let current = localStorage.getItem('theme') || 'black';

html.dataset.theme = current;
radios.forEach(radio => {
  radio.checked = radio.value === current;
  radio.addEventListener('change', e => {
    if (e.target.checked) {
      html.dataset.theme = e.target.value;
      localStorage.setItem('theme', e.target.value);
      setTimeout(updateThemeColorMeta, 0);
    }
  });
});

// meta theme-color
function updateThemeColorMeta() {
  const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--border").trim();
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement("meta");
    metaThemeColor.name = "theme-color";
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.setAttribute('content', themeColor);
}

updateThemeColorMeta();