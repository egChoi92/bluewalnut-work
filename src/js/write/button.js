import { ARTICLES_KEY, EDITOR_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { generateAuthor, generateTitle } from "/src/js/generator.js";
import { navigateTo } from "/src/js/navigation.js";
import { editorState } from "/src/js/state.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const initializeButton = () => {
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const { articlesData } = storageArticles;
  const editorId = getSessionStorage(EDITOR_KEY.ID, "null");

  const editor = editorState.get();

  const addNewArticle = (content) => {
    const newArticle = {
      id: crypto.randomUUID(),
      index: articlesData.length + 1,
      title: `새로운 ${generateTitle()} 관련 글입니다.`,
      content,
      author: generateAuthor(),
      date: new Date().toISOString().split("T")[0],
      views: 0,
    };

    return [...articlesData, newArticle];
  };

  const updateExistingArticle = (content) => articlesData.map((article) => (article.id === editorId ? { ...article, content } : article));

  document.querySelector("#cancelButton").addEventListener("click", () => {
    history.back();
  });

  document.querySelector("#submitButton").addEventListener("click", () => {
    const editorContent = editor.getMarkdown();
    const updatedArticles = editorId ? updateExistingArticle(editorContent) : addNewArticle(editorContent);
    const updatedStorageArticles = {
      ...storageArticles,
      [ARTICLES_KEY.DATA]: updatedArticles,
      [ARTICLES_KEY.LENGTH]: updatedArticles.length,
    };
    setSessionStorage(ARTICLES_KEY.ARTICLES, updatedStorageArticles);
    navigateTo(ROUTER_PATH.BOARD_LIST);
  });
};

export default initializeButton;
