'use strict';

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const GALLERY_ITEM_TEMPLATE = document.getElementById('full-photo_template').innerHTML;
const PAGIN_PAGE_NUM_CLASS = 'pagination-page';

const gallery = document.getElementById('gallery');
const paginationBtn = document.getElementById('pagination');
            
const limitPhotosOnPage = 50;
let currentPage  ;

init();

function init() {
    
    currentPage = parseArrFromStorage((getCurrentPageData())) || 1;

    getListOfPhotos();
    quantityPage()
    getCurrentPageData(currentPage);
}


function requestJson(url){
    return fetch(url)
        .then(resp => resp.json())
}

function getListOfPhotos(){
    return requestJson(PHOTOS_URL)        
        .then(data => setItemsInStorage('photos', data));
}

function setItemsInStorage(name, data){
    // console.log(name)
    return localStorage.setItem(name, JSON.stringify(data));
}
function getItemsInStorage(name){
    return localStorage.getItem(name);
}

function parseArrFromStorage(){
    const arrOfPhotos = JSON.parse(getItemsInStorage('photos'));
    // console.log(arrOfPhotos)
    return arrOfPhotos;
}

function quantityPage(){
    const numbOfPage =  Math.floor(parseArrFromStorage().length / limitPhotosOnPage); //a так молжно?
    // console.log(numbOfPage)
    renderPaginationBtns(numbOfPage);
}

function renderPaginationBtns(num){
    let blockCodePgnBtn = '';
    for(let i = 1; i <= num; i++ ){        
        blockCodePgnBtn += `<a class="pagination-page"  data-count="${i}">${i}</a>`;
    }
    paginationBtn.innerHTML = blockCodePgnBtn;
}
function getCurrentPageData(numbOfCurrentPage){
// console.log('numbOfCurrentPage  '+numbOfCurrentPage);
    let photosQuantity = parseArrFromStorage().filter(data =>
        data.id > ((numbOfCurrentPage * limitPhotosOnPage) - limitPhotosOnPage)
            && data.id < (numbOfCurrentPage*limitPhotosOnPage));
            // выводит по 49 (limitPhotosOnPage+1)
    
            // return photosQuantity;
            renderPageItems(photosQuantity)
}

function renderPageItems(list) {
    // console.log(list)

    gallery.innerHTML = list.map(el => {       
        return GALLERY_ITEM_TEMPLATE.replace('{{id}}', el.id)
                                    .replace('{{url}}', el.thumbnailUrl)
                                    .replace('{{fullImgUrl}}', el.url)
    }).join('');


}

paginationBtn.addEventListener('click', onPaginationClick);

function onPaginationClick(e){
    e.preventDefault();
    let currentPage = e.target.dataset.count;
    getCurrentPageData(currentPage);

    setItemsInStorage('currentPage', currentPage);
    
    if(e.target.classList.contains(PAGIN_PAGE_NUM_CLASS)){      
        e.target.classList.remove('active');
        e.target.classList.add('active');
    }
    console.log(paginationBtn.children);
    let l = paginationBtn.children.find(el => el.className ='active');
    console.log(l);
    console.log(paginationBtn.children[1].className);
}

// function setCurrentPagnBtnActive(numberPage){

    
// }