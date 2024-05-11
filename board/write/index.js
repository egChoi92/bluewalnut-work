import { initializeCharCount } from "./js/charCont.js";
import { initializeEditor } from "./js/editor.js";
import { initializeForm } from "./js/form.js";

document.addEventListener("DOMContentLoaded", function () {
  const editor = initializeEditor();
  initializeCharCount(editor);
  initializeForm(editor);
});
