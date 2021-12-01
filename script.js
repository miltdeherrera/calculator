/*  Adds two numbers together.
    @param  {Mumber}    num1    The first number
    @param  {Number}    num2    The second number
    @return {Number}            The total of the two numbers
    */
const add = function (num1, num2) {
    return num1 + num2;
};

/*  Subtracts one number from another.
    @param  {Mumber}    num1    The first number
    @param  {Number}    num2    The second number (subtracted from first)
    @return {Number}            The difference of the two numbers
*/
const subtract = function (num1, num2) {
    return num1 - num2;
};

/*  Multiplies one number by another.
    @param  {Mumber}    num1        The first number
    @param  {Number}    num2        The second number
    @return {Number}                The product of the two numbers
*/
const multiply = function (num1, num2) {
    return num1 * num2;
};

/*  Divides one number by another.
    @param  {Mumber}    num1        The first number
    @param  {Number}    num2        The second number (divisor)
    @return {Number}                The quotient of the two numbers
*/
const divide = function (num1, num2) {
    if (num2 === 0) return "DBZ ERROR";
    return num1 / num2;
};

/*  Performs a given function on two numbers.
    @param  {Function}  operation   The operation being performed on the two numbers.
    @param  {Mumber}    num1        The first number
    @param  {Number}    num2        The second number (divisor)
    @return {Number}                The result of the operation being performed upon the numbers
*/
function operate(operation, num1, num2) {
    return operation(num1, num2);
}

/*  Writes a string to viewport.
    @param  {string}  string        The string to be displayed.
*/
const writeToViewport = function (string) {
    if (viewport.textContent === '0') clearViewport();
    if (viewport.textContent.length <= MAX_CHARACTERS)
        viewport.textContent += string;
}

/*  Clears viewport.
*/
const clearViewport = function () {
    viewport.textContent = '';
}

// Declaring/initializing DOM objects

const viewport = document.querySelector(".viewport");
const btnArray = Array.from(document.querySelectorAll(".btn"));
const opBtnArray = Array.from(document.querySelectorAll(".btn-op"));
const numBtnArray = Array.from(document.querySelectorAll(".btn-number"));
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#delete");

let storedValue = 0;
let currentOper = '';
let newNumber = true;
const MAX_CHARACTERS = 9;

// click clear button once, it clears the field. Click it twice, it clears memory.
clearBtn.addEventListener('click', () => {
    if (viewport.textContent === '0') {
        storedValue = 0;
        currentOper = '';
    }
    else {
        viewport.textContent = '0';
    }
});

delBtn.addEventListener('click', () => {
    if (viewport.textContent === '0') {
    }
    else if (viewport.textContent.length === 1) {
        viewport.textContent = '0';
    }
    else {
        viewport.textContent = viewport.textContent.substr(0, viewport.textContent.length - 1);
    }
});

// numeric button input method
for (let btn of numBtnArray) {
    btn.addEventListener('click', () => {
        if (newNumber === true) {
            clearViewport();
            newNumber = false;
        }
        writeToViewport(btn.value);
    });
}

// operator input method
for (let btn of opBtnArray) {
    btn.addEventListener('click', () => {

        switch (currentOper) {
            case "add":
                // storedValue = add(storedValue, Number(viewport.textContent));
                storedValue = operate(add, storedValue, Number(viewport.textContent));
                break;
            case "subtract":
                storedValue = operate(subtract, storedValue, Number(viewport.textContent));
                break;
            case "multiply":
                storedValue = operate(multiply, storedValue, Number(viewport.textContent));
                break;
            case "divide":
                storedValue = operate(divide, storedValue, Number(viewport.textContent));
                break;
            case "":
                storedValue = Number(viewport.textContent);
                break;
        }

        // An equals button just pops the operation on the stack and doesn't add any new one.
        if (btn.value === 'equals') {
            currentOper = '';
        }
        else {
            currentOper = btn.value;
        }

        // display results of operation, rounding if too many digits
        if (storedValue.toString().length > MAX_CHARACTERS) {
            viewport.textContent = storedValue.toFixed(MAX_CHARACTERS);
        }
        else {
            viewport.textContent = storedValue;
        }


        // allows for new number input
        newNumber = true;
    });
}