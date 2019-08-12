'use strict';

let operator;
let num1 = null;
let num2 = null;
let result = null;

do {
	operator = prompt('Choose action (add, sub, div, mult)', '');
} while (
	operator != 'add' &&
	operator != 'sub' &&
	operator != 'div' &&
	operator != 'mult'
)

num1 = Number(prompt('Operand 1', ''));
num2 = Number(prompt('Operand 2', ''));

function isValid(num){
	while (isNaN(num)){
		num = Number(prompt('Error. One more time...', ''));
	}
	return num;
}

num1 = isValid(num1);
num2 = isValid(num2);

function add(num1, num2){
	return result = num1 + num2;	 
}

function sub(num1, num2){
	return result = num1 - num2;
}

function div(num1, num2){
	return result = num1 / num2;
}

function mult(num1, num2){
	return result = num1 * num2;
}

switch(operator){
	case 'add': add(num1, num2); break; 
	case 'sub': sub(num1, num2); break;
	case 'div': div(num1, num2); break;
	case 'mult': mult(num1, num2); break;
	default: console.warn('Oops, it is default case!');
}

alert(result);