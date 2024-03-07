import React, { memo } from "react";
import PropTypes from "prop-types";

import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";

const options = [
  {
    value: "smoothstep",
    label: "Smoothstep",
  },
  {
    value: "step",
    label: "Step",
  },
  {
    value: "default",
    label: "Bezier (default)",
  },
  {
    value: "straight",
    label: "Straight",
  },
];

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select className="nodrag" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  handleId: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
};

function CustomNode({ id, data }) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          right: -7,
          width: 10,
          height: 10,
        }}
      />
      <div className="custom-node__header">
        This is a <strong>custom node</strong>
      </div>
      {/* <div className="custom-node__body">
        {Object.keys(data.selects).map((handleId) => (
          <Select
            key={handleId}
            nodeId={id}
            value={data.selects[handleId]}
            handleId={handleId}
          />
        ))}
      </div> */}
    </>
  );
}

CustomNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    selects: PropTypes.object.isRequired,
  }).isRequired,
};

export default memo(CustomNode);
