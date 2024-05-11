import { initializeArticles } from "./js/articles.js";
import { initializePagination } from "./js/pagination.js";
import { initializePerPage } from "./js/perPage.js";
import { initializeTable } from "./js/table.js";

document.addEventListener("DOMContentLoaded", function () {
  const articles = initializeArticles();
  initializeTable(articles);
  initializePagination(articles.length);
  initializePerPage();
});
