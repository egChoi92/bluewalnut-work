import { ARTICLES_KEY, PER_PAGE_LIST } from "/src/js/constant.js";
import { setSessionStorage } from "/src/js/storage.js";

const titles = ["공지사항", "FAQ", "Q&A", "뉴스", "소개"];
const authors = ["박민", "최은광", "블루월넛", "홍길동", "김철수", "이영희"];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 11, 31);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split("T")[0];
};

export const generateTitle = () => titles[getRandomInt(0, titles.length - 1)];

export const generateAuthor = () => authors[getRandomInt(0, authors.length - 1)];

export const generateData = (length = 40) => {
  const articlesData = Array.from({ length }, (_, index) => {
    const articleIndex = index + 1;
    const articleTitle = generateTitle();
    const articleAuthor = generateAuthor();
    const articleDate = getRandomDate();

    return {
      id: crypto.randomUUID(),
      index: articleIndex,
      title: `${articleTitle} 관련 글입니다.`,
      content: `안녕하세요, ${articleAuthor}입니다. \n${articleTitle} 게시판에 글을 남깁니다. \n감사합니다. \n작성일자: ${articleDate}`,
      author: articleAuthor,
      date: articleDate,
      views: getRandomInt(0, 500),
    };
  });

  const articles = {
    [ARTICLES_KEY.DATA]: articlesData,
    [ARTICLES_KEY.LENGTH]: articlesData.length,
    [ARTICLES_KEY.PER_PAGE]: PER_PAGE_LIST[0],
    [ARTICLES_KEY.PAGINATION]: 1,
  };

  setSessionStorage(ARTICLES_KEY.ARTICLES, articles);
};

export const replacer = (key, value) => {
  const seen = new WeakSet();
  return function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
