import { ARTICLES_KEY } from "/src/js/constant.js";
import { renderTemplateLiteralToHtml } from "/src/js/htmlRenderer.js";
import { getSessionStorage } from "/src/js/storage.js";

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
              <div data-column="title" role="cell"><a href="/board/write/?id=${article.id}">${article.title}</a></div>
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
})();
