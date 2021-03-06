'user strict'
// ==============new==============
const itemsList = document.getElementById('list');
const count = document.getElementById('count');   
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  let countOfNubs = getCountOfNubs();
  if (itemsList.innerHTML != ''){
    cleanList();
  }

  createElem(countOfNubs);
}

function getCountOfNubs() {
   return Number(count.value);
}

function createElem(num) {    
  let newLi;
  for (let i =0; i<num; i++) {  
    newLi = document.createElement('li');
    newLi.textContent = (i + 1);
    itemsList.append(newLi);
  }
}

function cleanList() {
  // if (itemsList.firstChild){
  //   itemsList.innerHTML == '';
  // }

  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);

  }  
}


// ==============old==============
'user strict'
const itemsList = document.getElementById('list');
const count = document.getElementById('count');   
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  if (itemsList.innerHTML != ''){
    cleanList();
  }

  createElem(getCountOfNubs());
}

function getCountOfNubs() {
   return Number(count.value);
}

function createElem(num) {    
  let newLi;
  for (let i =0; i<num; i++) {  
    newLi = document.createElement('li');
    newLi.textContent = (i + 1);
    itemsList.append(newLi);
  }
}

function cleanList() {
  while (itemsList.firstChild) {
    document.querySelector('li').remove();
  } 
}
