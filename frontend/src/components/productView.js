import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProductData, setEditedProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch products from the API endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the products list after successful deletion
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        console.log('Product deleted successfully!');
      } else {
        console.error('Failed to delete the product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (productId) => {
    // Set the product ID being edited and populate the form with its data
    const productToEdit = products.find((product) => product.id === productId);
    setEditProductId(productId);
    setEditedProductData(productToEdit);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    // Cancel the edit mode and reset the form
    setEditProductId(null);
    setEditedProductData({
      name: '',
      price: '',
      category: '',
      description: '',
    });
    setIsModalOpen(false);
  };

  const handleUpdate = async (productId) => {
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(editedProductData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the products list after successful update
        const updatedProducts = products.map((product) =>
          product.id === productId ? { ...product, ...editedProductData } : product
        );
        setProducts(updatedProducts);
        // Reset the edit mode and form data
        setEditProductId(null);
        setEditedProductData({
          name: '',
          price: '',
          category: '',
          description: '',
        });
        setIsModalOpen(false);
        console.log('Product updated successfully!');
      } else {
        console.error('Failed to update the product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProductData({ ...editedProductData, [name]: value });
  };

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => handleEdit(product.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <input
              type="text"
              name="name"
              value={editedProductData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={editedProductData.price}
              onChange={handleChange}
              placeholder="Price"
            />
            <input
              type="text"
              name="category"
              value={editedProductData.category}
              onChange={handleChange}
              placeholder="Product Category"
            />
            <textarea
              name="description"
              value={editedProductData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <button onClick={() => handleUpdate(editProductId)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
