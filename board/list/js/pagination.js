import { KEY_LIST } from "/assets/js/constant.js";
import { getQueryParamValue, getUrlObjectUpdatedParams, removeExtraSpacesBeforeTags, renderHTMl } from "/assets/js/utility.js";

export const initializePagination = (articlesLength) => {
  const perPage = getQueryParamValue("perPage");
  const length = Math.ceil(articlesLength / perPage);
  const pagination = document.querySelector("#pagination");

  const generateFirstLastButtonTemplate = (value, label, text) => {
    const urlObject = getUrlObjectUpdatedParams([{ key: KEY_LIST.PAGINATION, value }]);

    return `
        <a href="${urlObject.href}" class="pagination-button-box" aria-label="${label} 페이지로 이동">${text}</a>
      `;
  };

  renderHTMl(pagination, () => {
    const paginationButtonTemplate = Array.from({ length }, (_, index) => {
      const pageIndex = index + 1;
      const urlObject = getUrlObjectUpdatedParams([{ key: KEY_LIST.PAGINATION, value: pageIndex }]);
      const isCurrentPage = urlObject.href === window.location.href;
      const ariaCurrentPage = isCurrentPage ? 'aria-current="page"' : "";

      return `
        <a href="${urlObject.href}" class="pagination-button" aria-label="${pageIndex} 페이지로 이동" ${ariaCurrentPage}>${pageIndex}</a>
      `;
    }).join(" ");

    return removeExtraSpacesBeforeTags(
      `${generateFirstLastButtonTemplate(1, "처음", "&lt;")}${paginationButtonTemplate}${generateFirstLastButtonTemplate(length, "마지막", "&gt;")}`
    );
  });
};
