import { ARTICLES_KEY, EDITOR_KEY, POST_MESSAGE, ROUTER_PATH } from "/src/js/constant.js";
import { generateAuthor, generateTitle } from "/src/js/data.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, setSessionStorage } from "/src/js/storage.js";

const setCharCounter = (editor) => {
  const charCountElement = document.querySelector("#charCount");
  editor.on("change", function (event) {
    const markdown = editor.getMarkdown();
    const encoder = new TextEncoder();
    const encoded = encoder.encode(markdown);
    const size = encoded.length;

    charCountElement.textContent = size;
  });
};

const setUpdateModeToEditor = (editor, id, articles) => {
  if (!id) return;

  const article = articles.find((article) => article.id === id);
  editor.setMarkdown(article.content || "");
};

// Note: 글 저장 작업 중
const initializedSubmit = (id, articles) => {
  const addNewArticle = (content) => {
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

  const updateExistingArticle = (content) => articles.map((article) => (article.id === id ? { ...article, content } : article));

  return {
    addNewArticle,
    updateExistingArticle,
  };
};

(() => {
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);

  const { articlesData } = storageArticles;
  const editorId = getSessionStorage(EDITOR_KEY.ID, "null");

  const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "70vh",
    initialEditType: "wysiwyg",
    previewStyle: "vertical",
  });

  setCharCounter(editor);
  setUpdateModeToEditor(editor, editorId, articlesData);
  const { addNewArticle, updateExistingArticle } = initializedSubmit(editorId, articlesData);

  const handleMessage = (event) => {
    console.log("🚀 ~ handleMessage ~ event:", event);
    if (event.data === POST_MESSAGE.WRITE_SUBMIT) {
      const editorContent = editor.getMarkdown();
      const updatedArticles = editorId ? updateExistingArticle(editorContent) : addNewArticle(editorContent);
      const updatedStorageArticles = {
        ...storageArticles,
        [ARTICLES_KEY.DATA]: updatedArticles,
        [ARTICLES_KEY.LENGTH]: updatedArticles.length,
      };
      setSessionStorage(ARTICLES_KEY.ARTICLES, updatedStorageArticles);
      navigateTo(ROUTER_PATH.BOARD_LIST);

      window.removeEventListener("message", handleMessage);
    }
  };

  window.addEventListener("message", handleMessage);
})();
