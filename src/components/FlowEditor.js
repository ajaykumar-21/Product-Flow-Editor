import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
} from "reactflow";

function FlowEditor() {
  return (
    <div className="w-full h-full border rounded shadow">
      <ReactFlow>
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
