import { ARTICLES_KEY } from "/src/js/common/constant.js";
import { generateData } from "/src/js/common/generator.js";
import { getSessionStorage, hasSessionStorage } from "/src/js/common/storage.js";

const initializeData = () => {
  if (!hasSessionStorage(ARTICLES_KEY.ARTICLES)) {
    generateData(40);
  }

  return getSessionStorage(ARTICLES_KEY.ARTICLES);
};

export default initializeData;
