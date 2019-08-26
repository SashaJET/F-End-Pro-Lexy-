// 2. Даем пользователю ввести число от 0 до 10. 
// С помощью рандома генерируем случайное число. Если введенное пользователем число совпало с нашим, начисляем ему 10 баллов. 
// После этого спрашиваем хочет ли он продолжать и повторяем с самого начала
'use strict';

const WIN_POINTS = 10;
let score = 0;

function getUserNum() {
  let userNum;

  do {	
    userNum = +prompt('Guess the number from 0 to 10', '6');
  } while (isNaN(userNum) || (userNum < 0 || userNum > 10));

  return userNum;
}

function getRandom(){
  return Math.round( Math.random() * 10 );
}

function culcUserScore(){
  
  if ( getUserNum() == getRandom() ) {		
    alert("You are right");
    return WIN_POINTS;
  } else {
    alert("You are wrong");
    return 0;
  }
}

do {	
  score += culcUserScore();
} while ( confirm('Do you want to repeat?') );

alert('Your score is: ' + score);
