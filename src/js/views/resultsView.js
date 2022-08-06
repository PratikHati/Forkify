import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView.js";

class resultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = "Recipe not found for your search! Please try again:)";
    _message = "";

    _generateMarkup() {

        //console.log(this._data);
        return this._data.map(x=>previewView.render(x,false)).join(''); //to display multiple objects
    }
};

export default new resultsView; 