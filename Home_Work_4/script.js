'use strict';

let operator;
let operand1 = null;
let operand2 = null;
let result = null;

do {
	operator = prompt('Choose action (add, sub, div, mult)', '');
} while (
	operator != 'add' &&
	operator != 'sub' &&
	operator != 'div' &&
	operator != 'mult'
)

operand1 = Number(prompt('Operand 1', ''));
operand1 = getRightValue(operand1);

operand2 = Number(prompt('Operand 2', ''));
operand2 = getRightValue(operand2);

function getRightValue(number){
	while (isNaN(number)){
		number = Number(prompt('Error. One more time...', ''));
	}
	return number;
}

function add(num1, num2){
	return num1 + num2;	 
}

function sub(num1, num2){
	return num1 - num2;
}

function div(num1, num2){
	return num1 / num2;
}

function mult(num1, num2){
	return num1 * num2;
}

switch(operator){
	case 'add': result = add(operand1, operand2); break;
	case 'sub': result = sub(operand1, operand2); break; 
	case 'div': result = div(operand1, operand2); break; 
	case 'mult': result = mult(operand1, operand2); break; 
	default: console.warn('Oops, it is default case!');
}

alert(result);