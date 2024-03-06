import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Papa from "papaparse";
import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import { counterReducer } from "../../redux/reducer";
// import { Button, Form } from "react-bootstrap";

const Navbarcomponent = ({ saveModal }) => {
  // const [csvFileName, setCSVFileName] = useState("");
  // const dispatch = useDispatch();
  // const data = useSelector((state) => {
  //   console.log("state: ", state);
  //   return state;
  // });
  const handleFileUpload = (event) => {
    try {
      const file = event?.target?.files[0]; // Check if event object and target property exist
      console.log("file: ", file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvData = event.target.result;
          Papa.parse(csvData, {
            complete: (result) => {
              console.log("Parsed CSV data:", result.data);
              // Handle parsed CSV data here
            },
            header: true, // Set to true if CSV file contains headers
          });
        };
        reader.readAsText(file);
      }
    } catch (error) {
      console.log("error: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <div className="navbarContainer d-flex justify-content-between">
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
          Dashboard
        </Button>
      </div>
      <div className="m-2 me-4">
        <Button variant="primary" className="me-2">
          + Create New
        </Button>
        <Button variant="success" onClick={() => saveModal()}>
          Save
        </Button>
      </div>
    </div>
  );
};
Navbarcomponent.propTypes = {
  saveModal: PropTypes.func,
};
export default Navbarcomponent;
