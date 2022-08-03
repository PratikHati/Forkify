import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg'; //parcel 2

export default class View {
  _data;

  render(data, render = true) {          //first time render


    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;                          //API data  

    const markup = this._generateMarkup();

    if (!render) {    //only for bookmarkView and resultView
      return markup;
    }
    //console.log("mark up is", markup);

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);   //DOM insertion
  }

  update(data) {                              //different data is needed to update , not fully rerender

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;                          //API data  

    const newmarkup = this._generateMarkup();

    //logic to only update required UI changes

    const newDOM = document.createRange().createContextualFragment(newmarkup);   //DOM

    const newElement = newDOM.querySelectorAll('*');  // "*" means all of them

    const currElement = this._parentElement.querySelectorAll('*');

    newElement.forEach((newEL, i) => {    //arrow function

      const curEL = currElement[i];

      //console.log(newEL, newEL.isEqualNode(curEL));  //to print the difference between currElement and newElement

      //to copy insame text
      if (!newEL.isEqualNode(curEL) && newEL.firstChild?.nodeValue.trim() !== "") {
        //"nodeValue" will remove all tag text and keep only UI text . It will hide all html tags

        curEL.textContent = newEL.textContent;

        //update curEL not newEL as we don't want ro re render new content, just update changed content
      }

      //also update unsame attribute
      if (!newEL.isEqualNode(curEL)) {

        Array.from(newEL.attributes).forEach(attr => curEL.setAttribute(attr.name, attr.value));
      }
    });

  }

  _clear() {
    this._parentElement.innerHTML = '';
  }


  spinnerRender() {
    const markUp = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp); //DOM
  }




  renderError(message = this._errorMessage) {
    const markUp = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp); //DOM

    //return markUp;
  }




  renderMessage(message = this._message) {
    const markUp = `
      <div class="message">
      <div>
        <svg>
          <use href="${icons}##icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp); //DOM
  }
};

