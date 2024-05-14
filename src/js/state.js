import { PER_PAGE_LIST } from "/src/js/constant.js";
export const editorState = (() => {
  let state = null;
  const get = () => {
    return state;
  };

  const set = (data) => {
    state = data;
  };

  return {
    get,
    set,
  };
})();

export const perPageState = (() => {
  let state = PER_PAGE_LIST[0];
  const get = () => {
    return state;
  };

  const set = (data) => {
    state = data;
  };

  return {
    get,
    set,
  };
})();

export const paginationState = (() => {
  let state = 1;
  const get = () => {
    return state;
  };

  const set = (data) => {
    state = data;
  };

  return {
    get,
    set,
  };
})();

export const articleIdState = (() => {
  let state = null;
  const get = () => {
    return state;
  };

  const set = (data) => {
    state = data;
  };

  return {
    get,
    set,
  };
})();
