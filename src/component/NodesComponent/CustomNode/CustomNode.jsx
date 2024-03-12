import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import PropTypes from "prop-types";
import "./customNode.css";
import { useFlow } from "../../../contextAPI";
import { sortByColumn } from "../../../commonFunctions/sortByColumn";
import { FILTER, SORT } from "../../../constant";
import { filterDataByColumn } from "../../../commonFunctions/filterDataByColumn";

function SelectComponent({ selectionDropDownData, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const onChange = (evt, uniqueKey) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [uniqueKey]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <>
        <div>{selectionDropDownData.label}</div>
        <select
          className="nodrag"
          onChange={(e) => onChange(e, selectionDropDownData.uniqueKey)}
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {selectionDropDownData?.dropdownData ? (
            selectionDropDownData.dropdownData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option key={"choose_csv"} value={"choose_csv"} disabled>
              Select CSV file first{" "}
            </option>
          )}
        </select>
      </>
    </div>
  );
}

const SortingNode = ({ id, data }) => {
  const { nodes, setNewTableData } = useFlow();
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const runButtonClick = async (nodeId) => {
    let filteredData = [];

    await Promise.all(
      nodes?.map((nodeItem) => {
        if (nodeItem?.id === nodeId) {
          filteredData = [...nodeItem.data.originalNodeData];
        }
      })
    );

    await Promise.all(
      nodes?.map(async (nodeItem) => {
        if (nodeItem?.id === nodeId) {
          const { column, filterOptions, inputText, order } =
            nodeItem.data.selects;
          if (nodeItem?.data?.label === SORT && column) {
            const sortByColumnOutputData = await sortByColumn(
              filteredData,
              column,
              order
            );
            nodeItem.data.currentOutputData = [...sortByColumnOutputData];
            setNewTableData(sortByColumnOutputData);
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
            setNewTableData(filterDataByColumnOutputData);
          } else {
            setNewTableData([...filteredData]);
          }
        }
      })
    );
  };

  const onInputChange = (evt, uniqueKey, nodeId) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [uniqueKey]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <>
      <div className="custom-node__header">{data.nodeLabel}</div>
      <div className="custom-node__body">
        {data.totalSelectionDropdowns.map((item) => (
          <SelectComponent
            key={item}
            nodeId={id}
            totalData={data}
            selectionDropDownData={item}
          />
        ))}
        {data?.selects?.filterOptions !== "5" &&
          data?.totalInputFields?.map((inputItem) => (
            <>
              <div>{inputItem.label}</div>
              <input
                type="text"
                onChange={(e) => {
                  onInputChange(e, inputItem?.uniqueKey, id);
                }}
              ></input>
            </>
          ))}
        {console.log("data: ", data)}
      </div>
      <Handle type="target" position={Position.Left} id={`left-${id}`} />
      <Handle type="source" position={Position.Right} id={`right-${id}`} />
      <div
        className="custom-node_footer"
        onClick={() => {
          runButtonClick(id);
        }}
      >
        Run
      </div>
    </>
  );
};
SortingNode.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
};
SelectComponent.propTypes = {
  value: PropTypes.string,
  sortBy: PropTypes.string,
  nodeId: PropTypes.string,
  selectionDropDownData: PropTypes.object,
  totalData: PropTypes.object,
};
export default memo(SortingNode);
