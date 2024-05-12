import { KEY_LIST } from "/assets/js/constant.js";
import { generateAuthor, generateTitle } from "/assets/js/data.js";
import { getQueryParamValue } from "/assets/js/urlUtils.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const addNewArticle = (articles, content) => {
  const newArticle = {
    id: crypto.randomUUID(),
    index: articles.length + 1,
    title: `새로운 ${generateTitle()} 관련 글입니다.`,
    content,
    author: generateAuthor(),
    date: new Date().toISOString().split("T")[0],
    views: 0,
  };

  return [...articles, newArticle];
};

const updateExistingArticle = (id, articles, content) => articles.map((article) => (article.id === id ? { ...article, content } : article));

const setEditorContentFromArticle = (id, articles, editor) => {
  const article = articles.find((article) => article.id === id);
  editor.setMarkdown(article.content || "");
};

export const initializeForm = (editor) => {
  const articleId = getQueryParamValue(KEY_LIST.ID);
  console.log("🚀 ~ initializeForm ~ articleId:", articleId);
  const isUpdateMode = articleId !== null;
  const existingArticles = getSessionStorage(KEY_LIST.ARTICLES, "[]");

  if (isUpdateMode) {
    setEditorContentFromArticle(articleId, existingArticles, editor);
  }

  const writeFormElement = document.querySelector("#writeForm");
  writeFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const editorContent = editor.getMarkdown();
    const updatedArticles = isUpdateMode ? updateExistingArticle(articleId, existingArticles, editorContent) : addNewArticle(existingArticles, editorContent);

    setSessionStorage(KEY_LIST.ARTICLES, updatedArticles);
    window.location.href = "/board/list";
  });
};
