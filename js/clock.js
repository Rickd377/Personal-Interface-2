function displayCurrentTime(divSelector) {
  const clockDiv = document.querySelector(divSelector);
  if (!clockDiv) return;

  function updateTime() {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");
    clockDiv.innerText = `${hh}:${mm}:${ss}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

displayCurrentTime('.clock');