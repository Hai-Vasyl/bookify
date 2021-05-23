const SearchForm = () => {
  // <button type="button" class="form-search__reset ${
  //   search ? "form-search__reset--active" : ""
  // }" id="btn-reset-search" >
  //   <span class="material-icons-outlined sealed">
  //     close
  //   </span>
  // </button>
  return `
  <form class="form-search" >
    <input class="form-search__input" type="text" placeholder="Search whatever you want" />
    <span class="material-icons-outlined form-search__icon">
      search
    </span>
  </form>
  `;
};

export default SearchForm;
