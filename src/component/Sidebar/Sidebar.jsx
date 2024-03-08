import React from "react";
import "./sidebar.css";
import { Button } from "react-bootstrap";
import { NODE_TYPES } from "../../constant";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="mainContainer">
      <div className="sidebarTopSection">
        <h1 className="selectNodeText">Node Options</h1>
      </div>
      <div>
        {Object.values(NODE_TYPES).map((nodeType) => (
          <div key={nodeType}>
            <Button
              className="dndnode sidebarNodeBtn"
              onDragStart={(event) => onDragStart(event, nodeType)}
              draggable
            >
              {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
            </Button>
            <hr className="sidebarHr" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
