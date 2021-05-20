document.body.addEventListener("click", handleClick);
var inputScreen = document.querySelector('.screen');


/* Variables used by calculator */
var operators = ['÷', 'x', '+', '-', '(', ')', '^', 'r'];
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var actions = ['DEL', 'AC', '='];
var extras = ['.'];
let calchistory = [];


/* listens to the clicked event */
function handleClick(event) {
    // Handles the clicks by the user
    btnValue = event.target.innerHTML;
    if(actions.includes(btnValue)){
        // calls specAction function if an action key is pressed
        input = inputScreen.innerHTML;
        specAction(input, btnValue);
        History(calchistory, btnValue);
    }
    else if(event.target.tagName === "LI"){
        result = btnValue.substring(btnValue.indexOf('=') + 1);
        inputScreen.innerHTML = result;
    }
    else if(nums.includes(btnValue) || operators.includes(btnValue) || extras.includes(btnValue)){
        // Adds character to working area if it is valid
        inputScreen.innerHTML += btnValue;
    }
    else if(btnValue === 'Dark Theme' || btnValue === 'Light Theme'){
        changeTheme(btnValue);
    }
    else if(btnValue === 'Swap'){
        swapBtns();
    };
};


/* Handles functions of calculator */
function specAction(input, btnValue){
    var inputScreen = document.querySelector('.screen');
    // Takes input actions and edits calculator screen based on them
    if(btnValue === '='){
        // if button was '=' takes string and evaluates it
        try{
            input = opConvert(input);
            console.log(eval(input));
            inputScreen.innerHTML = eval(input);
            calc = input + ' = ' + eval(input);
            calc = calc.replace(/\n/g, ' ');
            calchistory.push(calc);
        }
        catch (err) {
            // Prints a message to screen if user inputs an invalid string
            inputScreen.innerHTML = ('Syntax Error');
        };
    }
    else if(btnValue === 'DEL'){
        // if button was 'DEL' removes last character
        inputScreen.innerHTML = input;
        inputScreen.innerHTML = inputScreen.innerHTML.slice(0, -1);
        console.log(inputScreen.innerHTML);
    }
    else if (btnValue === 'AC'){
        // if button was 'AC' clears the working area
        inputScreen.innerHTML = ''
    };
};


/* Converts the calculator inputs into readable format */
function opConvert(input){
    // Converts the inputs operators where neccessary
    input = input.replace('x', '*').replace('÷', '/').replace('r', '%').replace('^', '**');
    return input;
};


/*History Log*/
function History(calchistory, btnValue){
    let list = document.getElementById("theList");
    if(btnValue === '='){
        if (calchistory.length > 2) {
            calchistory.shift()
        }
        $('#theList').empty();
        calchistory.forEach((calc)=>{
            let li = document.createElement("li");
            li.innerText = calc;
            list.appendChild(li);
        })
    };
};


/* Exchange Rate JS */
const typeOne = document.getElementById('currency-one')
const typeTwo = document.getElementById('currency-two')
const amountOne = document.getElementById('amount-one')
const amountTwo = document.getElementById('amount-two')
const xrate = document.getElementById('rate')

// Gets the exchange rate
async function calculate() {
    const valueOne = typeOne.value;
    const valueTwo = typeTwo.value;
    
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${valueOne}`);
    const data = await response.json();
    const rate = data.rates[valueTwo];

    xrate.innerText = `1 ${valueOne} is equal to ${rate} ${valueTwo}`;
    amountTwo.value = (amountOne.value * rate).toFixed(2);
};


function swapBtns() {
    const temp = typeOne.value;
    typeOne.value = typeTwo.value;
    typeTwo.value = temp;
    calculate();
}

/* Event listeners for exchange */
typeOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
typeTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

calculate();


/* Dark Mode JS */

function changeTheme(btnValue) {

    if (btnValue === "Light Theme")
    {
        btnValue = "Dark Theme";
    }
    else
    {
        btnValue = "Light Theme";
    };
    if (btnValue === "Dark Theme")
    {
        document.querySelector("#dark-mode").innerHTML = "Dark Theme";
    }
    else
    {
        document.querySelector("#dark-mode").innerHTML = "Light Theme";
    };

    let element = document.body;
    let screen = document.getElementById("screen");
    let calc = document.getElementById("calcMain");
    let nav = document.getElementById("navbar");
    let mode = document.getElementById("dark-mode");
    let currencyExchange = document.getElementById("swap");
    let calcTax = document.getElementById("btn");
    
    try{
    element.classList.toggle("dark-calc");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try{
    nav.classList.toggle("bg-dark");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try{
    mode.classList.toggle("darkBtn");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try{
        screen.classList.toggle("dark-screen");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try{
        calc.classList.toggle("calcContain");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try{
        calc.classList.toggle("hover");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try {
    currencyExchange.classList.toggle("darkCol");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    try{
    calcTax.classList.toggle("darkCol");
    }
    catch(TypeError){
        console.log('Element not found')
    }
    
};

module.exports = {
    opConvert,
    specAction,
    handleClick
};