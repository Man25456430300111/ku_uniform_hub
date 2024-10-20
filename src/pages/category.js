import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import ProductCard from './ProductCard';

const CategoryProducts = () => {
  const { categoryName } = useParams(); // ดึงชื่อประเภทจาก URL
  const [products, setProducts] = useState([]);

  /*useEffect(() => {
    // เรียกข้อมูลสินค้าตามประเภทจาก API
    axios.get(`http://localhost:5000/api/products?category=${categoryName}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [categoryName]);*/

  return (
    <div className="category-products">
      <h2>Products in category: {categoryName}</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            name={product.name} 
            price={product.price} 
            image={product.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
