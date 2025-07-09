function displayCurrentDate() {
  const dateDiv = document.querySelector(".date");
  if (!dateDiv) return;
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateDiv.innerText = now.toLocaleDateString(undefined, options);
}

displayCurrentDate();