import { POST_MESSAGE } from "/src/js/constant.js";
import { appendChild, createButton, loadHtmlContent } from "/src/js/htmlRenderer.js";

(async () => {
  const Selectors = {
    EDITOR_CONTAINER: "#editorContainer",
    FOOTER: "#footer",
  };

  await loadHtmlContent(Selectors.EDITOR_CONTAINER, "/src/components/editor");

  const CancelButton = createButton("button", "취소", "button-default", () => history.back());
  const SaveButton = createButton("button", "저장", "button-primary", () => {
    window.parent.postMessage(POST_MESSAGE.WRITE_SUBMIT);
  });
  appendChild(Selectors.FOOTER, CancelButton);
  appendChild(Selectors.FOOTER, SaveButton);
})();
