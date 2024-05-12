import { ARTICLES_KEY, EDITOR_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const maskString = (input) => {
  const string = input ?? "";
  const { length } = string;

  if (length <= 2) {
    return `${length === 2 ? string.charAt(0) : ""}*`;
  }

  return `${string.charAt(0)}${"*".repeat(Math.max(0, length - 2))}${length > 1 ? string.charAt(length - 1) : ""}`;
};

const selector = "#tableBody";
const { articlesData, articlesPerPage, articlesPagination } = getSessionStorage(ARTICLES_KEY.ARTICLES);

(() => {
  const isEmptyArticle = !articlesData || !articlesData.length;

  renderTemplateLiteralToHtml(selector, () => {
    if (isEmptyArticle) {
      return `
        <div role="row">
          <div role="cell">등록된 글이 없습니다.</div>
        </div>
      `;
    } else {
      const splittedData = articlesData.reduce((result, value, index) => {
        if (index % articlesPerPage === 0) result.push([]);
        result[result.length - 1].push(value);
        return result;
      }, []);

      const articlesIndex = articlesPagination - 1;
      const articlesTemplateLiteral = splittedData[articlesIndex]
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

  const titleButtonElements = document.querySelectorAll(".title-button");
  titleButtonElements.forEach((element) => {
    element.addEventListener("click", function (event) {
      const { value } = event.target;
      setSessionStorage(EDITOR_KEY.ID, value);
      navigateTo(ROUTER_PATH.BOARD_WRITE);
    });
  });
})();
