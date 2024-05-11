import { KEY_LIST, PER_PAGE_LIST } from "/assets/js/constant.js";
import { generateData } from "/assets/js/data.js";
import { getSessionStorage, hasQueryParam, hasSessionStorage, redirectToUpdatedUrl } from "/assets/js/utility.js";

export const initializeArticles = () => {
  if (!hasQueryParam(KEY_LIST.PAGINATION) || !hasQueryParam(KEY_LIST.PER_PAGE)) {
    const params = [
      { key: KEY_LIST.PER_PAGE, value: PER_PAGE_LIST[0] },
      { key: KEY_LIST.PAGINATION, value: 1 },
    ];

    return redirectToUpdatedUrl(params);
  }

  if (!hasSessionStorage(KEY_LIST.ARTICLES)) {
    generateData(40);
  }

  return getSessionStorage(KEY_LIST.ARTICLES);
};
