function displayCurrentDate(divSelector) {
  const dateDiv = document.querySelector(divSelector);
  if (!dateDiv) return;
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateDiv.innerText = now.toLocaleDateString(undefined, options);
}

displayCurrentDate('.date');