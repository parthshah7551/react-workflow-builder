import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";

const ReactTable = ({ newTableData }) => {
  const columnsValue = [];
  const arrayOfKeys = newTableData?.reduce((keys, obj) => {
    Object.keys(obj)?.forEach((key) => {
      if (!keys.includes(key)) {
        keys?.push(key);
        columnsValue.push({ dataField: key, text: key });
      }
    });
    return keys;
  }, []);
  console.log("arrayOfKeys: ", arrayOfKeys);
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
    columnsValue.length > 0 && (
      <BootstrapTable
        keyField="id"
        data={newTableData}
        columns={columnsValue}
        pagination={paginationFactory(options)}
      />
    )
  );
};
ReactTable.propTypes = {
  newTableData: PropTypes.func,
};
export default ReactTable;
