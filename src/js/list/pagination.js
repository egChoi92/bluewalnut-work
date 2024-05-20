import { ARTICLES_KEY } from "/src/js/common/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/common/htmlRenderer.js";
import { paginationState, perPageState } from "/src/js/common/state.js";
import { getSessionStorage } from "/src/js/common/storage.js";
import initializePerPage from "/src/js/list/perPage.js";
import initializeTable from "/src/js/list/table.js";
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

const setPaginationButton = () => {
  document.querySelectorAll(".pagination-button").forEach((element) => {
    element.addEventListener("click", function (event) {
      const { value } = event.target;
      paginationState.set(Number(value));

      initializePagination();
      initializePerPage();
      initializeTable();
    });
  });
};

const initializePagination = () => {
  renderPagination();
  setPaginationButton();
};

export default initializePagination;
