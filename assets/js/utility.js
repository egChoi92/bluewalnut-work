export const setSessionStorage = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

export const getSessionStorage = (key) => JSON.parse(sessionStorage.getItem(key));

export const hasSessionStorage = (key) => sessionStorage.getItem(key) !== null;

export const renderHTMl = (container, callbackFunction) => {
  if (!container) throw new Error("선택자와 일치하는 요소를 찾을 수 없습니다.");

  const template = callbackFunction();
  if (typeof template !== "string") throw new Error("렌더링 함수의 return 타입이 문자열이 아닙니다.");

  container.insertAdjacentHTML("beforeend", template);
};

export const removeExtraSpacesBeforeTags = (template) => template.replace(/\s+\</g, "<").trim();

export const getUrlObjectUpdatedParams = (params) => {
  const urlObject = new URL(window.location.href);
  params.map(({ key, value }) => urlObject.searchParams.set(key, value));

  return urlObject;
};

export const redirectToUpdatedUrl = (params) => {
  const urlObject = getUrlObjectUpdatedParams(params);

  return (window.location.href = urlObject.href);
};

export const getCurrentUrlParams = () => new URLSearchParams(window.location.search);

export const getQueryParamValue = (key) => getCurrentUrlParams().get(key);

export const hasQueryParam = (key) => getCurrentUrlParams().has(key);
