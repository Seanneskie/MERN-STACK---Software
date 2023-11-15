import React, { useState } from 'react';
import '../static/css/card.css';

function Card({ title, description, imageUrl, price, category, addToCart }) {
  const handleAddToCart = () => {
    // Call the addToCart function with the product details
    addToCart({ title, price });
  };

  return (
    <div className="card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>
        <p className="card-category">{category}</p>
        <div className='btn-container'>
          <button className='card-button' onClick={handleAddToCart}>Add to Cart</button>    
        </div>
      </div>
    </div>
  );
}

export default Card;
