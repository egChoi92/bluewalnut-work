import { PER_PAGE_LIST } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { router } from "/src/js/navigation.js";
import { paginationState, perPageState } from "/src/js/state.js";

const renderPerPage = (selector) => {
  const perPage = perPageState.get();
  renderTemplateLiteralToHtml(selector, () => {
    const optionTemplateLiteral = PER_PAGE_LIST.map((value) => {
      const isSelect = value === perPage;
      const selected = isSelect ? "selected" : "";

      return `<option value="${value}" ${selected} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>`;
    }).join(" ");

    return optionTemplateLiteral;
  });
};

const setPerPageSelector = (selector) => {
  document.querySelector(selector).addEventListener("change", function (event) {
    const { value } = event.target;
    perPageState.set(Number(value));
    paginationState.set(1);
    router();
  });
};

const initializePerPage = () => {
  const selector = "#perPageSelector";

  renderPerPage(selector);
  setPerPageSelector(selector);
};

export default initializePerPage;
