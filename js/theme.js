const select = document.getElementById('theme-select');
const html = document.documentElement;
let current = localStorage.getItem('theme') || 'white';
html.dataset.theme = current;
select.value = current;

select.addEventListener('change', e => {
  current = e.target.value;
  html.dataset.theme = current;
  localStorage.setItem('theme', current);
});