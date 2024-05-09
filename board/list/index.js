import { initializePerPage } from "./js/perPage.js";
import { generateData, initializeTable } from "./js/table.js";

document.addEventListener("DOMContentLoaded", function () {
  generateData(40);
  initializeTable(getSessionStorage("articles"));
  initializePerPage();
});
