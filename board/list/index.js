import { generateData, initializeTable } from "./js/table.js";

document.addEventListener("DOMContentLoaded", function () {
  generateData();
  initializeTable(getSessionStorage("articles"));
});
