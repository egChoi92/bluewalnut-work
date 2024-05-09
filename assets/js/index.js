const setSessionStorage = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

const getSessionStorage = (key) => JSON.parse(sessionStorage.getItem(key));

const hasSessionStorage = (key) => sessionStorage.getItem(key) !== null;

const renderHTMl = (container, callbackFunction) => {
  if (!container) throw new Error("선택자와 일치하는 요소를 찾을 수 없습니다.");

  const template = typeof callbackFunction() === "object" ? callbackFunction().join("") : callbackFunction();
  container.insertAdjacentHTML("beforeend", template);
};

const removeExtraSpacesBeforeTags = (template) => template.replace(/\s+\</g, "<").trim();

const redirectToUpdatedUrl = (key, value) => {
  const urlObject = new URL(window.location.href);
  urlObject.searchParams.set(key, value);
  window.location.href = urlObject.href;
};

const getQueryParamValue = (key) => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get(key);
};
