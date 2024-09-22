import React from 'react';
import './CartItem.css';

const CartItem = (props) => {
  const { item, onRemove, onUpdateQuantity } = props;

  return (
    <div className="cart-item">
      <h3 className="cart-item-title">{item.product.title}</h3> {/* استفاده از 'title' به جای 'name' */}
      <p className="cart-item-price">{(item.product.price * item.quantity).toFixed(2)}€</p>
      <input
        className="cart-item-quantity"
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value))}
      />
      <button className="remove-button" onClick={() => onRemove(item.product.id)}>Remove</button>
    </div>
  );
};

export default CartItem;
