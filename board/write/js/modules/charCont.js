const getStringByteSize = (string) => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(string);

  return encoded.length;
};

export const setupCharacterCounter = (editor) => {
  const charCountElement = document.querySelector("#charCount");

  editor.on("change", function (event) {
    const markdown = editor.getMarkdown();
    const size = getStringByteSize(markdown);

    charCountElement.textContent = size;
  });
};
