import { initializePagination } from "./js/pagination.js";
import { initializePerPage } from "./js/perPage.js";
import { initializeTable } from "./js/table.js";
import { KEY_LIST, PER_PAGE_LIST } from "/assets/js/constant.js";
import { generateData } from "/assets/js/data.js";
import { getSessionStorage, hasQueryParam, redirectToUpdatedUrl } from "/assets/js/utility.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!hasQueryParam(KEY_LIST.PAGINATION) || !hasQueryParam(KEY_LIST.PER_PAGE)) {
    const params = [
      { key: KEY_LIST.PER_PAGE, value: PER_PAGE_LIST[0] },
      { key: KEY_LIST.PAGINATION, value: 1 },
    ];

    return redirectToUpdatedUrl(params);
  }

  generateData(40);
  initializeTable(getSessionStorage(KEY_LIST.ARTICLES));
  initializePerPage();
  initializePagination();
});
