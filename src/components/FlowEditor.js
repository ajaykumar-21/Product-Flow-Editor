import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ProductList from "./ProductList";

function FlowEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  // console.log(nodes, edges);

  // Handles changes to nodes (like position updates, etc.)
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Handles changes to edges (like repositioning)
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  // Handles creation of new edges when nodes are connected
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#808080" },
          },
          eds
        )
      ),
    [setEdges]
  );

  // Handles click on an edge to remove it
  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation(); // Prevents click event from bubbling
      setEdges((eds) => eds.filter((e) => e.id !== edge.id)); // Removes the clicked edge
    },
    [setEdges]
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 border-r overflow-y-auto">
        <ProductList nodes={nodes} setNodes={setNodes} />
      </div>
      <div className="w-full md:w-2/3 p-4 ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="lines" gap={10} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowEditor;
