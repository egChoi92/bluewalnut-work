export const setSessionStorage = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

export const getSessionStorage = (key) => JSON.parse(sessionStorage.getItem(key));

export const hasSessionStorage = (key) => sessionStorage.getItem(key) !== null;

export const renderHTMl = (container, callbackFunction) => {
  if (!container) throw new Error("선택자와 일치하는 요소를 찾을 수 없습니다.");

  const template = typeof callbackFunction() === "object" ? callbackFunction().join("") : callbackFunction();
  container.insertAdjacentHTML("beforeend", template);
};

export const removeExtraSpacesBeforeTags = (template) => template.replace(/\s+\</g, "<").trim();

export const redirectToUpdatedUrl = (key, value) => {
  const urlObject = new URL(window.location.href);
  urlObject.searchParams.set(key, value);

  window.location.href = urlObject.href;
};

export const getCurrentUrlParams = () => new URLSearchParams(window.location.search);

export const getQueryParamValue = (key) => getCurrentUrlParams().get(key);

export const hasQueryParam = (key) => getCurrentUrlParams().has(key);
