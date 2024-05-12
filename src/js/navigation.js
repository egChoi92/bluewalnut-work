import { ROUTER_PATH } from "/src/js/constant.js";
import { loadHtmlContent } from "/src/js/htmlRenderer.js";
import { getCurrentUrlPathname } from "/src/js/urlUtils.js";

export const router = () => {
  const selector = "#app";
  const path = getCurrentUrlPathname();

  switch (path) {
    case ROUTER_PATH.BOARD_LIST:
      loadHtmlContent(selector, "/src/page/list");
      break;

    default:
      break;
  }
};

export const navigateTo = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  router();
};
