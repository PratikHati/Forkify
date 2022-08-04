import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView.js";

class bookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No Bookmarked recipes yet! :|";
    _message = "";

    addHandlerRender(handler){
        handler();
    }

    _generateMarkup() {

        console.log(this._data);
        return this._data.map(x => previewView.render(x, false)).join(''); //to display multiple objects
    }

};

export default new bookmarksView; 