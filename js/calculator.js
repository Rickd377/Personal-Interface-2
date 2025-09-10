const resultDisplay = document.querySelector(".result-display");

document.querySelector("#clearBtn").addEventListener("click", () => {
  resultDisplay.innerText = "0";
});

document.querySelector("#oneBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "1";
  } else {
    resultDisplay.innerText += "1";
  }
});

document.querySelector("#twoBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "2";
  } else {
    resultDisplay.innerText += "2";
  }
});

document.querySelector("#threeBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "3";
  } else {
    resultDisplay.innerText += "3";
  }
});

document.querySelector("#fourBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "4";
  } else {
    resultDisplay.innerText += "4";
  }
});

document.querySelector("#fiveBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "5";
  } else {
    resultDisplay.innerText += "5";
  }
});

document.querySelector("#sixBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "6";
  } else {
    resultDisplay.innerText += "6";
  }
});

document.querySelector("#sevenBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "7";
  } else {
    resultDisplay.innerText += "7";
  }
});

document.querySelector("#eightBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "8";
  } else {
    resultDisplay.innerText += "8";
  }
});

document.querySelector("#nineBtn").addEventListener("click", () => {
  if (resultDisplay.innerText === "0") {
    resultDisplay.innerText = "9";
  } else {
    resultDisplay.innerText += "9";
  }
});