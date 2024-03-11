import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

const Dashboard = () => {
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
  useEffect(() => {
    getDashboardDetails();
  });
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <h4>Dashboard</h4>
        <Button variant="primary" className="mb-2 me-0">
          + Create New
        </Button>{" "}
      </div>
      <ListGroup className="mt-4">
        {dashboardDetails.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
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
      </ListGroup>
    </div>
  );
};

export default Dashboard;
