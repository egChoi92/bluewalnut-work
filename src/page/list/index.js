import { ARTICLES_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { generateData } from "/src/js/data.js";
import { appendChild, createButton, loadHtmlContent } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, hasSessionStorage } from "/src/js/storage.js";

const initialize = () => {
  if (!hasSessionStorage(ARTICLES_KEY.ARTICLES)) {
    generateData(40);
  }

  return getSessionStorage(ARTICLES_KEY.ARTICLES);
};

const Selectors = {
  HEADER: "#header",
  TABLE_CONTAINER: "#tableContainer",
  FOOTER: "#footer",
};

(async () => {
  initialize();

  await loadHtmlContent(Selectors.HEADER, "/src/components/per-page");
  await loadHtmlContent(Selectors.TABLE_CONTAINER, "/src/components/table");
  await loadHtmlContent(Selectors.FOOTER, "/src/components/pagination");

  const WriteButton = createButton("button", "회원 글쓰기", "button-primary", () => navigateTo(ROUTER_PATH.BOARD_WRITE));
  appendChild(Selectors.FOOTER, WriteButton);
})();
