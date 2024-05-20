import { PER_PAGE_LIST } from "/src/js/common/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/common/htmlRenderer.js";
import { paginationState, perPageState } from "/src/js/common/state.js";
import initializePagination from "/src/js/list/pagination.js";
import initializeTable from "/src/js/list/table.js";

const renderPerPage = () => {
  const perPage = perPageState.get();
  renderTemplateLiteralToHtml("#perPageSelector", () => {
    const optionTemplateLiteral = PER_PAGE_LIST.map((value) => {
      const isSelect = value === perPage;
      const selected = isSelect ? "selected" : "";

      return `<option value="${value}" aria-label="항목 ${value}개씩 보기" ${selected}>${value}개씩 보기</option>`;
    }).join(" ");

    return optionTemplateLiteral;
  });
};

const setPerPageSelector = () => {
  document.querySelector("#perPageSelector").addEventListener("change", function (event) {
    const { value: id } = event.target;
    perPageState.set(Number(id));
    paginationState.set(1);

    initializePagination();
    initializeTable();
  });
};

const initializePerPage = () => {
  renderPerPage();
  setPerPageSelector();
};

export default initializePerPage;
