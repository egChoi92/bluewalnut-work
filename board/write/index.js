import { initializeCharCount } from "./js/charCont.js";
import { initializeEditor } from "./js/editor.js";
import { initializePost } from "./js/post.js";

document.addEventListener("DOMContentLoaded", function () {
  initializeEditor();
  initializeCharCount();

  const writeForm = document.querySelector("#writeForm");
  writeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    initializePost();
  });
});
