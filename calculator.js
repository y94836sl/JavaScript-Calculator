function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    let result = '';
    if (operator === 'add') {
        result = add(parseFloat(a),parseFloat(b));
    } else if (operator === 'subtract') {
        result = subtract(parseFloat(a),parseFloat(b));
    } else if (operator === 'multiply') {
        result = multiply(parseFloat(a),parseFloat(b));
    } else if (operator === 'divide') {
        result = divide(parseFloat(a),parseFloat(b));
    }
    return result;
}
  
const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculatorDisplay');
const keys = calculator.querySelector('.calculatorKeys');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
    
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'));
  
        if (!action) { // User Input Num
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) { 
                display.textContent = keyContent;
            } else {
                // Prevent long decimal that overflow the screen
                if (displayedNum.includes('.') &&
                    displayedNum.toString().split(".")[1].length > 10
                ){
                    display.textContent = displayedNum; 
                }else{
                    display.textContent = displayedNum + keyContent; 
                }
            }
                calculator.dataset.previousKeyType = 'number';
        }
  
        if (action === 'decimal') { // User Input Decimal
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
  
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) { // User Input Operator
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = operate(operator, firstValue, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
  
        if (action === 'clear') {  // User Input Clear
            display.textContent = 0;
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '' ;
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
        }
    
        if (action === 'calculate') { // User Input Equal
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
    
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
    
                display.textContent = operate(operator, firstValue, secondValue);
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }

    }
  });
