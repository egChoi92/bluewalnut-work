import { ARTICLES_KEY } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { router } from "/src/js/navigation.js";
import { paginationState, perPageState } from "/src/js/state.js";
import { getSessionStorage } from "/src/js/storage.js";

const renderPagination = () => {
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const pagination = paginationState.get();
  const perPage = perPageState.get();
  const length = Math.ceil(storageArticles.length / perPage);

  const generateFirstLastButtonTemplateLiteral = (value, label, text) => {
    return `
       <button type="button" value="${value}" class="pagination-button pagination-button-box" aria-label="${label} 페이지로 이동" >${text}</button>
      `;
  };

  const firstButtonTemplateLiteral = generateFirstLastButtonTemplateLiteral(1, "처음", "&lt;");
  const lastButtonTemplateLiteral = generateFirstLastButtonTemplateLiteral(length, "마지막", "&gt;");

  renderTemplateLiteralToHtml("#pagination", () => {
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
  document.querySelectorAll(".pagination-button").forEach((element) => {
    element.addEventListener("click", function (event) {
      const { value } = event.target;
      paginationState.set(Number(value));
      router();
    });
  });
};

const initializePagination = () => {
  renderPagination();
  setPaginationButton();
};

export default initializePagination;
