export const initializePerPage = (data) => {
  const perPageSelector = document.querySelector("#perPageSelector");
  const perPageList = ["10", "20", "30", "40", "50"];

  const perPage = getQueryParamValue("perPage");

  renderHTMl(perPageSelector, () => {
    return perPageList.map((value) => {
      const isSelect = value === perPage;
      return removeExtraSpacesBeforeTags(`
          <option value="${value}" ${isSelect ? "selected" : ""} aria-label="항목 ${value}개씩 보기" >${value}개씩 보기</option>
				`);
    });
  });

  perPageSelector.addEventListener("change", function (event) {
    redirectToUpdatedUrl("perPage", event.target.value);
  });
};
