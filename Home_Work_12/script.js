'use strict';

function Hamburger(size, filling) {
  this.size = size,
  this.topping = [],
  this.filling = filling
}

Hamburger.SIZE_SMALL = {
  'price': 50,
  'calories': 20
}

Hamburger.SIZE_BIG = {
  'price': 100,
  'calories': 40
}

Hamburger.FILLING_CHEESE = {
  'price': 10,
  'calories': 20  
}

Hamburger.FILLING_SALAD = {
  'price': 20,
  'calories': 5  
}

Hamburger.FILLING_POTATO = {
  'price': 15,
  'calories': 10  
}

Hamburger.TOPPING_SPICE = {
  'price': 17,
  'calories': 0  
}

Hamburger.TOPPING_MAYO = {
  'price': 202,
  'calories': 5  
}

Hamburger.prototype.addTopping = function(topping) {
 return this.topping.push(topping);
}

Hamburger.prototype.getTopping = function() {
  return this.topping;
}
Hamburger.prototype.getSize = function() {
  return this.size;
}
Hamburger.prototype.getFilling = function() {
  return this.filling;
}

Hamburger.prototype.calculatePrice = function() {
  let size = this.getSize();
  let price = size['price'];

  let topping = this.getTopping();
  price += topping.reduce((sum, elem) => sum + elem['price'], 0);

  let filling = this.getFilling();
  price += filling['price'];

  return price;
}

Hamburger.prototype.calculateCalories = function() {
  let size = this.getSize();
  let calories = size['calories'];

  let topping = this.getTopping();
  calories += topping.reduce((sum, elem) => sum + elem['calories'], 0);

  let filling = this.getFilling();
  calories += filling['calories'];

  return calories;
}






// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.FILLING_SALAD);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// console.log("hamburger.addTopping(Hamburger.TOPPING_MAYO)= " + hamburger.addTopping(Hamburger.TOPPING_MAYO));
// спросим сколько там калорий
console.log('Calories: ' + hamburger.calculateCalories());
// сколько стоит
console.log('Price: ' + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу,
// hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log('Price with sauce: ' + hamburger.calculatePrice());
