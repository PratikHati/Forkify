import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import { COUNT_PER_PAGE } from "../Config.js";

class addRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');

    constructor() {
        super();
        this._addHandlerOpenWindow();
        this._addHandlerCloseWindow();
        //this._addHendlerUpload();
    }

    _func() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    _addHandlerOpenWindow() {
        this._btnOpen.addEventListener('click', this._func.bind(this));
    }
    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this._func.bind(this));
    }

    _addHendlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {

            const dataArr = [...new FormData(this)];    //use spread operator as upload class has various key value data that need to store in an array
            const data = Object.fromEntries(dataArr);   //array to object
            handler(data);
        });
    }

    _generateMarkup() {

    }
}

export default new addRecipeView();   