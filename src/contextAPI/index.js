import React, { createContext, useContext, useRef } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import PropTypes from "prop-types";

export const FlowContext = createContext();
// let initialStartNode = [
//   {
//     id: "1",
//     sourcePosition: "right",
//     type: "input",
//     data: { label: "Start" },
//     position: { x: 0, y: 80 },

//     style: {
//       display: "flex",
//       alignItems: "center",
//       padding: "10px",
//       backgroundColor: "#ffffff",
//       boxShadow: " 0px 2px 4px rgba(0, 0, 0, 0.1)",
//       borderRadius: "8px",
//     },
//   },
// ];

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const setY = useRef(100);
  const handleNodeUpdate = (nodeId, newData) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };
  return (
    <FlowContext.Provider
      value={{
        nodes,
        setY,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        handleNodeUpdate,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
FlowProvider.propTypes = {
  children: PropTypes.func,
};
export const useFlow = () => {
  return useContext(FlowContext);
};
