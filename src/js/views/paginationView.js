import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _generateMarkup() {
        const currpage = this._data.page;
        const pages = this._data.result.length / 10;     //each page will have max 10 results
        console.log(pages);

        //first page and others 
        if (currpage === 1 && pages > 1) {
            return `
            <button class="btn--inline pagination__btn--next">
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
            <button class="btn--inline pagination__btn--prev">
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
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currpage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
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