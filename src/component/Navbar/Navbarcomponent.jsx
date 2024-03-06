import React, { useState } from "react";
import Select from "react-select";
import { CSV_OPTIONS } from "../../constant";
// import { useDispatch, useSelector } from "react-redux";
// import { counterReducer } from "../../redux/reducer";
// import { Button, Form } from "react-bootstrap";

const Navbarcomponent = () => {
  const [csvFileName, setCSVFileName] = useState("");
  // const dispatch = useDispatch();
  // const data = useSelector((state) => {
  //   console.log("state: ", state);
  //   return state;
  // });
  return (
    <div className="navbarContainer d-flex">
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
    </div>
  );
};

export default Navbarcomponent;
