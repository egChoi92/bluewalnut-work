import { Keys } from "/assets/js/constant.js";
import { getQueryParamValue, removeExtraSpacesBeforeTags, renderHTMl } from "/assets/js/utility.js";

const maskString = (input) => {
  const string = input ?? "";
  const { length } = string;

  if (length <= 2) {
    return `${length === 2 ? string.charAt(0) : ""}*`;
  }

  return `${string.charAt(0)}${"*".repeat(Math.max(0, length - 2))}${length > 1 ? string.charAt(length - 1) : ""}`;
};

export const initializeTable = (articles) => {
  const tableBody = document.querySelector("#tableBody");
  const perPage = getQueryParamValue(Keys.PER_PAGE);
  const pagination = getQueryParamValue(Keys.PAGINATION);
  const isEmptyArticle = !articles || !articles.length;

  renderHTMl(tableBody, () => {
    if (isEmptyArticle) {
      return removeExtraSpacesBeforeTags(`
			<div role="row">
				<div role="cell">등록된 글이 없습니다.</div>
			</div>
		`);
    } else {
      const splittedArticles = articles.reduce((result, value, index) => {
        if (index % perPage === 0) result.push([]);
        result[result.length - 1].push(value);
        return result;
      }, []);
      const articlesIndex = pagination - 1;
      const articlesTemplate = splittedArticles[articlesIndex]
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

      return removeExtraSpacesBeforeTags(articlesTemplate);
    }
  });
};
