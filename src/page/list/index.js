import { ARTICLES_KEY, EDITOR_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { generateData } from "/src/js/data.js";
import { appendChild, createButton, loadHtmlContent } from "/src/js/htmlRenderer.js";
import { navigateTo } from "/src/js/navigation.js";
import { getSessionStorage, hasSessionStorage, removeSessionStorage } from "/src/js/storage.js";

const initializeData = () => {
  if (!hasSessionStorage(ARTICLES_KEY.ARTICLES)) {
    generateData(40);
  }

  return getSessionStorage(ARTICLES_KEY.ARTICLES);
};

const renderDOM = async () => {
  const Selectors = {
    HEADER: "#header",
    TABLE_CONTAINER: "#tableContainer",
    FOOTER: "#footer",
  };

  await loadHtmlContent(Selectors.HEADER, "/src/components/per-page");
  await loadHtmlContent(Selectors.TABLE_CONTAINER, "/src/components/table");
  await loadHtmlContent(Selectors.FOOTER, "/src/components/pagination");

  const clickWriteButton = () => {
    if (hasSessionStorage(EDITOR_KEY.ID)) {
      removeSessionStorage(EDITOR_KEY.ID);
    }

    navigateTo(ROUTER_PATH.BOARD_WRITE);
  };
  const WriteButton = createButton("button", "회원 글쓰기", "button-primary", clickWriteButton);
  appendChild(Selectors.FOOTER, WriteButton);
};

(() => {
  initializeData();
  renderDOM();
})();
