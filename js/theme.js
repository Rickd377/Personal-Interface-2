const radios = document.querySelectorAll('.theme-picker input[type="radio"]');
const html = document.documentElement;
let current = localStorage.getItem('theme') || 'white';

html.dataset.theme = current;
radios.forEach(radio => {
  radio.checked = radio.value === current;
  radio.addEventListener('change', e => {
    if (e.target.checked) {
      html.dataset.theme = e.target.value;
      localStorage.setItem('theme', e.target.value);
    }
  });
});