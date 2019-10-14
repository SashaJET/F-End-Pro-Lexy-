'use strict';

const URL = 'https://jsonplaceholder.typicode.com/users';
const usersListContainer = document.querySelector('.users-list');
const userNameItemTemplate = document.getElementById('userNameItemTemplate').innerHTML;
const userDataTemplate = document.getElementById('userDataTemplate').innerHTML;
const userDataContainer = document.querySelector('.user-data-list');

fetch(URL)
    .then((resp) => resp.json())
    .then(data => {
        generateUsersList(data);
        return data;
    })
    .then(data => {
        return fetch(URL + '/' + data[0].id)
    })
    .then((resp) => resp.json())
    .then(addDataOfUser)
    .catch((resp) => {console.log('error', resp)})

usersListContainer.addEventListener('click', onUserNameClick);

function onUserNameClick(e) {
    if(e.target.classList.contains('user-name-item')){
        const userId = e.target.dataset.id;
        fetch(URL + '/' + userId)
            .then(resp => resp.json())
            .then(addDataOfUser)
    };
}

function generateUsersList(data){
    const user = data.map((el)=>{
        return userNameItemTemplate.replace('{{name}}', el.name)
                                .replace('{{id}}', el.id);
    });

    usersListContainer.insertAdjacentHTML('beforeend', user.join('\n'));

}

function addDataOfUser(el) {
    
    const userData = userDataTemplate.replace('{{name}}', el.name)        
         .replace('{{phone}}', el.phone)
         .replace('{{company}}', el.company.name) 
         .replace('{{address}}', `
                                    ${el.address.city},  
                                    ${el.address.street},  
                                    ${el.address.suite} 
                                `);

    userDataContainer.innerHTML = userData;
}