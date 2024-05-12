import { ARTICLES_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const selector = "#pagination";
const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);

(() => {
  const { articlesPerPage, articlesLength, articlesPagination } = storageArticles;
  const length = Math.ceil(articlesLength / articlesPerPage);
  const generateFirstLastButtonTemplate = (value, label, text) => {
    return `
       <button type="button" value=${value} class="pagination-button-box" aria-label="${label} 페이지로 이동" >${text}</button>
      `;
  };

  renderTemplateLiteralToHtml(selector, () => {
    const paginationButtonTemplate = Array.from({ length }, (_, index) => {
      const pageIndex = index + 1;
      const isCurrentPage = articlesPagination === pageIndex;
      const ariaCurrentPage = isCurrentPage ? 'aria-current="page"' : "";

      return `
        <button type="button" value=${pageIndex} class="pagination-button" aria-label="${pageIndex} 페이지로 이동" ${ariaCurrentPage}>${pageIndex}</button>
      `;
    }).join(" ");

    return `
      ${generateFirstLastButtonTemplate(1, "처음", "&lt;")}
      ${paginationButtonTemplate}
      ${generateFirstLastButtonTemplate(length, "마지막", "&gt;")}
    `;
  });

  const paginationButtonElements = document.querySelectorAll(".pagination-button");

  paginationButtonElements.forEach((element) => {
    element.addEventListener("click", function (event) {
      const { value } = event.target;
      const updatedStorageArticles = {
        ...storageArticles,
        [ARTICLES_KEY.PAGINATION]: Number(value),
      };
      setSessionStorage(ARTICLES_KEY.ARTICLES, updatedStorageArticles);

      navigateTo(ROUTER_PATH.BOARD_LIST);
    });
  });
})();
