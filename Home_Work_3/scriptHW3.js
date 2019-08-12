
'use strict';

const ADD_ACTION = 'add';
const SUB_ACTION = 'sub';
const MULT_ACTION = 'mult';
const DIV_ACTION = 'div'; 

let isAnswerValid;
let mathAction;

do {
	mathAction = prompt('Что сделать? Введите ' + ADD_ACTION + ', ' +
						 SUB_ACTION + ', ' + MULT_ACTION + ', ' + DIV_ACTION);
	mathAction = (mathAction == null) ? 0 : mathAction = mathAction.toLowerCase();

	isAnswerValid = (mathAction == ADD_ACTION) || 
		(mathAction == SUB_ACTION) || 
		(mathAction == MULT_ACTION) || 
		(mathAction == DIV_ACTION);

	if (!isAnswerValid) {
		alert('Ваш ответ некорректный. Введите операнд словами ('+ 
			ADD_ACTION + ', ' + SUB_ACTION + ', ' + MULT_ACTION + ', ' + DIV_ACTION +')');
	} 
} while (!isAnswerValid);


let amountOfOperands;

do {
	amountOfOperands = Number( prompt('Cколько операндов. Введите число больше 0, меньше 5', '') );
	isAnswerValid = (amountOfOperands > 0) && (amountOfOperands < 5);

	if(!isAnswerValid) {
		alert('Ваш ответ некорректный. Введите число больше 0, меньше 5');
	}
} while (!isAnswerValid);


let userOperand = [];

for (let i = 0; i < amountOfOperands; i++) {
	do {		
		userOperand[i] = Number( prompt('Введите операнд № ' + ( i + 1 ), '') );
		isAnswerValid = isNaN(userOperand[i]) || (userOperand[i] == 0);

		if(isAnswerValid) {
			alert('Ваш ответ некорректный. Введите число.');
		}
	} while (isAnswerValid);
}


let result = userOperand[0];

for (let i = 1; i < amountOfOperands; i++) {

	switch (mathAction) {

		case ADD_ACTION:
		result = result + userOperand[i]; 
		break;

		case DIV_ACTION: 
		result = result / userOperand[i]; 
		break;

		case SUB_ACTION: 
		result = result - userOperand[i];  
		break;

		case MULT_ACTION: 
		result = result * userOperand[i]; 
		break;

		default: 
		result = 'Что-то пошло не так.';
	}
}

alert('Результат: ' + result);
