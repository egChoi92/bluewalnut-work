export const initializeEditor = () => {
  return new toastui.Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "70vh",
    initialEditType: "wysiwyg",
    previewStyle: "vertical",
  });
};
