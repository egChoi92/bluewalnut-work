import { ARTICLES_KEY } from "/src/js/constant.js";
import { articleIdState, editorState } from "/src/js/state.js";
import { getSessionStorage } from "/src/js/storage.js";

const setCharCounter = () => {
  const editor = editorState.get();
  const charCountElement = document.querySelector("#charCount");
  editor.on("change", function (event) {
    const markdown = editor.getMarkdown();
    const encoder = new TextEncoder();
    const encoded = encoder.encode(markdown);
    const size = encoded.length;

    charCountElement.textContent = size;
  });
};

const setUpdateModeToEditor = () => {
  const editorId = articleIdState.get();

  if (!editorId) return;

  const editor = editorState.get();
  const storageArticles = getSessionStorage(ARTICLES_KEY.ARTICLES);

  const article = storageArticles.find((article) => article.id === editorId);
  editor.setMarkdown(article.content || "");
};

const initializeEditor = () => {
  const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "60vh",
    initialEditType: "wysiwyg",
    previewStyle: "vertical",
  });

  editorState.set(editor);

  setCharCounter();
  setUpdateModeToEditor();
};

export default initializeEditor;
