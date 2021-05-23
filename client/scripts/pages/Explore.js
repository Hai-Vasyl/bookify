import FieldPicker from "../components/FieldPicker.js";
import BookCard from "../components/BookCard.js";
import Pagination from "../components/Pagination.js";
import Title from "../components/Title.js";
import { fetchData } from "../helpers/fetchData.js";
import { getParamQuery } from "../helpers/getParamsQuery.js";

const Explore = async () => {
  const page = getParamQuery("page") || "1";
  const filter = getParamQuery("filter") || "partial";
  const type = getParamQuery("type") || "all";
  const sort = getParamQuery("sort") || "relevance";
  const search = getParamQuery("search") || "";
  const amountItems = 24;

  const booksData = await fetchData(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&filter=${filter}&printType=${type}&orderBy=${sort}&projection=lite&startIndex=${
      page - 1
    }&maxResults=${amountItems}`,
  );

  const filterPicker = await FieldPicker({
    label: "Filter by",
    id: "filter-picker",
    options: [
      { value: "partial", title: "Partial" },
      { value: "full", title: "Full" },
      { value: "free-ebooks", title: "Free ebooks" },
      { value: "paid-ebooks", title: "Paid ebooks" },
      { value: "ebooks", title: "Ebooks" },
    ],
    selected: filter,
  });
  const typePicker = await FieldPicker({
    label: "Print type",
    id: "type-picker",
    options: [
      { value: "all", title: "All" },
      { value: "books", title: "Books" },
      { value: "magazines", title: "Magazines" },
    ],
    selected: type,
  });
  const sortPicker = await FieldPicker({
    label: "Sort by",
    id: "sort-picker",
    options: [
      { value: "relevance", title: "Relevance" },
      { value: "newest", title: "Newest" },
    ],
    selected: sort,
  });

  console.log({ booksData });
  const books = booksData.items?.reduce((acumulator, item) => {
    return acumulator + BookCard({ info: item });
  }, "");

  const pagination = Pagination({
    quantityItems: booksData.totalItems || 0,
    amountItemsPage: amountItems,
    currentPageNumber: page,
  });

  return `
  <div>
    ${
      booksData.totalItems
        ? `<div class="books">
            ${books} 
          </div>`
        : `<p class="plug" >Nothing found, try something else</p>`
    }
    ${booksData.totalItems ? pagination : ""}
  </div>
  `;
};

export default Explore;
