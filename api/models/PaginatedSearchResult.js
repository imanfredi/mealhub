class PaginatedSearchResult {
  constructor(page, itemsPerPage, totalItems, results) {
    this.__page = page;
    this.__itemsPerPage = itemsPerPage;
    this.__totalItems = totalItems;
    this.__results = results;
    this.__totalPages = Math.ceil(totalItems / itemsPerPage);
    this._isFirst = page == 0;
    this._isLast = this._itemsPerPage * this._page + this._results.size() > this._itemsPerPage * (this._totalPages - 1) &&
      this._itemsPerPage * this._page + this._results.size() <= this._itemsPerPage * this._totalPages;
  }

  isLast() {
    return this._isLast;
  }

  isFirst() {
    return this._isFirst;
  }

  getTotalPages() {
    return this._totalPages;
  }

  getPage() {
    return this._page;
  }

  setPage(page) {
    this._page = page;
  }

  getItemsPerPage() {
    return this._itemsPerPage;
  }

  setItemsPerPage(itemsPerPage) {
    this._itemsPerPage = itemsPerPage;
  }

  getTotalItems() {
    return this._totalItems;
  }

  setTotalItems() {
    return this._totalItems;
  }

  setTotalItems(totalItems) {
    this._totalItems = totalItems;
  }

  getResults() {
    return this._results;
  }

  getLastPage() {
    return this._totalPages - 1;
  }

  setResults(results) {
    this._results = results;
  }
}
