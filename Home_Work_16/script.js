'use strict';
const SHOW_FULL_PHOTO = 'show-full-photo';

const prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
const gallery = document.getElementById('gallery');
const fullPhotoTemplate = document.getElementById('full-photo_templ').innerHTML;
const closeFullPhotoBtn = document.getElementById('close-photo');
const fullPhotoImgTag = document.getElementById('full-photo');
const fullPhotoContainer = document.getElementById('full-photo_container');

gallery.addEventListener('click', onOpenPhoto);
closeFullPhotoBtn.addEventListener('click', onBtnClose);

(function getData(){
  prom.then((resp) => { resp.json().then((data)=> { 
            const arrOfImg = data;
            addPhotoToGallery(arrOfImg, gallery);   
    });
  });
}());

function addPhotoToGallery(arr, container){
    arr.forEach(el => {
        const photo = fullPhotoTemplate.replace('{{thumbnailUrl}}', el.thumbnailUrl)
                                    .replace('{{url}}', el.url);

        container.insertAdjacentHTML('beforeend', photo);
    });
}

function toggleState() {
    fullPhotoContainer.classList.toggle(SHOW_FULL_PHOTO);
}

function onOpenPhoto(e){
    const fullPhotoUrl = e.target.dataset.photo;
    
    fullPhotoImgTag.setAttribute('src', fullPhotoUrl);

    toggleState();
}

function onBtnClose(){
    toggleState();    
}

