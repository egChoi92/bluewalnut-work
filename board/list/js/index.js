import { initializeArticles } from "./modules/articles.js";
import { renderPagination } from "./modules/pagination.js";
import { renderPerPage } from "./modules/perPage.js";
import { renderTable } from "./modules/table.js";

document.addEventListener("DOMContentLoaded", function () {
  const articles = initializeArticles();
  renderTable(articles);
  renderPagination(articles.length);
  renderPerPage();
});
