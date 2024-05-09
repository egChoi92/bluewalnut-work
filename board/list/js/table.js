export const generateData = (length = 40) => {
  const titles = ["공지사항", "FAQ", "Q&A", "뉴스", "소개"];
  const authors = ["최은광", "블루월넛", "홍길동", "김철수", "이영희"];

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

  if (!hasSessionStorage("articles")) {
    setSessionStorage("articles", articles);
  }
};

export const initializeTable = (articles) => {
  const tableBody = document.querySelector("#tableBody");
  const isEmptyArticle = !articles || !articles.length;

  renderHTMl(tableBody, () => {
    return isEmptyArticle
      ? removeExtraSpacesBeforeTags(`
			<div role="row">
				<div role="cell">등록된 글이 없습니다.</div>
			</div>
		`)
      : articles?.map((article) => {
          return removeExtraSpacesBeforeTags(`
					<div role="row">
						<div data-column="index" role="cell">${article.index}</div>
						<div data-column="title" role="cell"><a href="/board/write/?id=${article.id}">${article.title}</a></div>
						<div data-column="author" role="cell">${article.author}</div>
						<div data-column="date" role="cell">${article.date}</div>
						<div data-column="views" role="cell">${article.views}</div>
					</div>
				`);
        });
  });
};
