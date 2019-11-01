$(function(){
    const $addStickBtn = $('#addStickBtn');
    const $stickerItemTemplate = $('#sticker_item_template').html();
    const $form = $('form');
    const $container = $('#container');
    const modal = $('#dialog-form').dialog({
        autoOpen:false,
        modal:true,
        buttons: {
            "Save": addSticker,
            Cancel: function() {
                modal.dialog('close');
            }
        },
        close: function() {
            form[0].reset();
        }
    });
    const form = modal.find('form');
    let stickerItems = [];

    init();

    $addStickBtn.on('click', onAddStickerBtnClick);
    form.on('submit', onFormSubmit);
    $container.on('click', '.sticker-delete-btn', onDeleteStickerBtnClick);

    function onAddStickerBtnClick(){
        modal.dialog('open');
    }

    function onFormSubmit(e){
        e.preventDefault();
        addSticker();
    }

    function onDeleteStickerBtnClick(){
        console.log('del');
        const $stickerId = $(this).parent().data('stickerId');
        deleteSticker($stickerId);
    }
   
    function init() {
        stickerItems = getState();
        renderStickers(stickerItems);
    } 

    function renderStickers(stickerItems) {
        stickerItems.map(addItemInStickerArea);
    }

    function deleteSticker(id) {
        removeSticker(id);
        stickerItems = stickerItems.filter(el => el.id != id);

        saveState();
    }
    function removeSticker(id) {
        $container.children()
                    .filter((index, el) => $(el).data('stickerId') == id)
                    .remove();
    }

    function addSticker(){
        const newSticker = createSticker();

        $form.serializeArray().forEach(({name, value}) => newSticker[name] = value);               
        stickerItems.push(newSticker);
        modal.dialog('close');

        addItemInStickerArea(newSticker); 
        saveState();
    }

    function addItemInStickerArea(newSticker){
        $container.append(getStickerItemHtml(newSticker));
    }
 
    function createSticker() {
        return {
            id: Date.now(),
            title: '',
            description: ''
        }
    }

    function getStickerItemHtml({id, title, description}){
        return $stickerItemTemplate.replace('{{id}}', id)
                                    .replace('{{title}}', title)
                                    .replace('{{description}}', description);
    }

    function saveState(){
        console.log(stickerItems);
        localStorage.setItem('stickersArea', JSON.stringify(stickerItems));
    }

    function getState() {
        const dataFromStorage =  localStorage.getItem('stickersArea');
        return dataFromStorage ? JSON.parse(dataFromStorage) : [];
    }

}) // end of jQ