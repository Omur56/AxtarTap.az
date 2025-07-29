import React, { useEffect, useState } from "react";
import CategorySelector from "../../components/CategorySelector";
import ProductList from "../../components/ProductsList";
import Katalog from "../../pages/Katalog";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data)); // istəsən yadda saxla
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
   
    <div className="p-6 m-auto max-w-[1000px]">
       <Katalog className="m-auto justify-center items-center " />
      <CategorySelector onSelectCategory={setCategory} />
      <h1 className="text-2xl font-bold mb-4">Məhsullar</h1>
      <ProductList category={category} products={products} />


      
    </div>
  );
};

export default Home;
