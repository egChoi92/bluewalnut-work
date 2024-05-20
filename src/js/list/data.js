import { ARTICLES_KEY } from "/src/js/common/constant.js";
import { generateData } from "/src/js/common/generator.js";
import { hasSessionStorage, setSessionStorage } from "/src/js/common/storage.js";

const initializeData = () => {
  if (!hasSessionStorage(ARTICLES_KEY.ARTICLES)) {
    const data = generateData(40);
    setSessionStorage(ARTICLES_KEY.ARTICLES, data);
  }
};

export default initializeData;
