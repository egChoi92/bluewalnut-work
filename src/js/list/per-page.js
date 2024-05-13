import { ARTICLES_KEY, PER_PAGE_LIST, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const renderPerPage = (selector, perPage) => {
  renderTemplateLiteralToHtml(selector, () => {
    const optionTemplateLiteral = PER_PAGE_LIST.map((value) => {
      const isSelect = value === perPage;
      const selected = isSelect ? "selected" : "";

      return `<option value="${value}" ${selected} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>`;
    }).join(" ");

    return optionTemplateLiteral;
  });
};

const setPerPageSelector = (selector, articles) => {
  document.querySelector(selector).addEventListener("change", function (event) {
    const { value } = event.target;
    const updatedStorageArticles = {
      ...articles,
      [ARTICLES_KEY.PER_PAGE]: Number(value),
      [ARTICLES_KEY.PAGINATION]: 1,
    };
    setSessionStorage(ARTICLES_KEY.ARTICLES, updatedStorageArticles);

    navigateTo(ROUTER_PATH.BOARD_LIST);
  });
};

const initializePerPage = () => {
  const selector = "#perPageSelector";
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const { articlesPerPage } = storageArticles;

  renderPerPage(selector, articlesPerPage);
  setPerPageSelector(selector, storageArticles);
};

export default initializePerPage;
