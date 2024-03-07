import React, { useState, useCallback } from "react";
import ReactFlow, { addEdge, MiniMap, Controls, Background } from "reactflow";

import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";
import Navbarcomponent from "../Navbar/Navbarcomponent";
import AddWorkflowModal from "../Modals/AddWorkflowModal";
import Nodes from "../NodesComponent/Nodes.jsx";
import { useSelector } from "react-redux";
import { useFlow } from "../../contextAPI/index.js";
import ButtonNode from "../NodesComponent/ButtonNode/index.jsx";

const nodeTypes = {
  custom: CustomNode,
  buttonNode: ButtonNode,
};

const minimapStyle = {
  height: 120,
};

const OverviewFlow = () => {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange } =
    useFlow();
  console.log("nodes: ", nodes);
  // eslint-disable-next-line no-unused-vars
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const storeData = useSelector((state) => {
    return state;
  });
  console.log("storeData: ", storeData);

  const onConnect = useCallback((params) => {
    console.log("params: ", params);
    return setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log("position: ", position);

      let newNode = [];
      // switch (type) {
      //     newNode.push(
      //       createNode("end-1", type, position, null, null, {
      //         data: { label: "End Conversation" },
      //       })
      //     );
      //     break;
      //   default:
      //     newNode.push({});
      // }
      newNode.push({
        id: `${Date.now()}`,
        data: {
          label: "Sorting",
        },
        sourcePosition: "right",
        type: "custom",
        position,
      });

      setNodes((prevNodes) => [...prevNodes, ...newNode]);
    },
    [reactFlowInstance]
  );

  const saveModal = () => {
    setIsOpenSaveModal(true);
  };

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });
  console.log("edgesWithUpdatedTypes: ", edgesWithUpdatedTypes);

  return (
    <div className="overviewFlow">
      <Navbarcomponent saveModal={saveModal} />
      <AddWorkflowModal
        show={isOpenSaveModal}
        onHide={() => setIsOpenSaveModal(false)}
      />
      <Nodes />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => setReactFlowInstance(instance)}
        onDrop={onDrop}
        connectionLineType="smoothstep"
        onDragOver={onDragOver}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
