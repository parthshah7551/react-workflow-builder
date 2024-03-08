import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import PropTypes from "prop-types";
import "./customNode.css";
// import { useSelector } from "react-redux";

function SelectComponent({ selectionDropdownData, sortBy, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  // const reduxStoreData = useSelector((state) => {
  //   if (state) return state;
  // });
  // let selectOptions = reduxStoreData.csvFileKeys.map((item) => ({
  //   label: item,
  //   value: item,
  // }));

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [sortBy.toLowerCase()]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      {Object.keys(selectionDropdownData).map((selectionItem) => (
        <>
          <div>{selectionItem}</div>
          <select className="nodrag" onChange={onChange}>
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            {selectionDropdownData[selectionItem].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      ))}

      <Handle type="source" position={Position.Right} id={sortBy} />
    </div>
  );
}

const SortingNode = ({ id, data }) => {
  return (
    <>
      <div className="custom-node__header">
        This is a <strong>sorting node</strong>
      </div>
      <div className="custom-node__body">
        {data.totalSelectionDropdowns.map((item) => (
          <SelectComponent
            key={item}
            nodeId={id}
            selectionDropdownData={item}
          />
        ))}
      </div>
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
  selectionDropdownData: PropTypes.object,
};
export default memo(SortingNode);
