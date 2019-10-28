'use strict';

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=100';
const GALLERY_ITEM_TEMPLATE = document.getElementById('full-photo_template').innerHTML;
const PAGIN_PAGE_NUM_CLASS = 'pagination-page';
const PAGINATION_ACTIVE_CLASS = 'active';
const GALLERY_ITEM_CLASS = 'gallery-img';
const FULL_IMG_BACKGROUND_CLASS = 'photo_container';
const SHOW_FULL_PHOTO_CLASS = 'show-full-photo';

const closePhoto = document.getElementById('close-photo');
const gallery = document.getElementById('gallery');
const paginationBtn = document.getElementById('pagination');
const fullPhotoImgTag = document.getElementById('full-photo');
const fullPhotoContainer = document.getElementById('full-photo_container');
            
const limitPhotosOnPage = 10;
let currentPage = 0;
let totalPages = 0;

init();

paginationBtn.addEventListener('click', onPaginationClick);
gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
    switch(true){
        case e.target.classList.contains(GALLERY_ITEM_CLASS):
            showFullPhoto(e.target.dataset.fullPhotoUrl);            
        break;
        case e.target.classList.contains(SHOW_FULL_PHOTO_CLASS):
         console.log(e.target.classList.contains(SHOW_FULL_PHOTO_CLASS))
            hideFullPhoto();
        break;
    }
}

function onPaginationClick(e){
    let currentPageBtn = e.target.dataset.count;

    getCurrentPageData(currentPageBtn);
    setItemsInStorage('currentPage', currentPageBtn);    
    togglePaginationActiveClass(currentPageBtn);
}

function init() {
    currentPage = getCurrentPageFromStorage((getCurrentPageData())) || 1;

    getListOfPhotos();
    quantityPage()
    getCurrentPageData(currentPage);
}

function requestJson(url){
    return fetch(url)
        .then(resp => resp.json())
}

function quantityPage(){
    totalPages =  Math.ceil(parseArrFromStorage().length / limitPhotosOnPage);
    renderPaginationBtns(totalPages);   
}

function getCurrentPageFromStorage(){
    currentPage = JSON.parse(getItemsInStorage('currentPage'));
    // if(currentPage > totalPages){
    //     currentPage = 1;
    // }
    return currentPage;
}

function parseArrFromStorage(){
    const arrOfPhotos = JSON.parse(getItemsInStorage('photos'));    
    return arrOfPhotos;
}

function getListOfPhotos(){
    return requestJson(PHOTOS_URL)        
        .then(data => setItemsInStorage('photos', data));
}

function renderPaginationBtns(num){
    let paginBtnHtml = '';
    for (let i = 1; i <= num; i++ ){        
        paginBtnHtml += `<a class="pagination-page"  data-count="${i}">${i}</a>`;
    }
    paginationBtn.innerHTML = paginBtnHtml;

    togglePaginationActiveClass(currentPage);
}

function getCurrentPageData(numbOfCurrentPage){
    let photosQuantity = parseArrFromStorage().filter(data =>
        data.id > ((numbOfCurrentPage * limitPhotosOnPage) - limitPhotosOnPage)
            && data.id <= (numbOfCurrentPage * limitPhotosOnPage));

            renderPageItems(photosQuantity);
}

function renderPageItems(list) {
    gallery.innerHTML = list.map(el => {       
        return GALLERY_ITEM_TEMPLATE.replace('{{id}}', el.id)
                                    .replace('{{url}}', el.thumbnailUrl)
                                    .replace('{{fullImgUrl}}', el.url)
    }).join('');
}

function showFullPhoto(url){
    fullPhotoImgTag.setAttribute('src', url);
    fullPhotoContainer.classList.add(SHOW_FULL_PHOTO_CLASS);
}

function hideFullPhoto(){
    fullPhotoContainer.classList.add(SHOW_FULL_PHOTO_CLASS);
}

function togglePaginationActiveClass(btn) {
    const activeBtn = pagination.querySelector(`.${PAGINATION_ACTIVE_CLASS}`);
    activeBtn && activeBtn.classList.remove(PAGINATION_ACTIVE_CLASS);

    paginationBtn.querySelector(`[data-count="${btn}"]`).classList.add(PAGINATION_ACTIVE_CLASS);
}

function setItemsInStorage(name, data){
    return localStorage.setItem(name, JSON.stringify(data));
}

function getItemsInStorage(name){
    return localStorage.getItem(name);
}