import { ROUTER_PATH } from "/src/js/common/constant.js";
import { loadHtmlContent } from "/src/js/common/htmlRenderer.js";
import initializeList from "/src/js/list/index.js";
import initializeWrite from "/src/js/write/index.js";

export const router = async () => {
  const selector = "#app";
  const path = new URL(window.location.href).pathname;

  switch (path) {
    case ROUTER_PATH.BOARD_LIST:
      await loadHtmlContent(selector, "/src/page/list");
      initializeList();
      break;
    case ROUTER_PATH.BOARD_WRITE:
      await loadHtmlContent(selector, "/src/page/write");
      initializeWrite();
    case ROUTER_PATH.TEST:
      await loadHtmlContent(selector, "/src/page/test");
      initializeWrite();
    default:
      break;
  }
};

export const navigateTo = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  router();
};
