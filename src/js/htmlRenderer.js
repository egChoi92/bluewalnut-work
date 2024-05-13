export const clearHtmlContent = (selector) => {
  const container = document.querySelector(selector);
  container.innerHTML = "";
};

export const renderTemplateLiteralToHtml = (selector, callbackFunction) => {
  clearHtmlContent(selector);
  const container = document.querySelector(selector);

  const templateLiteral = callbackFunction();
  if (typeof templateLiteral !== "string") console.error("렌더링 함수의 return 타입이 문자열이 아닙니다.");

  container.insertAdjacentHTML("beforeend", templateLiteral.replace(/\s+\</g, "<").trim());
};

export const loadHtmlContent = async (selector, filePath) => {
  const container = document.querySelector(selector);
  if (container.childElementCount) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) throw new Error("응답에 실패했습니다.");

    const html = await response.text();
    renderTemplateLiteralToHtml(selector, () => html);
  } catch (error) {
    console.error("HTML 에러:", error);
  }
};

export const createButton = (type, text, className, onClickAction) => {
  const button = document.createElement("button");
  button.type = type;
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClickAction);

  return button;
};

export const appendChild = (selector, child) => {
  const footerElement = document.querySelector(selector);
  footerElement.appendChild(child);
};
