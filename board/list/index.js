import { initializePerPage } from "./js/perPage.js";
import { generateData, initializeTable } from "./js/table.js";
import { getSessionStorage } from "/assets/js/utility.js";

document.addEventListener("DOMContentLoaded", function () {
  generateData(40);
  initializeTable(getSessionStorage("articles"));
  initializePerPage();
});
