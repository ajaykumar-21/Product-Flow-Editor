import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import ProductList from "./ProductList";

function FlowEditor() {
  const [nodes, setnodes] = useState([]);
  const [edges, setEdges] = useState([]);
  console.log(nodes, edges);

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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 border-r overflow-y-auto">
        <ProductList />
      </div>
      <div className="w-full md:w-2/3 p-4">
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
    </div>
  );
}

export default FlowEditor;
