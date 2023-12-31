// Cart.js
import React from 'react';
import '../static/css/cart.css';

const Cart = ({ cartItems, removeFromCart, closeCart, checkout, delivery, setDelivery, address, setAddress }) => {
  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2>Your Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Count</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <label>
            Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Delivery: Yes or No
            <input type="checkbox" checked={delivery} onChange={() => setDelivery(!delivery)} />
          </label>
        </div>
        <button className='card-button' onClick={() => {
          checkout();
          closeCart();
        }}>Checkout</button>
        <button className='card-button' onClick={closeCart}>Close Cart</button>
      </div>
    </div>
  );
};

export default Cart;
