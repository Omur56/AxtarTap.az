import React, { useEffect, useState } from "react";

const ProductList = ({ category }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setAllProducts(parsedProducts);
    }
  }, []);

  useEffect(() => {
    if (!category) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [category, allProducts]);

  if (filteredProducts.length === 0) {
    return <p className="text-center text-gray-500">Bu kateqoriyada məhsul tapılmadı.</p>;
  }

  return (
    <div className="mt-8 mb-8 bg-slate-100 ">
  
      <div className="px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-slate-100">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition w-[250px] bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-md mb-1">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {product.description.slice(0, 60)}...
            </p>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
