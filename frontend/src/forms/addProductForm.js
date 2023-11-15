import React, { useState } from 'react';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const requestData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        description: formData.description,
      };
      
  
      const response = await fetch('/api/product', {
        method: 'POST',
        body: JSON.stringify(requestData), // Convert data to JSON
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });
  
      if (response.status === 201) {
        // Handle a successful response, e.g., redirect or display a success message
        console.log('Product created successfully!');
        window.location.reload();
      } else {
        // Handle errors, e.g., display an error message
        console.error('Failed to create the product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  
  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Product Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
      
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
