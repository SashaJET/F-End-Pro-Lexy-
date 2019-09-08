'use strict';

  function createCalculator(result = 0){

    return {
      add: (operand)=> result += operand,
      sub: (operand)=> result -= operand,
      divide: (operand)=> result /= operand,
      mult: (operand)=> result *= operand,     
      set: (operand)=> result = operand
    }  
  }
  
  const calculator = createCalculator(10); 

  console.log(calculator.add(45)); 
  console.log(calculator.sub(45));
  console.log(calculator.divide(5));
  console.log(calculator.mult(5)); 
  console.log(calculator.set(100));
  console.log(calculator.mult(5)); 


