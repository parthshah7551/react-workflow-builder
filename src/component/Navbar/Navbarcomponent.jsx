import React, { useState } from "react";
import Select from "react-select";
import { CSV_OPTIONS } from "../../constant";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";
// import { counterReducer } from "../../redux/reducer";
// import { Button, Form } from "react-bootstrap";

const Navbarcomponent = ({ saveModal }) => {
  const [csvFileName, setCSVFileName] = useState("");
  // const dispatch = useDispatch();
  // const data = useSelector((state) => {
  //   console.log("state: ", state);
  //   return state;
  // });
  return (
    <div className="navbarContainer d-flex justify-content-between">
      <div className="d-flex">
        <Select
          className="m-2"
          name="otherLoanDetails"
          id="otherLoanDetails"
          value={csvFileName}
          onChange={(selectedotherLoanDetailsOption) => {
            setCSVFileName(selectedotherLoanDetailsOption);
          }}
          placeholder="Select CSV"
          options={CSV_OPTIONS}
          isSearchable
          isClearable
        />
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
