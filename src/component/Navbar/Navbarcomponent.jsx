import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Papa from "papaparse";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { counterReducer } from "../../redux/reducer";
// import { Button, Form } from "react-bootstrap";
import {
  initialFileData,
  selectedFileName,
  csvFileKeys,
  currentOutputData,
} from "../../redux/reducer.js";
import { useFlow } from "../../contextAPI/index.js";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";

const Navbarcomponent = ({ saveModal, workFlowDataName }) => {
  const dispatch = useDispatch();
  const { setNodes, setEdges, setNewTableData, newTableData } = useFlow();
  const storeDataInNavbar = useSelector((state) => {
    return state;
  });
  console.log("storeDataInNavbar: ", storeDataInNavbar);
  const handleFileUpload = (event) => {
    try {
      const file = event?.target?.files[0]; // Check if event object and target property exist
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvFileData = event.target.result;
          Papa.parse(csvFileData, {
            complete: (result) => {
              dispatch(initialFileData(result.data));
              dispatch(selectedFileName(file.name));
              dispatch(currentOutputData(result.data));
              const arrayOfKeys = result?.data?.reduce((keys, obj) => {
                Object.keys(obj).forEach((key) => {
                  if (!keys.includes(key)) {
                    keys.push(key);
                  }
                });
                return keys;
              }, []);
              const columnNames = arrayOfKeys.map((item) => ({
                label: item,
                value: item,
              }));
              dispatch(csvFileKeys(arrayOfKeys));
              localStorage.setItem("columnName", JSON.stringify(columnNames));
              localStorage.setItem(
                "initialFileData",
                JSON.stringify(result?.data)
              );

              setNodes((prevNodes) => [
                ...prevNodes,
                {
                  id: `${Date.now()}`,
                  data: {
                    label: "file",
                    csvFileData: result.data,
                    currentOutputData: result.data,
                    originalNodeData: result.data,
                  },
                  type: "buttonNode",
                  position: { x: 0, y: 100 },
                },
              ]);
            },
            header: true, // Set to true if CSV file contains headers
          });
        };
        reader.readAsText(file);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleCreateNew = () => {
    setEdges([]);
    setNodes([]);
    setNewTableData([]);
    localStorage.removeItem("initialFileData");
    localStorage.removeItem("workFlowDataName");
    localStorage.removeItem("columnName");
  };
  // const handleExportButton = () => {};
  return (
    <div className="navbarContainer d-flex justify-content-between p-2">
      <div className="d-flex">
        <Button variant="secondary" className="m-2">
          <label htmlFor="fileSelect" style={{ margin: 0 }}>
            Select CSV File
          </label>
          <input
            type="file"
            id="fileSelect"
            style={{ display: "none" }}
            accept=".csv"
            onChange={(e) => handleFileUpload(e)}
          />
        </Button>
        <Button variant="primary" className="m-2">
          <NavLink
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Dashboard
          </NavLink>
        </Button>
      </div>
      <div className="m-2 d-flex align-items-center">
        <h5>{workFlowDataName && `Workflow Name : ${workFlowDataName}`}</h5>
      </div>
      <div className="m-2 me-4">
        <Button
          variant="primary"
          className="me-2"
          onClick={() => {
            handleCreateNew();
          }}
        >
          + Create New
        </Button>
        {newTableData.length > 0 && (
          <Button variant="primary" className="me-2">
            <CSVLink
              filename="my-file.csv"
              data={newTableData}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
        <Button variant="success" onClick={() => saveModal()}>
          Save
        </Button>
      </div>
    </div>
  );
};
Navbarcomponent.propTypes = {
  saveModal: PropTypes.func,
  workFlowDataName: PropTypes.string,
};
export default Navbarcomponent;
