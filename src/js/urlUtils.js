export const getCurrentUrl = () => new URL(window.location.href);

export const getCurrentUrlPathname = () => getCurrentUrl().pathname;

export const getCurrentUrlParams = () => new URLSearchParams(window.location.search);
