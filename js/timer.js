const timeFields = ["hours", "minutes", "seconds"];
const timeDivs = {};
let timerInterval = null;
let timerState = "stopped";
let mode = "timer"
let resetToZeroNext = false
let initialTime = { hours: 0, minutes: 0, seconds: 0 };
let currentTime = { hours: 0, minutes: 0, seconds: 0 };

function updateDisplay() {
  timeFields.forEach(field => {
    timeDivs[field].innerText = currentTime[field].toString().padStart(2, "0");
  });
}

function saveInitialTime() {
  localStorage.setItem("timerInitialTime", JSON.stringify(initialTime));
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

function loadInitialTime() {
  const saved = localStorage.getItem("timerInitialTime");
  if (saved) {
    try {
      const obj = JSON.parse(saved);
      initialTime.hours = obj.hours || 0;
      initialTime.minutes = obj.minutes || 0;
      initialTime.seconds = obj.seconds || 0;
      currentTime = { ...initialTime };
    } catch {}
  }
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
      saveInitialTime(); // Save after change
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

function startTimerOrStopwatch () {
  if (timerInterval) return;
  timerState = "running";
  if (mode === "timer") {
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
        icon.className = "fa-sharp fa-solid fa-play";
        span.innerText = "Start"
      }
    }, 1000);
  } else if (mode === "stopwatch") {
    timerInterval = setInterval(() => {
      let ms = getTotalMs(currentTime) + 1000;
      setTimeFromMs(ms);
      updateDisplay();
    }, 1000);
  }
}

function pauseTimerOrStopwatch() {
  timerState = "paused";
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimerOrStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerState = "stopped";
  if (mode === "timer") {
    const isAtInitial =
      currentTime.hours === initialTime.hours &&
      currentTime.minutes === initialTime.minutes &&
      currentTime.seconds === initialTime.seconds;

    if (!resetToZeroNext || !isAtInitial) {
      loadInitialTime();
      currentTime = { ...initialTime };
      resetToZeroNext = true;
    } else {
      currentTime = { hours: 0, minutes: 0, seconds: 0 };
      initialTime = { hours: 0, minutes: 0, seconds: 0 };
      saveInitialTime();
      resetToZeroNext = false;
    }
  } else {
    currentTime = { hours: 0, minutes: 0, seconds: 0 };
    resetToZeroNext = false;
  }
  updateDisplay();
}

document.querySelector(".start-stop").addEventListener("click", () => {
  const icon = document.querySelector(".start-stop i");
  const span = document.querySelector(".start-stop span");

  if (
    timerState !== "running" &&
    currentTime.hours === 0 &&
    currentTime.minutes === 0 &&
    currentTime.seconds === 0
  ) {
    mode = "stopwatch";
  } else if (
    timerState !== "running" &&
    (initialTime.hours !== 0 || initialTime.minutes !== 0 || initialTime.seconds !== 0)
  ) {
    mode = "timer";
  }
  if (timerState === "running") {
    pauseTimerOrStopwatch();
    icon.className = "fa-sharp fa-solid fa-play";
    span.innerText = "Start"
  } else {
    startTimerOrStopwatch();
    icon.className = "fa-sharp fa-solid fa-pause";
    span.innerText = "Pause";
  }
});

document.querySelector(".reset").addEventListener("click", () => {
  resetTimerOrStopwatch();
  const icon = document.querySelector(".start-stop i");
  const span = document.querySelector(".start-stop span");
  icon.className = "fa-sharp fa-solid fa-play";
  span.innerText = "Start";
  mode = "timer";
});

window.addEventListener("DOMContentLoaded", () => {
  loadInitialTime();
  updateDisplay();
});