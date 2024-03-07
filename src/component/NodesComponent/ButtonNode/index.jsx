import React from "react";
import { Handle, Position } from "reactflow";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ButtonNode = ({ data }) => {
  console.log("data: ", data);
  const nodeStyle = {
    background: "lightcyan",
    border: "1px solid grey",
    width: "auto",
    margin: "2px",
    position: "relative",
  };

  const buttonStyle = {
    width: "auto",
    height: "100%",
    padding: "0.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: -7,
          width: 10,
          height: 10,
        }}
      />
      <div style={nodeStyle} className="rounded-3">
        <Button
          variant="success"
          className="border-0 text-dark bg-white"
          style={buttonStyle}
        >
          {data?.label}
        </Button>
      </div>
    </>
  );
};
ButtonNode.propTypes = {
  data: PropTypes.func,
};
export default ButtonNode;
