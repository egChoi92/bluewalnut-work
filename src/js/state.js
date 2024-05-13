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
