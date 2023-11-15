import React from 'react'; // Import useRef from React
import '../static/css/modal.css';

const Modal = ({ children, isOpen }) => { // Pass closeCart as a prop


  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
