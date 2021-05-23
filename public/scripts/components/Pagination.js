const Pagination = ({ quantityItems, amountItemsPage, currentPageNumber }) => {
  const getQuantityPages = () => {
    const numPages = Math.ceil(quantityItems / amountItemsPage);
    return numPages;
  };

  const limit = getQuantityPages();
  const checkPageNumber = (number) => {
    if (number < limit) {
      return { current: true, next: true };
    } else if (number === limit) {
      return { current: true, next: false };
    } else {
      return { current: false, next: false };
    }
  };

  let countNumber =
    limit - currentPageNumber < 2
      ? currentPageNumber - (4 - (limit - currentPageNumber))
      : currentPageNumber - 2;
  if (countNumber <= 0) {
    countNumber = 1;
  }
  let pageNumbers = [];
  let i = 0;
  while (i !== 5) {
    const { current, next } = checkPageNumber(countNumber);
    if (current && next) {
      pageNumbers.push(countNumber);
      countNumber++;
      i++;
    } else if (current) {
      pageNumbers.push(countNumber);
      break;
    } else {
      break;
    }
  }

  const btnNumbers = pageNumbers.reduce((acumulator, number) => {
    const isActive = currentPageNumber === String(number);
    return (
      acumulator +
      `
      <button
        data-btn-page-number="${number}"
        ${isActive ? "disabled" : ""}
        class="btn-number ${isActive ? "btn-number--active" : ""}"
      >
        <span class="sealed">${number}</span>
      </button>
    `
    );
  }, "");

  const btnArrowLeft = !!(currentPageNumber - 1);
  const btnArrowRight = checkPageNumber(+currentPageNumber + 1).current;

  return `
    <div
      class="pagination"
    >
      <button
        ${!btnArrowLeft ? "disabled" : ""}
        class="pagination__arrow ${
          btnArrowLeft ? "pagination__arrow--active" : ""
        }"
        data-btn-page-arrow="0"
      >
        <span class="material-icons-outlined sealed">
          chevron_left
        </span>
      </button>
        ${btnNumbers}
      <button
        ${!btnArrowRight ? "disabled" : ""}
        class="pagination__arrow ${
          btnArrowRight ? "pagination__arrow--active" : ""
        }"
        data-btn-page-arrow="1"
      >
        <span class="material-icons-outlined sealed">
          navigate_next
        </span>
      </button>
    </div>
  `;
};

export default Pagination;
