
'use strict';

const ADD = 'add';
const SUB = 'sub';
const MULT = 'mult';
const DIV = 'div'; 

let isAnswerValid;
let mathAction;

do {
	mathAction = prompt('Что сделать? Введите ' + ADD + ', ' + SUB + ', ' + MULT + ', ' + DIV);
	mathAction = mathAction.toLowerCase();

	isAnswerValid = (mathAction == ADD) || (mathAction == SUB) || (mathAction == MULT) || (mathAction == DIV);
	if (!isAnswerValid) {
		alert('Ваш ответ некорректный. Введите операнд словами ('+ ADD + ', ' + SUB + ', ' + MULT + ', ' + DIV +')');
	} 
} while (!isAnswerValid);


let amountOfOperands;

do {
	amountOfOperands = Number( prompt('Cколько операндов. Введите число больше 0, меньше 5', '') );

	if( !( (amountOfOperands > 0) && (amountOfOperands < 5) )) {
		alert('Ваш ответ некорректный. Введите число больше 0, меньше 5');
	}
} while (!( (amountOfOperands > 0) && (amountOfOperands < 5) ));


let userOperand = [];

for (let i = 0; i < amountOfOperands; i++) {
	do {
		userOperand[i] = Number( prompt('Введите операнд № ' + ( i + 1 ), '') );

		if( isNaN(userOperand[i]) ) {
			alert('Ваш ответ некорректный. Введите число.');
		}
	} while ( isNaN(userOperand[i]) );
}


let result = userOperand[0];

for (let i = 1; i < amountOfOperands; i++) {

	switch (mathAction) {
		case ADD:
		result = result + userOperand[i]; 
		break;
		case DIV: 
		result = result / userOperand[i]; 
		break;
		case SUB: 
		result = result - userOperand[i];  
		break;
		case MULT: 
		result = result * userOperand[i]; 
		break;
		default: 
		result = 'Что-то пошло не так.';
	}
}

alert('Результат: ' + result);


