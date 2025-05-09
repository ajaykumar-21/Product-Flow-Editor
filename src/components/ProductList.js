import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ProductList({ nodes, setNodes }) {
  // console.log(nodes, setNodes);
  const [productsList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch product data on component mount
    const fetchData = async () => {
      try {
        const data = await axios.get("https://dummyjson.com/products");
        // console.log(data.data.products);
        setProductList(data.data.products);
      } catch (error) {
        console.log("Error while fetching products", error);
      }
    };
    fetchData();
  }, []);

  // This function creates a new node for the flow editor based on the selected product.
  const handleAddNode = (product) => {
    // console.log(product);
    const newNode = {
      id: uuidv4(),
      type: "default",
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: `${product.title} ($${product.price})` }, // Label shown on node
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6 m-10">
        {productsList &&
          productsList.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow bg-white"
              onClick={() => handleAddNode(product)}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
                className="h-40 w-full rounded-md mb-3"
              />
              <h3 className="text-lg font-bold text-center text-gray-800 mb-1 hover:text-gray-600 transition-colors duration-200">
                {product.title}
              </h3>
              <p className="text-md text-green-600 text-center font-semibold">
                ${product.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
