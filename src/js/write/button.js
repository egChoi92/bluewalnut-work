import { postStorageArticles, updateStorageArticles } from "/src/js/article.js";
import { ROUTER_PATH } from "/src/js/constant.js";
import { navigateTo } from "/src/js/navigation.js";
import { articleIdState, editorState } from "/src/js/state.js";
const initializeButton = () => {
  const editorId = articleIdState.get();
  const editor = editorState.get();

  document.querySelector("#cancelButton").addEventListener("click", () => {
    navigateTo(ROUTER_PATH.BOARD_LIST);
  });

  document.querySelector("#submitButton").addEventListener("click", () => {
    const editorContent = editor.getMarkdown();
    const content = { content: editorContent };

    if (editorId) {
      updateStorageArticles(editorId, content);
    } else {
      postStorageArticles(content);
    }

    navigateTo(ROUTER_PATH.BOARD_LIST);
  });
};

export default initializeButton;
