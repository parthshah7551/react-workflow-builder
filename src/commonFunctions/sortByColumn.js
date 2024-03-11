export const sortByColumn = (array, columnName, sortOrder = "asc") => {
  return array.sort((a, b) => {
    let valueA = a[columnName];
    let valueB = b[columnName];

    // Handle string and numeric values
    if (typeof valueA === "string" && typeof valueB === "string") {
      // Convert names to lowercase for case-insensitive sorting
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (sortOrder === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else if (sortOrder === "desc") {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      throw new Error("Invalid sortOrder. Use 'asc' or 'desc'.");
    }
  });
};
