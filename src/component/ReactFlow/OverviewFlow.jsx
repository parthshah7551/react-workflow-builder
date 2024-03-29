/* eslint-disable react-hooks/exhaustive-deps */
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
import ReactTable from "../ReactTable/ReactTable.jsx";
import { sortByColumn } from "../../commonFunctions/sortByColumn.js";
import { FILTER, FILTER_OPTIONS, SORT } from "../../constant.js";
import { filterDataByColumn } from "../../commonFunctions/filterDataByColumn.js";

const nodeTypes = {
  buttonNode: ButtonNode,
  customNode: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const OverviewFlow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    setNewTableData,
    newTableData,
  } = useFlow();
  let workFlowDataName = "";
  const jsonWorkFlowName = localStorage.getItem("workFlowDataName");
  if (jsonWorkFlowName) {
    workFlowDataName = JSON.parse(jsonWorkFlowName);
  }

  // eslint-disable-next-line no-unused-vars
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const reduxStoreData = useSelector((state) => {
    if (state) return state;
  });

  const overViewFlowFunction = () => {
    try {
      const data = localStorage.getItem("workFlowDataName");
      if (data) {
        const parsedData = JSON.parse(data);
        const workFlowData = localStorage.getItem("workFlowData");
        const parsedWorkFlowData = JSON.parse(workFlowData);
        const reactFlowData = parsedWorkFlowData[parsedData];
        setEdges(reactFlowData.edges);
        setNodes(reactFlowData.nodes);
        setNewTableData(reactFlowData.newTableData);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    overViewFlowFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let sortingOrderOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const onConnect = useCallback(
    async (params) => {
      let filteredData = [];

      await Promise.all(
        // eslint-disable-next-line array-callback-return
        nodes?.map((nodeItem) => {
          if (nodeItem?.id === params?.source) {
            filteredData = [...nodeItem.data.originalNodeData];
          }
        })
      );

      await Promise.all(
        nodes?.map(async (nodeItem) => {
          if (nodeItem?.id === params?.target) {
            const { column, filterOptions, inputText, order } =
              nodeItem.data.selects;
            if (nodeItem.data.label === SORT && column) {
              const outputData = await sortByColumn(
                filteredData,
                column,
                order
              );
              nodeItem.data.currentOutputData = [...outputData];
              setNewTableData(outputData);
            } else if (
              nodeItem?.data?.label === FILTER &&
              column &&
              filterOptions &&
              inputText
            ) {
              const filterDataByColumnOutputData = await filterDataByColumn(
                filteredData,
                column,
                filterOptions,
                inputText
              );
              setNewTableData(filterDataByColumnOutputData ?? []);
            } else {
              setNewTableData([...filteredData]);
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
              nodeLabel: `This is a Sorting Node`,
              totalSelectionDropdowns: [
                {
                  uniqueKey: "column",
                  label: "Column Name",
                  dropdownData:
                    localStorage.getItem("columnName") &&
                    JSON.parse(localStorage.getItem("columnName")),
                },
                {
                  uniqueKey: "order",
                  label: "Order",
                  dropdownData: sortingOrderOptions,
                },
              ],
              currentOutputData: reduxStoreData.currentOutputData,
              originalNodeData: reduxStoreData.currentOutputData,
              selects: {
                column: "",
                order: "",
              },
            },
          });
          break;
        case "filter":
          newNode.push({
            id: `${Date.now()}`,
            type: "customNode",
            position,
            data: {
              label: `filter`,
              nodeLabel: `This is a Filter Node`,
              totalSelectionDropdowns: [
                {
                  uniqueKey: "column",
                  label: "Column Name",
                  dropdownData:
                    localStorage.getItem("columnName") &&
                    JSON.parse(localStorage.getItem("columnName")),
                },
                {
                  uniqueKey: "filterOptions",
                  label: "Filter Options",
                  dropdownData: FILTER_OPTIONS,
                },
              ],
              totalInputFields: [
                {
                  uniqueKey: "inputText",
                  label: "Input Text",
                },
              ],
              currentOutputData: reduxStoreData.currentOutputData,
              originalNodeData: reduxStoreData.currentOutputData,
              selects: {
                column: "",
                filter: "",
                inputText: "",
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
  return (
    <div>
      <Navbarcomponent
        saveModal={saveModal}
        workFlowDataName={workFlowDataName}
      />
      <AddWorkflowModal
        show={isOpenSaveModal}
        onHide={() => setIsOpenSaveModal(false)}
        workFlowDataName={workFlowDataName}
      />
      <div className="d-flex tableHeight">
        <Sidebar />
        <div className="d-flex flex-column tableHeight">
          <div className="overviewFlow">
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
          <ReactTable newTableData={newTableData} />
        </div>
      </div>
    </div>
  );
};

export default OverviewFlow;
