import { ARTICLES_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const initializePagination = (selector, length, pagination) => {
  const generateFirstLastButtonTemplateLiteral = (value, label, text) => {
    return `
       <button type="button" value="${value}" class="pagination-button-box" aria-label="${label} 페이지로 이동" >${text}</button>
      `;
  };

  const firstButtonTemplateLiteral = generateFirstLastButtonTemplateLiteral(1, "처음", "&lt;");
  const lastButtonTemplateLiteral = generateFirstLastButtonTemplateLiteral(length, "마지막", "&gt;");

  renderTemplateLiteralToHtml(selector, () => {
    const paginationButtonTemplate = Array.from({ length }, (_, index) => {
      const pageIndex = index + 1;
      const isCurrentPage = pagination === pageIndex;
      const ariaCurrentPage = isCurrentPage ? 'aria-current="page"' : "";

      return `
        <button type="button" value="${pageIndex}" class="pagination-button" aria-label="${pageIndex} 페이지로 이동" ${ariaCurrentPage}>${pageIndex}</button>
      `;
    }).join(" ");

    return `
      ${firstButtonTemplateLiteral}
      ${paginationButtonTemplate}
      ${lastButtonTemplateLiteral}
    `;
  });
};

const setPaginationButton = (articles) => {
  const paginationButtonElements = document.querySelectorAll(".pagination-button");

  paginationButtonElements.forEach((element) => {
    element.addEventListener("click", function (event) {
      const { value } = event.target;
      const updatedStorageArticles = {
        ...articles,
        [ARTICLES_KEY.PAGINATION]: Number(value),
      };
      setSessionStorage(ARTICLES_KEY.ARTICLES, updatedStorageArticles);

      navigateTo(ROUTER_PATH.BOARD_LIST);
    });
  });
};

(() => {
  const selector = "#pagination";
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const { articlesPerPage, articlesLength, articlesPagination } = storageArticles;
  const length = Math.ceil(articlesLength / articlesPerPage);

  initializePagination(selector, length, articlesPagination);
  setPaginationButton(storageArticles);
})();
