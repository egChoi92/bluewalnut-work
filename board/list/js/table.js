import { Keys } from "/assets/js/constant.js";
import { getQueryParamValue, hasSessionStorage, removeExtraSpacesBeforeTags, renderHTMl, setSessionStorage } from "/assets/js/utility.js";

export const generateData = (length = 40) => {
  const titles = ["공지사항", "FAQ", "Q&A", "뉴스", "소개"];
  const authors = ["박민", "최은광", "블루월넛", "홍길동", "김철수", "이영희"];

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date(2024, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split("T")[0];
  };

  const articles = Array.from({ length }, (_, index) => ({
    id: crypto.randomUUID(),
    index: index + 1,
    title: `${titles[getRandomInt(0, titles.length - 1)]} 게시글의 제목입니다.`,
    author: authors[getRandomInt(0, authors.length - 1)],
    date: getRandomDate(),
    views: getRandomInt(0, 500),
  }));

  if (!hasSessionStorage(Keys.ARTICLES)) {
    setSessionStorage(Keys.ARTICLES, articles);
  }
};

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
