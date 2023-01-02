import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductsAPI from "./ProductsAPI";
import Products from "./Products";

const FetchApi = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response);
    return setProducts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Products products={products} />
    </div>
  );
};

export default FetchApi;
