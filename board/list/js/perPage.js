import { KEY_LIST, PER_PAGE_LIST } from "/assets/js/constant.js";
import { getQueryParamValue, redirectToUpdatedUrl, removeExtraSpacesBeforeTags, renderHTMl } from "/assets/js/utility.js";

export const renderPerPage = (data) => {
  const perPageSelectorElement = document.querySelector("#perPageSelector");
  const perPage = getQueryParamValue(KEY_LIST.PER_PAGE);

  perPageSelectorElement.addEventListener("change", function (event) {
    const params = [
      { key: KEY_LIST.PER_PAGE, value: event.target.value },
      { key: KEY_LIST.PAGINATION, value: 1 },
    ];

    return redirectToUpdatedUrl(params);
  });
  renderHTMl(perPageSelectorElement, () => {
    const optionTemplate = PER_PAGE_LIST.map((value) => {
      const isSelect = value === perPage;
      const selected = isSelect ? "selected" : "";

      return `<option value="${value}" ${selected} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>`;
    }).join(" ");

    return removeExtraSpacesBeforeTags(optionTemplate);
  });
};
