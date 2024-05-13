import { ARTICLES_KEY, EDITOR_KEY } from "/src/js/constant.js";
import { editorState } from "/src/js/state.js";
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

const setUpdateModeToEditor = (editor, id, articles) => {
  if (!id) return;

  const article = articles.find((article) => article.id === id);
  editor.setMarkdown(article.content || "");
};

const initializeEditor = () => {
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

  editorState.set(editor);

  setCharCounter(editor);
  setUpdateModeToEditor(editor, editorId, articlesData);
};

export default initializeEditor;
