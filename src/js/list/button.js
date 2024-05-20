import { ROUTER_PATH } from "/src/js/common/constant.js";
import { navigateTo } from "/src/js/common/navigation.js";
import { articleIdState } from "/src/js/common/state.js";

const initializeButton = () => {
  const clickWriteButton = () => {
    if (articleIdState.get()) {
      articleIdState.set(null);
    }

    navigateTo(ROUTER_PATH.BOARD_WRITE);
  };

  document.querySelector("#writeButton").addEventListener("click", clickWriteButton);
};

export default initializeButton;
