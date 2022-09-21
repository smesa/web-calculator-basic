const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


keys.addEventListener('click', (event) => { 

    const key = event.target;
    const action = key.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;
    const displayedNum = display.textContent;
    const keyContent = key.textContent;


    Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'));
        

    if (!action) {


        if(displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }

    }

    if (action === 'decimal') {
        if (!display.textContent.includes('.')) { 
            display.textContent = displayedNum + '.';
        }
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        
        key.classList.add('is-depressed');

        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;

    }


    if (action === 'clear') {
        display.textContent = '0';
    }

    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const secondValue = displayedNum;
        const operator = calculator.dataset.operator;

        display.textContent = calculate(firstValue, operator, secondValue);
    }

})

const calculate = (n1, operator, n2) => { 

    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    }
    if( operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    }

    if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    }

    if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}