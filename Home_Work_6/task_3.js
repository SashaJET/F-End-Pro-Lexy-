
// 3.Написать функцию которая будет делать полную (с учетом вложенностей) копию объекта. Ожидаю что использовать ее можно будет так: 
// const obj = {name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro'}} 
// const objCopy = copy(obj);
'use strict';

const obj = {
	name: 'Alex', 
	age: 33, 
	adress: { 
		country: 'UA', 
		city: 'Dnipro',
		x: {
			1: 'one'
		}
	}
}

function copy(obj) {
	let newObj = Object.assign({}, obj);

	for (let key in obj) {
			if (typeof(obj[key]) == 'object') {
				newObj[key]  = 	copy(obj[key]);
			} else {
 				newObj[key] = obj[key];
			}
		}
		return newObj;
};

const objCopy = copy(obj);
console.log(objCopy );
