'use strict';

const TABSET_CONTAINER_CLASS = 'tab-container';
const TABSET_TITLE_CLASS = 'tabset-title';
const TABSET_BODY_CLASS = 'tabset-body';
const TABSET_ACTIVE_TITLE = 'tabset-title__active';
const TABSET_ACTIVE_BODY = 'tabset-body__active';

class Tabset {

    constructor(elem) {
        this.elem = elem;
        this.index = 1;
        this.bindClasses();
        this.bindEventListeners();
        this.show(this.index);
    }

    bindClasses() {
        this.elem.classList.add(TABSET_CONTAINER_CLASS);
    }

    bindEventListeners() {
        this.elem.addEventListener('click', this.onElementClick.bind(this));
    }

    static displayTabBody (elem) {
        return elem.classList.add(TABSET_ACTIVE_BODY);
    }

    static hideTabBody (elem) {
        return elem.classList.remove(TABSET_ACTIVE_BODY);
    }

    static tabTitleOn (elem) {
        return elem.classList.add(TABSET_ACTIVE_TITLE);
    }

    static tabTitleOff (elem) {
        return elem.classList.remove(TABSET_ACTIVE_TITLE);
    }

    getTitleCollection () {
        return this.elem.firstElementChild.children;        
    }

    getBodiesCollection () {
        return this.elem.lastElementChild.children;
    }

    getTitleCollectionLength () {
        return this.getTitleCollection().length;
    }

    show(index) {
        this.index = index;

        Array.prototype.forEach.call(this.getBodiesCollection, (elem)=>{
            Tabset.hideTabBody(elem);
            if (elem.dataset.bodyIndex == this.index) {
                Tabset.displayTabBody(elem);
            }
        });

        Array.prototype.forEach.call(this.getTitleCollection, (elem)=>{
            Tabset.tabTitleOff(elem);
            if (elem.dataset.bodyIndex == this.index) {
                Tabset.tabTitleOn(elem);
            }
        });
    }

    next() {
        this.index++;

        if(this.index === this.getTitleCollectionLength() + 1) {
            this.index = 1;
        }

        this.show(this.index);
    }

    prev() {
        this.index--;

        if(this.index < 1) {
            this.index = this.getTitleCollectionLength();
        }

        this.show(this.index);
    }

    onElementClick(e) {        
        if (e.target.classList.contains(TABSET_TITLE_CLASS)) {
            const titleIndex = e.target.dataset.titleIndex;
            this.show(titleIndex);
        }        
    }
}

const tabset = new Tabset(document.getElementById('tab-container'));
