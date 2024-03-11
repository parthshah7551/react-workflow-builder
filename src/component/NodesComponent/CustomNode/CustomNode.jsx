import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import PropTypes from "prop-types";
import "./customNode.css";
// import { useSelector } from "react-redux";

function SelectComponent({ selectionDropDownData, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const onChange = (evt, uniqueKey) => {
    const { nodeInternals } = store.getState();
    console.log("evt.target.value: ", evt.target.value);
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
      {console.log("selectionDropDownData: ", selectionDropDownData)}
      <>
        <div>{selectionDropDownData.label}</div>
        <select
          className="nodrag"
          onChange={(e) => onChange(e, selectionDropDownData.uniqueKey)}
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {selectionDropDownData.dropdownData.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    </div>
  );
}

const SortingNode = ({ id, data }) => {
  console.log("data11122: ", data);
  return (
    <>
      <div className="custom-node__header">
        This is a <strong>sorting node</strong>
      </div>
      <div className="custom-node__body">
        {console.log("data: ", data)}
        {data.totalSelectionDropdowns.map((item) => (
          <SelectComponent
            key={item}
            nodeId={id}
            selectionDropDownData={item}
          />
        ))}
      </div>
      <Handle type="target" position={Position.Left} id={`left-${id}`} />
      <Handle type="source" position={Position.Right} id={`right-${id}`} />
      <div className="custom-node_footer">Run</div>
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
};
export default memo(SortingNode);
