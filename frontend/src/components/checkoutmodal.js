// ReceiptModal.js
import React from 'react';
import '../static/css/receipt.css'


const ReceiptModal = ({ isOpen, closeReceipt, cartItems, totalCost, delivery, address }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close"  onClick={() => closeReceipt()}>
          Close
        </button>
        <div className="receipt">
          <h2>Receipt</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='label-container'>
            <label> Total: $ </label>
            <p>{totalCost.toFixed(2)}</p>
          </div>
          <div className='label-container'>
            <label> Delivery: </label>
            <p> {delivery ? 'Yes' : 'No'}</p>
          </div>
          <div className='label-container'>
            <label> Address: </label>
            <p> {address}</p>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
