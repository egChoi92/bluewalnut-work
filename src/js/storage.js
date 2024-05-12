export const setSessionStorage = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

export const getSessionStorage = (key, exceptionString) => JSON.parse(sessionStorage.getItem(key) ?? exceptionString);

export const hasSessionStorage = (key) => sessionStorage.getItem(key) !== null;

export const removeSessionStorage = (key) => sessionStorage.removeItem(key);
