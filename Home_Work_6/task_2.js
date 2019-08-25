// 2. Даем пользователю ввести число от 0 до 10. 
// С помощью рандома генерируем случайное число. Если введенное пользователем число совпало с нашим, начисляем ему 10 баллов. 
// После этого спрашиваем хочет ли он продолжать и повторяем с самого начала

'use strict';

const WIN_POINTS = 10;
let randomNum;
let score = 0;

function getUserNum() {
	let userNum;

	do {	
		userNum = +prompt('Guess the number from 0 to 10', '5');
	} while (isNaN(userNum));

	return userNum;
}

do {
	randomNum = Math.round( Math.random() * 10 );
	
	if ( getUserNum() == randomNum) {		
		score += WIN_POINTS;
		alert("You are right");
	} else {
		alert("You are wrong");
	}

} while ( confirm('Do you want to repeat?') );

alert('Your score is: ' + score);
