const getStringByteSize = (string) => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(string);

  return encoded.length;
};

export const initializeCharCount = (editor) => {
  const charCount = document.querySelector("#charCount");

  editor.on("change", function (event) {
    const markdown = editor.getMarkdown();
    const size = getStringByteSize(markdown);

    charCount.textContent = size;
  });
};
