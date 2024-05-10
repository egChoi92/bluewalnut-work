import { Keys, perPageList } from "/assets/js/constant.js";
import { getQueryParamValue, redirectToUpdatedUrl, removeExtraSpacesBeforeTags, renderHTMl } from "/assets/js/utility.js";

export const initializePerPage = (data) => {
  const perPageSelector = document.querySelector("#perPageSelector");
  const perPage = getQueryParamValue(Keys.PER_PAGE);

  renderHTMl(perPageSelector, () => {
    return perPageList.map((value) => {
      const isSelect = value === perPage;
      return removeExtraSpacesBeforeTags(`
          <option value="${value}" ${isSelect ? "selected" : ""} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>
				`);
    });
  });

  perPageSelector.addEventListener("change", function (event) {
    const params = [
      { key: Keys.PER_PAGE, value: event.target.value },
      { key: Keys.PAGINATION, value: 1 },
    ];

    return redirectToUpdatedUrl(params);
  });
};
