import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const ReactTable = () => {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Product Price",
    },
  ];
  const csvFileDataFunction = () => {
    const csvfileData = localStorage.getItem("csvFileData");
    console.log("csvfileData: ", csvfileData);
  };
  useEffect(() => {
    csvFileDataFunction();
  }, []);

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {},
    onPageChange: (page, sizePerPage) => {},
  };

  return (
    <BootstrapTable
      keyField="id"
      data={[]}
      columns={columns}
      pagination={paginationFactory(options)}
    />
  );
};

export default ReactTable;
