import View from "./View.js";
import icons from 'url:../../img/icons.svg';
import { COUNT_PER_PAGE } from "../Config.js";

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    //event listener for pages
    addHandlerRender(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');

            console.log(btn);
            if (!btn) {
                return;
            }

            const gotovalue = +btn.dataset.goto;     //retrive vaule from front end "data-goto", ".dataset" remember, "+" used to convert string to integer

            handler(gotovalue);
        });
    }

    _generateMarkup() {
        const currpage = this._data.page;
        const pages = Math.ceil(this._data.result.length / COUNT_PER_PAGE);     //each page will have max 10 results
        console.log(pages);

        //first page and others 
        if (currpage === 1 && pages > 1) {
            return `
            <button data-goto ="${currpage + 1}"  class="btn--inline pagination__btn--next">
                <span>${currpage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
          `;
        }

        //last page
        if (currpage === pages && pages > 1) {
            return `
            <button data-goto ="${currpage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currpage - 1}</span>
            </button>
          `;
        }

        //other page
        if (currpage < pages) {
            return `
            <button data-goto ="${currpage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currpage - 1}</span>
            </button>

            <button data-goto ="${currpage + 1}" class="btn--inline pagination__btn--next">
                <span>${currpage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }

        //only 1 page
        return ``;

    }
}

export default new paginationView();    