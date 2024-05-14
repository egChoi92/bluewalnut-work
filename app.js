import { ROUTER_PATH } from "/src/js/constant.js";
import { navigateTo, router } from "/src/js/navigation.js";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", function () {
  const path = new URL(window.location.href).pathname;

  if (path === "/") navigateTo(ROUTER_PATH.BOARD_LIST);
});
