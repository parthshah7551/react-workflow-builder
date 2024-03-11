import React, { useState, useCallback, useEffect } from "react";
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
function sortByColumn(array, columnName, sortOrder = "asc") {
  console.log("array: ", array);
  console.log("columnName: ", columnName);
  console.log("sortOrder: ", sortOrder);
  return array.sort((a, b) => {
    let valueA = a[columnName];
    let valueB = b[columnName];

    // Handle string and numeric values
    if (typeof valueA === "string" && typeof valueB === "string") {
      // Convert names to lowercase for case-insensitive sorting
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (sortOrder === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else if (sortOrder === "desc") {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      throw new Error("Invalid sortOrder. Use 'asc' or 'desc'.");
    }
  });
}

const OverviewFlow = () => {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange } =
    useFlow();
  console.log("nodes123: ", nodes);
  console.log("edges: ", edges);
  // eslint-disable-next-line no-unused-vars
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [newOutputData, setUseNewOutputData] = useState([]);

  const reduxStoreData = useSelector((state) => {
    if (state) return state;
  });

  useEffect(() => {
    console.log("newOutputData: ", newOutputData);
  }, [newOutputData]);
  console.log("reduxStoreData: ", reduxStoreData);

  let sortingOrderOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const onConnect = useCallback(
    async (params) => {
      console.log("params++: ", nodes);
      console.log("params: ", params);

      let filteredData = [];

      await Promise.all(
        nodes?.map((nodeItem) => {
          if (nodeItem?.id === params?.source) {
            filteredData = [...nodeItem.data.currentOutputData];
          }
        })
      );

      let outputData = [];
      await Promise.all(
        nodes?.map(async (nodeItem) => {
          if (nodeItem?.id === params?.target) {
            if (
              nodeItem.data.label === "sort" &&
              !nodeItem.data.selects.column
            ) {
              outputData = [...filteredData];
            } else if (
              nodeItem.data.label === "sort" &&
              nodeItem.data.selects.column
            ) {
              console.log("filteredData: ", filteredData);
              const outputData = await sortByColumn(
                filteredData,
                nodeItem.data.selects.column,
                nodeItem.data.selects.order
              );
              console.log("Calling====>>>>>>>>>>>>>>>", outputData);
              nodeItem.data.currentOutputData = [...outputData];
              setUseNewOutputData(outputData);
            }
          }
        })
      );

      return setEdges((eds) => addEdge(params, eds));
    },
    [nodes]
  );

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
        case "sort":
          newNode.push({
            id: `${Date.now()}`,
            type: "customNode",
            position,
            data: {
              label: `sort`,
              totalSelectionDropdowns: [
                {
                  uniqueKey: "column",
                  label: "Column Name",
                  dropdownData: JSON.parse(localStorage.getItem("columnName")),
                },
                {
                  uniqueKey: "order",
                  label: "Order",
                  dropdownData: sortingOrderOptions,
                },
              ],
              currentOutputData: reduxStoreData.currentOutputData,
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
    [reactFlowInstance, reduxStoreData]
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
