import { getParamQuery } from "../helpers/getParamsQuery.js";
import { moveTo } from "../main.js";

export const selectFilterSearchOption = (event) => {
  const filter = document.getElementById("filter-picker").value;
  const type = document.getElementById("type-picker").value;
  const sort = document.getElementById("sort-picker").value;
  const search = getParamQuery("search");

  moveTo(
    `/explore?page=1&filter=${filter}&type=${type}&sort=${sort}${
      search ? `&search=${search}` : ""
    }`,
  );
};
