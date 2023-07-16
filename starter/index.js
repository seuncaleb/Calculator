const display = document.querySelector(".calculator-screen");
const keys = document.querySelector(".keys");

const calculator = {
  displayValue: "0",
  initial: null,
  second: false,
  operator: null,
};

function updateDispaly() {
  display.value = calculator.displayValue;
}

updateDispaly();

function showDigit(number) {
  const { displayValue, second } = calculator;

  if (second === true) {
    calculator.displayValue = number;
    calculator.second = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? number : displayValue + number;
  }
}

function showDecimal(point) {
  if (calculator.second === true) {
    calculator.displayValue = "0";
    calculator.second = false;
    return;
  }

  if (!calculator.displayValue.includes(point)) {
    calculator.displayValue += point;
  }
}

function handleOperator(nextOperator) {
  const { initial, operator, displayValue } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.second) {
    calculator.operator = nextOperator;
    return;
  }

  if (initial === null && !isNaN(inputValue)) {
    calculator.initial = inputValue;
  } else if (operator) {
    const result = calculate(initial, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.initial = result;
  }
  calculator.second = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

function calculate(initial, second, operator) {
  if (operator === "+") {
    return initial + second;
  } else if (operator === "-") {
    return initial - second;
  } else if (operator === "*") {
    return initial * second;
  } else if (operator === "/") {
    return initial / second;
  }

  return second;
}

function reset() {
  calculator.displayValue = "0";
  calculator.initial = "null";
  calculator.second = false;
  calculator.operator - null;
}

keys.addEventListener("click", (e) => {
  const target = e.target;
  const value = target.value;

  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "/":
    case "*":
    case "=":
      handleOperator(value);
      break;
    case ".":
      showDecimal(value);
      break;
    case "clear-all":
      reset();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        showDigit(value);
      }
  }

  updateDispaly();
});
