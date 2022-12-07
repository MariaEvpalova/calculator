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
    display.style.gridRow = '1 / 1';
    display.style.gridColumn = '1 / 5';
    const buttons = Array.from(container.querySelectorAll('button'));
    let columnCount = 1;
    let rowCount = 2;
    for (const button of buttons) {
        button.classList.add('item');
        button.style.gridColumn = `${columnCount} / ${columnCount + Number(button.classList.contains('big'))+1}`;
        button.style.gridRow = `${rowCount} / ${rowCount}`;
        columnCount += Number(button.classList.contains('big'));
        rowCount += Number(columnCount == 4)
        columnCount = columnCount == 4 ? 1 : columnCount+1;
    }
}

function addButtonContent(event) {
    currentDigit += event.target.innerText;
    inputDiv.innerText += event.target.innerText;
}

let currentDigit = '';

const container = document.querySelector('.container');
const display = container.querySelector('.display');
const inputDiv = container.querySelector('.display .input');

makeGrid();

const numberButtons = Array.from(container.querySelectorAll('button.number'));
numberButtons.forEach(button => button.addEventListener('click', addButtonContent));