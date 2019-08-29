'use strict';
let arrOfNums = [];
let userName;
let userNumbs;
let max;
let min;
const divs = Array.from(document.getElementsByTagName('div'));
let allNumbsValid = true;


userName = prompt('What is your name?', '');
document.getElementById('greeting').innerHTML = 'Hello, '+ userName +'!';

userNumbs = prompt('Enter numbers separated by commas.', '1,203,11,-1,g');

arrOfNums = userNumbs.split(',');
arrOfNums = arrOfNums.map(elem => Number(elem));

arrOfNums.forEach((elem) => {
	if(isNaN(elem)) {			
		allNumbsValid = false;
	}
});

if (allNumbsValid) {
  arrOfNums.sort((a, b) => a - b); // магия чисел из учебника.

  max = arrOfNums[arrOfNums.length-1];
  min = arrOfNums[0];

  document.getElementById('max').innerHTML = 'MAX is  '+ max;
  document.getElementById('min').innerHTML = 'MIN is  '+ min;
  divs.forEach(elem => elem.style.backgroundColor = '#c7f773');

} else {

  divs.forEach(elem => elem.style.backgroundColor = 'red');

  divs[0].innerHTML = 'Wrong input';

// Голову сломала почему не работал forEach. 
// Потом только досмотрела что это коллекция. 
  // for (let i = 0; i<divs.length; i++) {divs[i].style.backgroundColor = 'red';}

}

