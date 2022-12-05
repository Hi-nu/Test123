import axios from "axios";
import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        setProducts(null);
        setLoading(true);

        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://3.38.149.102:3000/products/",
          {
            method: "GET",
          }
        );
        setProducts(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 align="center">로딩중..</h2>;
  if (error) return <h1 align="center">404</h1>;
  if (!products) return null;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} ({product.price})
          <img className="phoneImage" width={"300px"} src={product.descriptionImageUrl}/>
        </li>
      ))}
    </ul>
  );
}

export default Product;