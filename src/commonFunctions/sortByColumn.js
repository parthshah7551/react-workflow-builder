export const sortByColumn = (array, columnName, sortOrder) => {
  return array.sort((a, b) => {
    let valueA = a[columnName];
    let valueB = b[columnName];

    // Handle string and numeric values
    if (
      valueA &&
      valueB &&
      typeof valueA === "string" &&
      typeof valueB === "string"
    ) {
      // Convert names to lowercase for case-insensitive sorting
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (sortOrder === "desc") {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
  });
};
