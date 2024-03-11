import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFlow } from "../../contextAPI";
import "./dashboard.css";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { setEdges, setNodes, setNewTableData } = useFlow();
  const [dashboardDetails, setDashboardDetails] = useState({});
  console.log("dashboardDetails11: ", dashboardDetails);

  const getDashboardDetails = () => {
    const jsonDashboardDetails = localStorage.getItem("workFlowData");
    if (jsonDashboardDetails) {
      const parsedDashboardDetails = JSON.parse(jsonDashboardDetails);
      setDashboardDetails(parsedDashboardDetails);
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

  const handleDelete = (item, keyName) => {
    Swal.fire({
      title: `Do you want to delete this ${keyName} workflow?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        delete dashboardDetails[keyName];
        localStorage.setItem("workFlowData", JSON.stringify(dashboardDetails));
        await Swal.fire("Workflow deleted successfully!", "", "success");
        getDashboardDetails();
      }
    });
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
        {Object.keys(dashboardDetails).length > 0 ? (
          <>
            {Object.keys(dashboardDetails).map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center listGroupBackground"
              >
                <span>{item}</span>
                <div>
                  <Button variant="primary" className="me-2">
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(dashboardDetails[item], item)}
                  >
                    Delete
                  </Button>{" "}
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
