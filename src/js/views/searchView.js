class searchView {
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;

        this._clearInput();  // clear the query for next

        return query;
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault(); // to prevent auto load/page load for first time
            handler();    //load when event generated
        });
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new searchView();    