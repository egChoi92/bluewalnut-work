import { EDITOR_KEY, ROUTER_PATH } from "/src/js/constant.js";
import { navigateTo } from "/src/js/navigation.js";
import { hasSessionStorage, removeSessionStorage } from "/src/js/storage.js";

const initializeButton = () => {
  const clickWriteButton = () => {
    if (hasSessionStorage(EDITOR_KEY.ID)) {
      removeSessionStorage(EDITOR_KEY.ID);
    }

    navigateTo(ROUTER_PATH.BOARD_WRITE);
  };

  document.querySelector("#writeButton").addEventListener("click", clickWriteButton);
};

export default initializeButton;
