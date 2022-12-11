function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

function makeGrid() {
    display.classList.add('item');
    display.style.gridRow = '1 / 3';
    display.style.gridColumn = '1 / 5';
    const buttons = Array.from(container.querySelectorAll('button'));
    let columnCount = 1;
    let rowCount = 3;
    for (const button of buttons) {
        button.classList.add('item');
        button.style.gridColumn = `${columnCount} / ${columnCount + Number(button.classList.contains('big'))+1}`;
        button.style.gridRow = `${rowCount} / ${rowCount}`;
        columnCount += Number(button.classList.contains('big'));
        rowCount += Number(columnCount == 4)
        columnCount = columnCount == 4 ? 1 : columnCount+1;
    }
}

function addNumber(event) {
    currentNumber += event.target.innerText;
    inputDiv.innerText += event.target.innerText;
}

function deleteOneDigit() {
    currentNumber = currentNumber.slice(0,-1);
    inputDiv.innerText = inputDiv.innerText.slice(0,-1);
}

function addDecimal() {
    if (currentNumber.includes('.')) return;
    currentNumber += '.';
    inputDiv.innerText += '.';
}

function addOperator(event) {
    if (currentNumber == '') return;
    numbers.push(currentNumber);
    currentNumber = '';
    inputDiv.innerText += event.target.innerText;
    operators.push(event.target.innerText);
}

function clearEverything() {
    currentNumber = '';
    numbers = [];
    operators = [];
    inputDiv.innerText = '';
    outputDiv.innerText = '';
}

function compute() {
    if (currentNumber == '') return;
    inputDiv.innerText += '=';
    numbers.push(currentNumber);
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == '+' || operators[i] == '-') continue;
        let currentResult = operate(numbers[i], operators[i], numbers[i+1]);
        operators.splice(i, 1);
        numbers.splice(i + 1, 1);
        numbers[i] = currentResult;
        i--;
    }
    while (numbers.length > 2) {
        let currentResult = operate(numbers[0], operators[0], numbers[1]);
        operators.splice(0, 1);
        numbers.splice(0, 1);
        numbers[0] = currentResult;
    }
    outputDiv.innerText = numbers.length > 1 ? operate(numbers[0], operators[0], numbers[1]) : numbers;
}

let currentNumber = '';
let numbers = [];
let operators = [];

const container = document.querySelector('.container');
const display = container.querySelector('.display');
const inputDiv = container.querySelector('.display .input');
const outputDiv = container.querySelector('.display .output');

makeGrid();

const numberButtons = Array.from(container.querySelectorAll('button.number'));
numberButtons.forEach(button => button.addEventListener('click', addNumber));

const deleteButton = container.querySelector('button#delete');
deleteButton.addEventListener('click', deleteOneDigit);

const decimalButton = container.querySelector('button#decimal');
decimalButton.addEventListener('click', addDecimal);

const operatorButtons = Array.from(container.querySelectorAll('button.operator'));
operatorButtons.forEach(button => button.addEventListener('click', addOperator));

const clearButton = container.querySelector('button#AC');
clearButton.addEventListener('click', clearEverything);

const equalsButton = container.querySelector('button#equals');
equalsButton.addEventListener('click', compute);