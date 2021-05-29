const SearchForm = ({ search = "" } = {}) => {
  return `
  <form class="form-search" id="form-search" >
    <button type="button" class="form-search__reset ${
      search ? "form-search__reset--active" : ""
    }" id="btn-reset-search" >
      <span class="material-icons-outlined sealed">
        close
      </span>
    </button>
    <input class="form-search__input ${
      search ? "form-search__input--filled" : ""
    }" id="input-search" value="${search}" type="text" placeholder="Search whatever you want" />
    <span class="material-icons-outlined form-search__icon">
      search
    </span>
  </form>
  `;
};

export default SearchForm;
