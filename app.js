// const operations = {
//     screen: document.querySelector('#screen'),
//     clear: `C`,
//     divide: `÷`,
//     multiply: `x`,
//     subtract: `-`,
//     add: `+`,
//     equals: `=`,
//     numbersEntered: [],
//     operationsEntered: [],
//     calculationResultDisplayed: false
// }


document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    buttonsContainer = document.querySelector('.buttons');

    for (let i = 0; i < buttonsContainer.children.length; i++) {
        const buttonPressed = buttonsContainer.children[i]
        //console.log(event.target)
        buttonPressed.addEventListener('click', (event) => calculatorButtonPressed(event.target));
    }

    function calculatorButtonPressed(target) {
        const btnTextValue = target.innerText;
        //console.log(target)
        if (target.classList.value != "operator") {
            // button pressed is a number 
            if (calculator.status.resultDisplayed) calculator.clearDisplay();
            calculator.appendScreen(btnTextValue);
        } else {
            // button pressed is an operator 
            calculator.enterOperation(parseInt(calculator.screen, 10), btnTextValue);
        }
    }

});

class Calculator {
    constructor() {
        this.operations = {
            clear: `C`,
            divide: `÷`,
            multiply: `x`,
            subtract: `-`,
            add: `+`,
            equals: `=`,
        }
        this.status = {
            numbersEntered: [],
            operationsEntered: [],
            resultDisplayed: false
        }
    }
    get screen() {
        return document.querySelector('#screen').innerText;;
    }
    set screen(value) {
        //console.log("set_screen", this);
        document.querySelector('#screen').innerText = value;
    }
    appendScreen(value) {
        //console.log("append_screen", this);
        this.screen = this.screen + value;
    }
    enterNumber(number) {
        //console.log("enter_number", this);
        this.status.numbersEntered.push(number);
    }
    enterOperation(number, operation) {
        if (operation == this.operations.clear) this.reset();
        else if (operation == this.operations.equals) {
            this.status.numbersEntered.push(number);
            this.performCalculation();
        } else {
            this.status.numbersEntered.push(number);
            this.status.operationsEntered.push(operation);
            this.clearDisplay();
        }

    }
    performCalculation() {
        const num1 = this.status.numbersEntered.shift();
        const num2 = this.status.numbersEntered.shift();
        const operation = this.status.operationsEntered.shift();
        console.log(`perform calculation=> num1:${num1}, num2:${num2}, op:${operation}`)
        this.status.resultDisplayed = true;
        switch (operation) {
            case this.operations.add:
                this.screen = num1 + num2;
                break;
            case this.operations.subtract:
                this.screen = num1 - num2;
                break;
            case this.operations.multiply:
                this.screen = num1 * num2;
                break;
            case this.operations.divide:
                this.screen = num1 / num2;
                break;
            default:
                this.status.resultDisplayed = false;
                alert('An error occured - Error Code: A');
        }
    }
    reset() {
        // console.log("reset", this);
        this.clearDisplay();
        this.status.numbersEntered = [];
        this.status.operationsEntered = [];
    }
    clearDisplay() {
        // console.log("clear_display", this);
        this.screen = ``;
        this.status.resultDisplayed = false;
    }
}