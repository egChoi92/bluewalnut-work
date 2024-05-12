const executeScripts = (selector) => {
  const container = document.querySelector(selector);
  const scripts = Array.from(container.querySelectorAll("script"));
  scripts.forEach((script) => {
    if (script.type === "module") {
      const newScript = document.createElement("script");
      newScript.type = "module";
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      script.remove();
      container.appendChild(newScript);
    }
  });
};

export const clearHtmlContent = (selector) => {
  const container = document.querySelector(selector);
  container.innerHTML = "";
};

export const renderTemplateLiteralToHtml = (selector, callbackFunction) => {
  const container = document.querySelector(selector);

  const templateLiteral = callbackFunction();
  if (typeof templateLiteral !== "string") console.error("렌더링 함수의 return 타입이 문자열이 아닙니다.");

  container.insertAdjacentHTML("beforeend", templateLiteral.replace(/\s+\</g, "<").trim());
};

export const loadHtmlContent = async (selector, filePath) => {
  try {
    const response = await fetch(filePath);

    if (!response.ok) throw new Error("응답에 실패했습니다.");

    const html = await response.text();

    clearHtmlContent(selector);
    renderTemplateLiteralToHtml(selector, () => html);
    executeScripts(selector);
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
