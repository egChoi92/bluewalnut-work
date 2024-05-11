import { initializeEditor } from "./js/editor.js";
import { initializePost } from "./js/post.js";

document.addEventListener("DOMContentLoaded", function () {
  initializeEditor();

  const writeForm = document.querySelector("#writeForm");
  writeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    initializePost();
  });
});
