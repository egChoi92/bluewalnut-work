import { initializePagination } from "./js/pagination.js";
import { initializePerPage } from "./js/perPage.js";
import { initializeTable } from "./js/table.js";
import { Keys, perPageList } from "/assets/js/constant.js";
import { generateData } from "/assets/js/data.js";
import { getSessionStorage, hasQueryParam, redirectToUpdatedUrl } from "/assets/js/utility.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!hasQueryParam(Keys.PAGINATION) || !hasQueryParam(Keys.PER_PAGE)) {
    const params = [
      { key: Keys.PER_PAGE, value: perPageList[0] },
      { key: Keys.PAGINATION, value: 1 },
    ];

    return redirectToUpdatedUrl(params);
  }

  generateData(40);
  initializeTable(getSessionStorage(Keys.ARTICLES));
  initializePerPage();
  initializePagination();
});
