import { updateStorageArticles } from "/src/js/article.js";
import { ARTICLES_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { articleIdState, paginationState, perPageState } from "/src/js/state.js";
import { getSessionStorage } from "/src/js/storage.js";

const renderTable = () => {
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const perPage = perPageState.get();
  const pagination = paginationState.get();
  const isEmpty = !storageArticles || !storageArticles.length;

  const maskString = (input) => {
    const string = input ?? "";
    const { length } = string;

    if (length <= 2) {
      return `${length === 2 ? string.charAt(0) : ""}*`;
    }

    return `${string.charAt(0)}${"*".repeat(Math.max(0, length - 2))}${length > 1 ? string.charAt(length - 1) : ""}`;
  };

  renderTemplateLiteralToHtml("#tableBody", () => {
    if (isEmpty) {
      return `
        <div role="row">
          <div role="cell">등록된 글이 없습니다.</div>
        </div>
      `;
    } else {
      const splittedData = storageArticles.reduce((result, value, index) => {
        if (index % perPage === 0) {
          result.push([]);
        }
        result[result.length - 1].push(value);
        return result;
      }, []);

      const currentPage = pagination - 1;
      const articlesTemplateLiteral = splittedData[currentPage]
        .map(
          (article) => `
            <div role="row">
              <div role="cell" data-column="index">${article.index}</div>
              <div role="cell" data-column="title"><button type="button" value="${article.id}" class="title-button">${article.title}</button></div>
              <div role="cell" data-column="author">${maskString(article.author)}</div>
              <div role="cell" data-column="date">${article.date}</div>
              <div role="cell" data-column="views">${article.views}</div>
            </div>
          `
        )
        .join(" ");

      return articlesTemplateLiteral;
    }
  });
};

const setTitleButton = () => {
  document.querySelectorAll(".title-button").forEach((element) => {
    element.addEventListener("click", function (event) {
      const { value: id } = event.target;
      const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
      const views = storageArticles.find((article) => article.id === id).views;

      articleIdState.set(id);
      updateStorageArticles(id, { views: views + 1 });
      navigateTo(ROUTER_PATH.BOARD_WRITE);
    });
  });
};

const initializeTable = () => {
  renderTable();
  setTitleButton();
};

export default initializeTable;
