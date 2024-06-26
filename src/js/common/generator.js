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
  const data = Array.from({ length }, (_, index) => {
    const articleIndex = index + 1;
    const articleTitle = generateTitle();
    const articleAuthor = generateAuthor();
    const articleDate = getRandomDate();

    return {
      id: crypto.randomUUID(),
      index: articleIndex,
      title: `${articleTitle} 관련 글입니다.`,
      content: `최초 작성일자: ${articleDate} \n\n안녕하세요. \n${articleTitle} 게시판에 글을 남깁니다. \n\n감사합니다.`,
      author: articleAuthor,
      date: articleDate,
      views: getRandomInt(0, 500),
    };
  });

  return data;
};
