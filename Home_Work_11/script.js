'use strict';

function Student(name, marks) {
  this.name = name,
  this.marks = marks
}

Student.prototype.averageMark = function() {
  return this.marks
             .reduce((sum, current) => sum + current) 
              / this.marks.length;
}

function groupAverageMark(arr) {
  return arr.reduce(
              (sum, current) => sum + current.averageMark(), 0
            ) / arr.length;
}


const students = [
  new Student('Student 1', [10,9,8,0,10]),
  new Student('Student 12', [10,0,8,0,3,4]),
  new Student('Student 3', [10,0,8,0,3,4])
]

const avarageMarkOfStudent = students[2].averageMark().toFixed(2);
const avarageMarkOfGroup = groupAverageMark(students).toFixed(2);

console.log(avarageMarkOfStudent);
console.log(avarageMarkOfGroup);
