function displayCurrentDate() {
  const dateDiv = document.querySelector(".date");
  if (!dateDiv) return;
  let dateSpan = dateDiv.querySelector("span");
  if (!dateSpan) {
    dateSpan = document.createElement("span");
    dateDiv.appendChild(dateSpan);
  }
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateSpan.innerText = now.toLocaleDateString(undefined, options);
}

displayCurrentDate();