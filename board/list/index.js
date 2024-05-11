import { initializeArticles } from "./js/articles.js";
import { renderPagination } from "./js/pagination.js";
import { renderPerPage } from "./js/perPage.js";
import { renderTable } from "./js/table.js";

document.addEventListener("DOMContentLoaded", function () {
  const articles = initializeArticles();
  renderTable(articles);
  renderPagination(articles.length);
  renderPerPage();
});
