const SCREEN = document.querySelector('#screen');
const CLEAR = `C`;
const DIVIDE = `÷`;
const MULTIPLY = `x`;
const SUBTRACT = `-`;
const ADD = `+`;
const EQUALS = `=`;

let numbersEntered = [];
let operationsEntered = [];
let calculationResultDisplayed = false;

document.addEventListener('DOMContentLoaded', (event) => {
    buttonsContainer = document.querySelector('.buttons');

    for (let i = 0; i < buttonsContainer.children.length; i++) {
        const buttonPressed = buttonsContainer.children[i]
        buttonPressed.addEventListener('click', calculatorButtonPressed);
    }
    //console.log(buttons.children);
});

function calculatorButtonPressed(event) {
    const btnTextValue = event.target.innerText;
    if (event.target.classList.value != "operator") {
        // button pressed is a number 
        if (calculationResultDisplayed) {
            SCREEN.innerHTML = ``;
            calculationResultDisplayed = false;
        }
        SCREEN.innerHTML = `${SCREEN.innerHTML.toString()}${btnTextValue}`;
    } else {
        // button pressed is an operator 
        const operation = btnTextValue;
        const numberEntered = parseInt(SCREEN.innerText, 10)
        operationRequested(numberEntered, operation)
    }
}

function saveNumberAndClearScreen(number) {
    numbersEntered.push(number);
    SCREEN.innerHTML = ``;
}

function operationRequested(numberEntered, operation) {
    saveNumberAndClearScreen(numberEntered);
    console.log("BEFORE", numbersEntered, operationsEntered)

    if (operation == CLEAR) { // clear everything 
        console.log('CLEAR')
        numbersEntered = [];
        operationRequested = [];
        SCREEN.innerText = ``;
    } else if (operation == EQUALS) { // perform calcuation 
        console.log('EQUALS')
        let result;
        let calculation = new Calculation(numbersEntered.shift(), numbersEntered.shift());
        let opToPerform = operationsEntered.shift();
        switch (opToPerform) {
            case ADD:
                result = calculation.add();
                break;
            case SUBTRACT:
                result = calculation.subtract();
                break;
            case MULTIPLY:
                result = calculation.multiply();
                break;
            case DIVIDE:
                result = calculation.divide();
                break;
            default:
                alert('An error occured - Error Code: A');
        }
        SCREEN.innerHTML = result;
        calculationResultDisplayed = true;
    } else { // 
        operationsEntered.push(operation);
    }


    console.log("AFTER", numbersEntered, operationsEntered)
}



class Calculation {
    constructor(value1, value2) {
        this.v1 = value1;
        this.v2 = value2;
    }
    multiply() {
        return this.v1 * this.v2;
    }
    divide() {
        return this.v1 / this.v2;
    }
    add() {
        return this.v1 + this.v2;
    }
    subtract() {
        return this.v1 - this.v2;
    }
}