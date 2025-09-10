const resultDisplay = document.querySelector(".result-display");

function appendToDisplay(value) {
  if (resultDisplay.innerHTML === "0") {
    resultDisplay.innerHTML = value;
  } else {
    resultDisplay.innerHTML += value;
  }
}

function setDisplay(value) {
  resultDisplay.innerHTML = value;
}

function getDisplay() {
  return resultDisplay.innerHTML;
}

document.querySelector("#clearBtn").addEventListener("click", () => {
  setDisplay("0");
});

for (let i = 0; i <= 9; i++) {
  document.querySelector(`#${["zero","one","two","three","four","five","six","seven","eight","nine"][i]}Btn`).addEventListener("click", () => {
    if (getDisplay() === "0") {
      setDisplay(i.toString());
    } else {
      appendToDisplay(i.toString());
    }
  });
}

document.querySelector("#dotBtn").addEventListener("click", () => {
  const display = getDisplay();
  const parts = display.split(/[\+\-\×÷%√]|<i[^>]+><\/i>/g);
  if (!parts[parts.length - 1].includes(".")) {
    appendToDisplay(".");
  }
});

document.querySelector("#addBtn").addEventListener("click", () => appendOperator("+"));
document.querySelector("#subtractBtn").addEventListener("click", () => appendOperator("-"));
document.querySelector("#multiplyBtn").addEventListener("click", () => appendOperator("×"));
document.querySelector("#divideBtn").addEventListener("click", () => appendOperator("÷"));
document.querySelector("#moduleBtn").addEventListener("click", () => appendOperator("%"));

document.querySelector("#sqrtBtn").addEventListener("click", () => {
  const sqrtIcon = '<i class="fa-regular fa-square-root"></i>';
  const display = getDisplay();
  if (display === "0" || /[\+\-\×÷%]$/.test(display)) {
    setDisplay(sqrtIcon);
  } else {
    setDisplay(sqrtIcon + display);
  }
});

document.querySelector("#deleteBtn").addEventListener("click", () => {
  let display = getDisplay();
  if (display.startsWith('<i class="fa-regular fa-square-root"></i>')) {
    display = display.replace(/^<i class="fa-regular fa-square-root"><\/i>/, "");
  } else {
    display = display.slice(0, -1);
  }
  if (display === "" || display === '<i class="fa-regular fa-square-root"></i>') {
    setDisplay("0");
  } else {
    setDisplay(display);
  }
});

document.querySelector("#equalsBtn").addEventListener("click", () => {
  let expression = getDisplay();

  expression = expression.replace(/<i class="fa-regular fa-square-root"><\/i>/g, "√");
  expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

  if (expression.startsWith("√")) {
    const num = parseFloat(expression.slice(1));
    if (!isNaN(num)) {
      setDisplay(Math.sqrt(num).toString());
      return;
    }
  }

  if (expression.startsWith('<i class="fa-regular fa-square-root"></i>')) {
    const num = parseFloat(expression.replace(/^<i class="fa-regular fa-square-root"><\/i>/, ""));
    if (!isNaN(num)) {
      setDisplay(Math.sqrt(num).toString());
      return;
    }
  }

  expression = expression.replace(/%/g, "/100*");

  try {
    let result = eval(expression);
    if (result === undefined || isNaN(result)) result = "0";
    setDisplay(result.toString());
  } catch {
    setDisplay("Error");
  }
});

// Prevent double operators
function appendOperator(op) {
  const display = getDisplay();
  if (display === "0") return;
  if (/[+\-×÷%]$/.test(display)) {
    setDisplay(display.slice(0, -1) + op);
  } else {
    appendToDisplay(op);
  }
}