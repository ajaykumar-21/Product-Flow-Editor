import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

function FlowEditor() {
  const [nodes, setnodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => {
      setnodes((nds) => applyNodeChanges(changes, nds));
    },
    [setnodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  return (
    <div className="w-full h-full border rounded shadow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
