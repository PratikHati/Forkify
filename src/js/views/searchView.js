class searchView {
    #parentElement = document.querySelector('.search');

    getQuery() {
        const query = this.#parentElement.querySelector('.search__field').value;

        this.clearInput();

        return query;
    }

    addHandlerSearch(handler) {
        this.#parentElement.addEventListener('submit', function (e) {
            e.preventDefault(); // to prevent auto load/page load for first time
            handler();    //load when event generated
        });
    }

    clearInput() {
        this.#parentElement.querySelector('.search__field').value = '';
    }
}

export default new searchView();    