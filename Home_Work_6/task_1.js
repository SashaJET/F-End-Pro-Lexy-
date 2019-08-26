// 1. Даем пользователю ввести число, проверяем что это действительно число.
// После этого выводим сколько в этом числе четных цифр.
// Например 1234 должно показать 2, 1111  - ноль
'use strict';
let result;
let userNum;

do {
	userNum = +prompt('Insert the number', '145899424');
} while (isNaN(userNum));

userNum = String(userNum);

function getEvenQuantity(num) {
	let arrOfNum = [];
  	let count = 0;

	arrOfNum = num.split('');

	for (let i = 0; i < arrOfNum.length; i++){
		if( (arrOfNum[i] % 2) == 0 ) {
			count++;
		}
	}

	return count;
}

result = getEvenQuantity(userNum);
alert('Tут четных цифр: '+ result);
