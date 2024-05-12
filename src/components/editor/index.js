import { ARTICLES_KEY, EDITOR_KEY } from "/src/js/constant.js";
import { getSessionStorage } from "/src/js/storage.js";

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

const setUpdateModeToEditor = (editor) => {
  const editorId = getSessionStorage(EDITOR_KEY.ID, "null");

  if (!editorId) return;

  const { articlesData } = getSessionStorage(ARTICLES_KEY.ARTICLES);
  const article = articlesData.find((article) => article.id === editorId);
  editor.setMarkdown(article.content || "");
};

// Note: 글 저장 작업 중
const initializedSubmit = (editor) => () => {
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

  // // Note: submit 함수의 트리거 구현 필요
  // const handleSubmit = () => {
  //   const editorContent = editor.getMarkdown();
  //   const updatedArticles = isUpdateMode ? updateExistingArticle(editorId, existingArticles, editorContent) : addNewArticle(existingArticles, editorContent);

  //   setSessionStorage(KEY_LIST.ARTICLES, updatedArticles);
  // };
};

(() => {
  const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "70vh",
    initialEditType: "wysiwyg",
    previewStyle: "vertical",
  });

  setCharCounter(editor);
  setUpdateModeToEditor(editor);
})();
