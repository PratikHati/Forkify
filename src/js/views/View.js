import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg'; //parcel 2

export default class View {
    _data;

    render(data) {
        this._data = data;                          //API data  
        const markup = this._generateMarkup();

        if (!markup) {
            return markup;
        }

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);   //DOM insertion
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
    };




    renderError(message = this._errorMessage) {
        const markUp = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#  icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp); //DOM
    };




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
    };
}

