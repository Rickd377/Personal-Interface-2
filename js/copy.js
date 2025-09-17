document.querySelector('.copyright span').addEventListener('copy', function(e) {
  e.preventDefault();
  const link = this.querySelector('a').href;
  if (e.clipboardData) {
    e.clipboardData.setData('text/plain', link);
  } else if (window.clipboardData) {
    window.clipboardData.setData('Text', link);
  }
});