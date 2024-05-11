import { getEditor } from "./editor.js";
import { KEY_LIST } from "/assets/js/constant.js";
import { generateAuthor, generateTitle } from "/assets/js/data.js";
import { getSessionStorage, setSessionStorage } from "/assets/js/utility.js";

export const initializePost = () => {
  const editor = getEditor();
  const markdown = editor.getMarkdown();

  const articles = getSessionStorage(KEY_LIST.ARTICLES, "[]");
  const newArticle = {
    id: crypto.randomUUID(),
    index: articles.length + 1,
    title: `새로운 ${generateTitle()} 관련 글입니다.`,
    content: markdown,
    author: generateAuthor(),
    date: new Date().toISOString().split("T")[0],
    views: 0,
  };
  const updateArticles = [...articles, newArticle];

  setSessionStorage(KEY_LIST.ARTICLES, updateArticles);
  window.location.href = "/board/list";
};
