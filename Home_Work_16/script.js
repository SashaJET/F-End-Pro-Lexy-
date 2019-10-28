'use strict';
const SHOW_FULL_PHOTO_CLASS = 'show-full-photo';
const GALLERY_IMG_CLASS = 'gallery-img';

const prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
const gallery = document.getElementById('gallery');
const fullPhotoTemplate = document.getElementById('full-photo_templ').innerHTML;
const closeFullPhotoBtn = document.getElementById('close-photo');
const fullPhotoImgTag = document.getElementById('full-photo');
const fullPhotoContainer = document.getElementById('full-photo_container');


gallery.addEventListener('click', onOpenPhoto);
closeFullPhotoBtn.addEventListener('click', onBtnClose);

(function getData(){
  prom.then((resp) => { 
    resp.json()
    .then(data => addPhotoToGallery(data, gallery));
  });
}());

function addPhotoToGallery(arr, container){
    arr.forEach(el => {
        const photo = fullPhotoTemplate.replace('{{thumbnailUrl}}', el.thumbnailUrl)
                                    .replace('{{url}}', el.url);

        container.insertAdjacentHTML('beforeend', photo);
    });
}

function onOpenPhoto(e){
    const fullPhotoUrl = e.target.dataset.photo;
    if (e.target.classList.contains(GALLERY_IMG_CLASS)){
        
        fullPhotoImgTag.setAttribute('src', fullPhotoUrl);
        showFullPhoto(fullPhotoUrl);   
    }   
}

function onBtnClose(){
    if (fullPhotoContainer.classList.contains(SHOW_FULL_PHOTO_CLASS)){
        hideFullPhoto();
    }
}

function showFullPhoto(){
    fullPhotoContainer.classList.add(SHOW_FULL_PHOTO_CLASS);
}

function hideFullPhoto(){
    fullPhotoContainer.classList.remove(SHOW_FULL_PHOTO_CLASS);
}
