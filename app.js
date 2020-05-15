const operations = {
    screen: document.querySelector('#screen'),
    clear: `C`,
    divide: `÷`,
    multiply: `x`,
    subtract: `-`,
    add: `+`,
    equals: `=`,
    numbersEntered: [],
    operationsEntered: [],
    calculationResultDisplayed: false
}

document.addEventListener('DOMContentLoaded', () => {
    buttonsContainer = document.querySelector('.buttons');

    for (let i = 0; i < buttonsContainer.children.length; i++) {
        const buttonPressed = buttonsContainer.children[i]
        //console.log(event.target)
        buttonPressed.addEventListener('click', (event) => calculatorButtonPressed(event.target));
    }
    //console.log(buttons.children);
});

function calculatorButtonPressed(target) {
    const btnTextValue = target.innerText;
    //console.log(target)
    if (target.classList.value != "operator") {
        // button pressed is a number 
        if (operations.calculationResultDisplayed) resetScreen();
        operations.screen.innerHTML = `${operations.screen.innerHTML.toString()}${btnTextValue}`;
    } else {
        // button pressed is an operator 
        const operation = btnTextValue;
        const numberEntered = parseInt(operations.screen.innerText, 10);
        operationRequested(numberEntered, operation);
    }
}

function resetScreen() {
    operations.screen.innerHTML = ``;
    operations.calculationResultDisplayed = false;
}

function saveNumberAndClearScreen(number) {
    operations.numbersEntered.push(number);
    operations.screen.innerHTML = ``;
}

function operationRequested(numberEntered, operation) {
    saveNumberAndClearScreen(numberEntered);
    //console.log("BEFORE", numbersEntered, operationsEntered)

    if (operation == operation.clear) { // clear everything 
        //console.log('CLEAR')
        operations.numbersEntered = [];
        operations.operationsEntered = [];
        operations.screen.innerText = ``;
    } else if (operation == operations.equals) { // perform calcuation 
        //console.log('EQUALS')
        let result;
        let calculation = new Calculation(
            operations.numbersEntered.shift(), operations.numbersEntered.shift()
        );
        let opToPerform = operations.operationsEntered.shift();
        switch (opToPerform) {
            case operations.add:
                result = calculation.add();
                break;
            case operations.subtract:
                result = calculation.subtract();
                break;
            case operations.multiply:
                result = calculation.multiply();
                break;
            case operations.divide:
                result = calculation.divide();
                break;
            default:
                alert('An error occured - Error Code: A');
        }
        operations.screen.innerHTML = result;
        operations.calculationResultDisplayed = true;
    } else { // 
        operations.operationsEntered.push(operation);
    }
    //console.log("AFTER", numbersEntered, operationsEntered)
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