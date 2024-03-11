import React, { createContext, useContext, useRef, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import PropTypes from "prop-types";

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [newTableData, setNewTableData] = useState([]);
  console.log("nodes++: ", nodes);
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
        newTableData,
        setNewTableData,
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
