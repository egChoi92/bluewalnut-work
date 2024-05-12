import { ARTICLES_KEY, PER_PAGE_LIST, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const selectors = "#perPageSelector";
const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
const perPageSelectorElement = document.querySelector(selectors);

perPageSelectorElement.addEventListener("change", function (event) {
  const { value } = event.target;
  const updatedStorageArticles = {
    ...storageArticles,
    [ARTICLES_KEY.PER_PAGE]: Number(value),
    [ARTICLES_KEY.PAGINATION]: 1,
  };
  setSessionStorage(ARTICLES_KEY.ARTICLES, updatedStorageArticles);

  navigateTo(ROUTER_PATH.BOARD_LIST);
});

(() => {
  const { articlesPerPage } = storageArticles;
  renderTemplateLiteralToHtml(selectors, () => {
    const optionTemplateLiteral = PER_PAGE_LIST.map((value) => {
      const isSelect = value === articlesPerPage;
      const selected = isSelect ? "selected" : "";

      return `<option value="${value}" ${selected} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>`;
    }).join(" ");

    return optionTemplateLiteral;
  });
})();
