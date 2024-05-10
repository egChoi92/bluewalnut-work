import { Keys, perPageList } from "/assets/js/constant.js";
import { getQueryParamValue, redirectToUpdatedUrl, removeExtraSpacesBeforeTags, renderHTMl } from "/assets/js/utility.js";

export const initializePerPage = (data) => {
  const perPageSelector = document.querySelector("#perPageSelector");
  const perPage = getQueryParamValue(Keys.PER_PAGE);

  renderHTMl(perPageSelector, () => {
    const optionTemplate = perPageList
      .map((value) => {
        const isSelect = value === perPage;
        const selected = isSelect ? "selected" : "";

        return `<option value="${value}" ${selected} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>`;
      })
      .join(" ");

    return removeExtraSpacesBeforeTags(optionTemplate);
  });

  perPageSelector.addEventListener("change", function (event) {
    const params = [
      { key: Keys.PER_PAGE, value: event.target.value },
      { key: Keys.PAGINATION, value: 1 },
    ];

    return redirectToUpdatedUrl(params);
  });
};
