import { setupCharacterCounter } from "./modules/charCont.js";
import { initializeEditor } from "./modules/editor.js";
import { initializeForm } from "./modules/form.js";

document.addEventListener("DOMContentLoaded", function () {
  const editor = initializeEditor();
  setupCharacterCounter(editor);
  initializeForm(editor);
});
