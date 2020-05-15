const SCREEN = document.querySelector('#screen');
const CLEAR = `C`;
const DIVIDE = `÷`;
const MULTIPLE = `x`;
const SUBTRACT = `-`;
const ADD = `+`;
const EQUALS = `=`;



document.addEventListener('DOMContentLoaded', (event) => {
    buttonsContainer = document.querySelector('.buttons');
    console.log(buttonsContainer)
    for (let i = 0; i < buttonsContainer.children.length; i++) {
        const buttonPressed = buttonsContainer.children[i]

        if (buttonPressed.classList.value != "operator") {
            // button pressed is a number 
            buttonPressed.addEventListener('click', (event) => {
                SCREEN.innerHTML = `${SCREEN.innerHTML.toString()}${event.target.innerText}`;
            })
        } else {
            // button pressed is an operator 
            buttonPressed.addEventListener('click', (event) => {
                console.log(buttonPressed.innerText)
            })
        }
    }
    //console.log(buttons.children);
});

class Calculation {
    constructor()
}