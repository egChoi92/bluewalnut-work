import { ARTICLES_KEY } from "/src/js/constant.js";
import { generateAuthor, generateTitle } from "/src/js/generator.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

export const postStorageArticles = (content) => {
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const newArticle = {
    id: crypto.randomUUID(),
    index: storageArticles.length + 1,
    title: `새로운 ${generateTitle()} 관련 글입니다.`,
    content,
    author: generateAuthor(),
    date: new Date().toISOString().split("T")[0],
    views: 0,
  };
  const updatedArticles = [...storageArticles, newArticle];

  setSessionStorage(ARTICLES_KEY.ARTICLES, updatedArticles);
};

export const updateStorageArticles = (id, updateData) => {
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const updatedArticles = storageArticles.map((article) => {
    return article.id === id ? { ...article, ...updateData } : article;
  });

  setSessionStorage(ARTICLES_KEY.ARTICLES, updatedArticles);
};
