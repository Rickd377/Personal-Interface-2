function displayCurrentTime() {
  const clockDiv = document.querySelector(".clock");
  if (!clockDiv) return;

  let timeSpan = clockDiv.querySelector("span");
  if (!timeSpan) {
    timeSpan = document.createElement("span");
    clockDiv.appendChild(timeSpan);
  }

  function updateTime() {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    timeSpan.innerText = `${hh}:${mm}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

displayCurrentTime();