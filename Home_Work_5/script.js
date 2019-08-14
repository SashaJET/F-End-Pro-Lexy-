'use strict';

let newStr = null;

function isOneChar(char) {
	return ((char.length) > 1) ? false : true;
}

function replaceAllChars(str, findChar, changeChar) {

	if ( isOneChar(findChar) && isOneChar(changeChar) ) {

		let position = -1;
		while( (position = str.indexOf(findChar, position + 1 )) != -1 ) {
			str  = str.replace(str[position], changeChar);
		}

	return str;

	} 
}

newStr = replaceAllChars('Hellol world', 'l', 'z');
console.log(newStr);
