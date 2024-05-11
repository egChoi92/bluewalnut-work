let editor = null;

export const initializeEditor = () => {
  if (!editor) {
    editor = new toastui.Editor({
      el: document.querySelector("#editor"),
      previewStyle: "vertical",
      height: "70vh",
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
    });
  }

  const charCount = document.querySelector("#charCount");

  const getStringByteSize = (string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(string);
    return encoded.length;
  };

  editor.on("change", function (event) {
    const markdown = editor.getMarkdown();
    const size = getStringByteSize(markdown);

    charCount.textContent = size;
  });
};

export const getEditor = () => {
  if (!editor) throw new Error("에디터가 초기화되지 않았습니다.");

  return editor;
};
