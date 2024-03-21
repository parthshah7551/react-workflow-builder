export const filterDataByColumn = (
  filteredData,
  columnName,
  filterOptions,
  inputText
) => {
  switch (filterOptions) {
    case "1":
      return filteredData.filter((item) => {
        if (item && item[columnName] !== undefined && inputText !== undefined) {
          return item[columnName].toLowerCase() === inputText.toLowerCase();
        } else {
          return false;
        }
      });
    case "2":
      return filteredData.filter((item) => {
        if (item && item[columnName] !== undefined && inputText !== undefined) {
          return (item) =>
            item[columnName].toLowerCase() !== inputText.toLowerCase();
        } else {
          return false;
        }
      });
    case "3":
      return filteredData.filter((item) => {
        if (item && item[columnName] !== undefined && inputText !== undefined) {
          return item[columnName]
            .toLowerCase()
            .includes(inputText.toLowerCase());
        } else {
          return false;
        }
      });
    case "4":
      return filteredData.filter((item) => {
        if (item && item[columnName] !== undefined && inputText !== undefined) {
          return !item[columnName]
            .toLowerCase()
            .includes(inputText.toLowerCase());
        } else {
          return false;
        }
      });
    case "5":
      return filteredData.filter((item) => Object.keys(item).length > 0);
    default:
      return filteredData;
  }
};
