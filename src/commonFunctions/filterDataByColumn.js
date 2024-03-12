export const filterDataByColumn = (
  filteredData,
  columnName,
  filterOptions,
  inputText
) => {
  switch (filterOptions) {
    case "1":
      return filteredData.filter(
        (item) => item[columnName].toLowerCase() === inputText.toLowerCase()
      );
    case "2":
      return filteredData.filter(
        (item) => item[columnName].toLowerCase() !== inputText.toLowerCase()
      );
    case "3":
      return filteredData.filter((item) =>
        item[columnName].toLowerCase().includes(inputText.toLowerCase())
      );
    case "4":
      return filteredData.filter(
        (item) =>
          !item[columnName].toLowerCase().includes(inputText.toLowerCase())
      );
    case "5":
      return filteredData.filter((item) => Object.keys(item).length > 0);
    default:
      return filteredData;
  }
};
