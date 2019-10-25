'use strict';
const DELETE_STICKER_BUTTON = 'sticker-delete-btn';
const STICKER_TITLE = 'sticker-title-input';
const STICKER_MESSAGE = 'stiker-message';


const stickerItemTemplate = document.getElementById('sticker_item_template').innerHTML;
const addStickerBtn = document.getElementById('addStickBtn');
const stickersArea = document.getElementById('stickersArea');
const stickerTitle = document.getElementById('sticker-title'); 

let stickerItems = [];

addStickerBtn.addEventListener('click', onAddStickerBtnClick);
stickersArea.addEventListener('click', onStickersAreaClick);
stickersArea.addEventListener('blur', onStickersBlur, true);


init();

function onStickersAreaClick(e){
    switch(true){
        case e.target.classList.contains(DELETE_STICKER_BUTTON):
            deleteStickerItem(e.target.parentElement.dataset.stickerId);
        break;
    }
}

function onAddStickerBtnClick(){
    addStiker();
}

function onStickersBlur(e){
    const stickerId = e.target.parentElement.dataset.stickerId;
    const value = e.target.value;

    switch(true){
        case e.target.classList.contains(STICKER_TITLE):            
            fillStickerTitle(stickerId, value);
        break;
        case e.target.classList.contains(STICKER_MESSAGE):            
            fillStickerMessage(stickerId, value);
        break;
    }
}


function init(){
    stickerItems = getState();
    renderStickers(stickerItems);
}

function renderStickers(stickerItems){
    stickerItems.forEach(showSticker);
}

function addStiker(){
    const newSticker = createNewSticker();

    stickerItems.push(newSticker);
    showSticker(newSticker); 
}

function createNewSticker(){
    return {
        id: Date.now(),
        title: '',
        text: ''
    }
}

function showSticker(newSticker){
    newSticker = stickerItemTemplate
                        .replace('{{id}}', newSticker.id)
                        .replace('{{title}}', newSticker.title)
                        .replace('{{text}}', newSticker.text);
                        
    stickersArea.insertAdjacentHTML('beforeend', newSticker);
    saveStage();
}

function getSticker(id) {
    return stickerItems.find(el => el.id == id);
}

function fillStickerTitle (id, title) {
    const stiker = getSticker(id);
    stiker.title = title;

    saveStage();
}

function fillStickerMessage (id, text) {
    const stiker = getSticker(id);
    stiker.text = text;

    saveStage();
}
// function fillSticker(id, title, text){
//     const sticker = getSticker(id);
//     sticker.title = title;
//     sticker.text = text;
//     saveStage(); }


function deleteStickerItem(stickerId){
    stickerItems = stickerItems.filter(el => el.id != stickerId);
    
    deleteSticker(stickerId);
    saveStage();
}

function deleteSticker(id){
    const stickerItem =  getStickerItemElem(id);
    stickerItem && stickerItem.remove();

    saveStage();
}

function getStickerItemElem(id){
    return stickersArea.querySelector(`[data-sticker-id="${id}"]`);
}

function saveStage(){
    localStorage.setItem('stickersBoard', JSON.stringify(stickerItems))
}

function getState(){
    const dataFromStorage =  localStorage.getItem('stickersBoard');
    return dataFromStorage ? JSON.parse(dataFromStorage) : [];
}