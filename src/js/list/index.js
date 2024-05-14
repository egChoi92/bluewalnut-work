import initializeButton from "/src/js/list/button.js";
import initializeData from "/src/js/list/data.js";
import initializePagination from "/src/js/list/pagination.js";
import initializePerPage from "/src/js/list/perPage.js";
import initializeTable from "/src/js/list/table.js";

const initializeList = () => {
  initializeData();
  initializePerPage();
  initializeTable();
  initializePagination();
  initializeButton();
};

export default initializeList;
