import { initializePerPage } from "./js/perPage.js";
import { generateData, initializeTable } from "./js/table.js";
import { Keys, perPageList } from "/assets/js/constant.js";
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
  initializePerPage();
  initializeTable(getSessionStorage(Keys.ARTICLES));
});
