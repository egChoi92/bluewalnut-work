import { ARTICLES_KEY, EDITOR_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { paginationState, perPageState } from "/src/js/state.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

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
              <div data-column="index" role="cell">${article.index}</div>
              <div data-column="title" role="cell"><button type="button" value="${article.id}" class="title-button">${article.title}</button></div>
              <div data-column="author" role="cell">${maskString(article.author)}</div>
              <div data-column="date" role="cell">${article.date}</div>
              <div data-column="views" role="cell">${article.views}</div>
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
      const { value } = event.target;
      setSessionStorage(EDITOR_KEY.ID, value);
      navigateTo(ROUTER_PATH.BOARD_WRITE);
    });
  });
};

const initializeTable = () => {
  renderTable();
  setTitleButton();
};

export default initializeTable;
