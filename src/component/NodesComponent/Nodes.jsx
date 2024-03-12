import React from "react";

const Nodes = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div>
      {["sort", "filter", "slice", "splice"].map((nodeType) => (
        <div
          key={nodeType}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, nodeType)}
          draggable
        >
          {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default Nodes;
