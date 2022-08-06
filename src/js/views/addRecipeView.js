import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import { COUNT_PER_PAGE } from "../Config.js";

class addRecipeView extends View {
    _parentElement = document.querySelector('.pagination');
    
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');

    constructor(){
        super();
        this._addHandlerOpenWindow();
        this._addHandlerCloseWindow();
    }

    _func(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    _addHandlerOpenWindow(){
        this._btnOpen.addEventListener('click', this._func.bind(this));
    }
    _addHandlerCloseWindow(){
        this._btnClose.addEventListener('click', this._func.bind(this));
    }

    _generateMarkup() {

    }
}

export default new addRecipeView();    