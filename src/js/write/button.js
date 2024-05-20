import { postStorageArticles, updateStorageArticles } from "/src/js/common/article.js";
import { ROUTER_PATH } from "/src/js/common/constant.js";
import { navigateTo } from "/src/js/common/navigation.js";
import { articleIdState, editorState } from "/src/js/common/state.js";
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
