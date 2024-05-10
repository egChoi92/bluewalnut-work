import { initializePerPage } from "./js/perPage.js";
import { generateData, initializeTable } from "./js/table.js";
import { perPageList } from "/assets/js/constant.js";
import { getSessionStorage, hasQueryParam, redirectToUpdatedUrl } from "/assets/js/utility.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!hasQueryParam("pagination")) {
    return redirectToUpdatedUrl("pagination", 1);
  }
  if (!hasQueryParam("perPage")) {
    return redirectToUpdatedUrl("perPage", perPageList[0]);
  }

  generateData(40);
  initializePerPage();
  initializeTable(getSessionStorage("articles"));
});
