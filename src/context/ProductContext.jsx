import React, { createContext, useContext, useState } from 'react';
import { products as initialProducts } from '../data/mockData';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // Flatten the initial data structure into a single array
  // Flatten the initial data structure into a single array
  const flattenedProducts = initialProducts ? Object.values(initialProducts).flat() : [];
  const [products, setProducts] = useState(flattenedProducts);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.floor(10000 + Math.random() * 90000), // Simple ID generation
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Helper to get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
