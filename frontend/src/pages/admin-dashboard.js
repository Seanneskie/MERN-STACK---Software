import React, { useState } from 'react';
import '../static/css/dashboard.css';
import ProductList from '../components/productView';

function AdminPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageNameChange = (e) => {
    const name = e.target.value;
    setImageName(name);
  };

  const handleAddProduct = async () => {
    try {
      // Send product data to the server
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log('Product added successfully');
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }

    // Clear the form after adding the product
    setProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
    });
  };

  const handleUploadImage = async () => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', imageName);

      // Send the image data to the server
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    // Clear the image and name after uploading
    setImage(null);
    setImageName('');
  };

  return (
    <div>
    <header className="admin-header">
        <h1>Admin Dashboard</h1>
    </header>

    <div className='container'>
        <div className='form-container'>
            <h2>Add Product</h2>
            <form>
                <label>
                Name:
                <input type='text' name='name' value={product.name} onChange={handleProductChange} />
                </label>
                <label>
                Description:
                <textarea name='description' value={product.description} onChange={handleProductChange} />
                </label>
                <label>
                Price:
                <input type='number' name='price' value={product.price} onChange={handleProductChange} />
                </label>
                <label>
                Category:
                <input type='text' name='category' value={product.category} onChange={handleProductChange} />
                </label>
                <button type='button' onClick={handleAddProduct}>
                Add Product
                </button>
            </form>
        </div>

        <div className='form-container'>
            <h2>Upload Image</h2>
            <form>
                <label>
                Name:
                <input type='text' value={imageName} onChange={handleImageNameChange} />
                </label>
                <label>
                Image:
                <input type='file' accept='image/*' onChange={handleImageChange} />
                </label>
                <button type='button' onClick={handleUploadImage}>
                Upload Image
                </button>
            </form>
            </div>

            <ProductList />
        </div>
    </div>
  );
}

export default AdminPage;
