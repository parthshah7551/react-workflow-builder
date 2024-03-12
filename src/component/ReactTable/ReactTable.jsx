import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";
import { useFlow } from "../../contextAPI";

const ReactTable = () => {
  const { newTableData } = useFlow();
  const columnsValue = [];
  newTableData?.reduce((keys, obj) => {
    Object.keys(obj)?.forEach((key) => {
      if (!keys.includes(key)) {
        keys?.push(key);
        columnsValue.push({ dataField: key, text: key });
      }
    });
    return keys;
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
