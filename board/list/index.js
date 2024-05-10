import { initializePerPage } from "./js/perPage.js";
import { generateData, initializeTable } from "./js/table.js";
import { Keys, perPageList } from "/assets/js/constant.js";
import { getSessionStorage, hasQueryParam, redirectToUpdatedUrl } from "/assets/js/utility.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!hasQueryParam(Keys.PER_PAGE)) {
    return redirectToUpdatedUrl(Keys.PER_PAGE, perPageList[0]);
  }

  generateData(40);
  initializePerPage();
  initializeTable(getSessionStorage(Keys.ARTICLES));
});
