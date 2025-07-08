const timeFields = ["hours", "minutes", "seconds"];
const timeDivs = {};
let timerInterval = null;
let timerState = "stopped";
let initialTime = { hours: 0, minutes: 0, seconds: 0 };
let currentTime = { hours: 0, minutes: 0, seconds: 0 };

function updateDisplay() {
  timeFields.forEach(field => {
    timeDivs[field].innerText = currentTime[field].toString().padStart(2, "0");
  });
}

function getTotalMs(time) {
  return (
    parseInt(time.hours, 10) * 60 * 60 * 1000 +
    parseInt(time.minutes, 10) * 60 * 1000 +
    parseInt(time.seconds, 10) * 1000
  );
}

function setTimeFromMs(ms) {
  ms = Math.max(0, ms);
  currentTime.hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  currentTime.minutes = Math.floor(ms / 60000);
  ms %= 60000;
  currentTime.seconds = Math.floor(ms / 1000);
}

timeFields.forEach(className => {
  const div = document.querySelector(`.time .${className}`);
  timeDivs[className] = div;
  div.addEventListener("click", function handleClick() {
    if (div.querySelector("input") || timerState === "running") return;

    const oldValue = div.innerText;
    const input = document.createElement("input");
    input.className = "tempInput";
    input.type = "number";
    input.value = oldValue;
    input.min = "0";
    if (className === "seconds" || className === "minutes") input.max = "59";
    else input.max = "99";

    div.innerText = "";
    div.appendChild(input);
    input.focus();

    function setValue() {
      let val = parseInt(input.value, 10);
      if (isNaN(val)) val = 0;
      if (val < 0) val = 0;
      if ((className === "seconds" || className === "minutes") && val > 59) val = 59;
      else if (className === "hours" && val > 99) val = 99;
      div.innerText = val.toString().padStart(2, "0");
      currentTime[className] = val;
      initialTime[className] = val;
    }

    input.addEventListener("blur", () => {
      setValue();
    });

    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        setValue();
        input.blur();
      } else if (e.key === "Escape") {
        div.innerText = oldValue;
      }
    });
  });
});

function startTimer() {
  if (timerInterval) return;
  timerState = "running";
  timerInterval = setInterval(() => {
    let ms = getTotalMs(currentTime) - 1000;
    setTimeFromMs(ms);
    updateDisplay();
    if (ms <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerState = "stopped";
      const icon = document.querySelector(".start-stop i");
      const span = document.querySelector(".start-stop span");
      setTimeout(() => {
        icon.className = "fa-sharp fa-solid fa-play";
        span.innerText = "Start";
      }, 1000);
    }
  }, 1000);
}

function pauseTimer() {
  timerState = "paused";
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  if (timerState === "running") {
    currentTime = { ...initialTime };
    timerState = "stopped";
  } else {
    currentTime = { hours: 0, minutes: 0, seconds: 0 };
    initialTime = { hours: 0, minutes: 0, seconds: 0 };
    timerState = "stopped";
  }
  updateDisplay();
}

document.querySelector(".start-stop").addEventListener('click', () => {
  const icon = document.querySelector(".start-stop i");
  const span = document.querySelector(".start-stop span");
  if (timerState !== "running" &&
    currentTime.hours === 0 &&
    currentTime.minutes === 0 &&
    currentTime.seconds === 0) {
      return;
  }
  if (timerState === "running") {
    pauseTimer();
    icon.className = "fa-sharp fa-solid fa-play";
    span.innerText = "Start";
  } else {
    startTimer();
    icon.className = "fa-sharp fa-solid fa-pause";
    span.innerText = "Pause";
  }
});

document.querySelector(".reset").addEventListener('click', () => {
  resetTimer();
  const icon = document.querySelector(".start-stop i");
  const span = document.querySelector(".start-stop span");
  icon.className = "fa-sharp fa-solid fa-play";
  span.innerText = "Start";
});

window.addEventListener("DOMContentLoaded", () => {
  timeFields.forEach(field => {
    const val = parseInt(timeDivs[field].innerText, 10) || 0;
    currentTime[field] = val;
    initialTime[field] = val;
  });
  updateDisplay();
});