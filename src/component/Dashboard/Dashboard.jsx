import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFlow } from "../../contextAPI";
import "./dashboard.css";

const Dashboard = () => {
  const { setEdges, setNodes, setNewTableData } = useFlow();
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const getDashboardDetails = () => {
    const jsonDashboardDetails = localStorage.getItem("workFlowData");
    console.log("jsonDashboardDetails: ", jsonDashboardDetails);
    if (jsonDashboardDetails) {
      const parsedDashboardDetails = JSON.parse(jsonDashboardDetails);
      console.log("parsedDashboardDetails: ", parsedDashboardDetails);
      setDashboardDetails(Object.keys(parsedDashboardDetails));
    }
  };

  const handleCreateNew = () => {
    setEdges([]);
    setNodes([]);
    setNewTableData([]);
    localStorage.removeItem("workFlowData");
    localStorage.removeItem("initialFileData");
    localStorage.removeItem("workFlowDataName");
    localStorage.removeItem("columnName");
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <h4>Dashboard</h4>
        <Button
          variant="primary"
          className="m-2"
          onClick={() => handleCreateNew()}
        >
          <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
            + Create New
          </NavLink>
        </Button>
      </div>
      <ListGroup className="mt-4 ">
        {dashboardDetails.length > 0 ? (
          <>
            {dashboardDetails.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center listGroupBackground"
              >
                <span>{item}</span>
                <div>
                  <Button variant="primary" className="me-2">
                    Edit
                  </Button>{" "}
                  <Button variant="danger">Delete</Button>{" "}
                </div>
              </ListGroup.Item>
            ))}
          </>
        ) : (
          <ListGroup.Item className="listGroupBackground">
            <h3 className="m-4">No Data available</h3>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default Dashboard;
