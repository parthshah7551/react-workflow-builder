import React, { useState, useCallback } from "react";
import ReactFlow, { addEdge, MiniMap, Controls, Background } from "reactflow";

import "reactflow/dist/style.css";
import Navbarcomponent from "../Navbar/Navbarcomponent";
import AddWorkflowModal from "../Modals/AddWorkflowModal";
import { useSelector } from "react-redux";
import { useFlow } from "../../contextAPI/index.js";
import ButtonNode from "../NodesComponent/ButtonNode/ButtonNode.jsx";
import CustomNode from "../NodesComponent/CustomNode/CustomNode.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

const nodeTypes = {
  buttonNode: ButtonNode,
  customNode: CustomNode,
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

  const reduxStoreData = useSelector((state) => {
    if (state) return state;
  });

  console.log("reduxStoreData: ", reduxStoreData);

  let sortingOrderOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const onConnect = useCallback((params) => {
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

      let newNode = [];
      switch (type) {
        case "sorting":
          newNode.push({
            id: `${Date.now()}`,
            type: "customNode",
            position,
            data: {
              label: `sorting`,
              totalSelectionDropdowns: [
                {
                  "Column Name": JSON.parse(localStorage.getItem("columnName")),
                },
                { Order: sortingOrderOptions },
              ],
              selects: {
                column: "",
                order: "",
              },
            },
          });
          break;
        default:
          newNode.push({});
      }

      setNodes((prevNodes) => [...prevNodes, ...newNode]);
    },
    [reactFlowInstance]
  );

  const saveModal = () => {
    setIsOpenSaveModal(true);
  };

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  // const edgesWithUpdatedTypes = edges.map((edge) => {
  //   if (edge.sourceHandle) {
  //     const edgeType = nodes.find((node) => node.type === "custom").data
  //       .selects[edge.sourceHandle];
  //     edge.type = edgeType;
  //   }

  //   return edge;
  // });
  // console.log("edgesWithUpdatedTypes: ", edgesWithUpdatedTypes);

  return (
    <div>
      <Navbarcomponent saveModal={saveModal} />
      <AddWorkflowModal
        show={isOpenSaveModal}
        onHide={() => setIsOpenSaveModal(false)}
      />
      <div className="d-flex overviewFlow">
        <Sidebar />
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
        {/* <ReactTable /> */}
      </div>
    </div>
  );
};

export default OverviewFlow;
