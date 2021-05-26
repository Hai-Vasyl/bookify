import { getParamQuery } from "../helpers/getParamsQuery.js";
import { moveTo } from "../main.js";

export const clearCurrentFieldError = (event) => {
  document.getElementById(
    event.target.id.replace("field-input", "msg"),
  ).textContent = "";
};

export const resetSearchWithInput = (event) => {
  if (!event.target.value) {
    const filter = getParamQuery("filter") || "partial";
    const type = getParamQuery("type") || "all";
    const sort = getParamQuery("sort") || "relevance";

    moveTo(`/explore?page=1&filter=${filter}&type=${type}&sort=${sort}`);
  }
};
