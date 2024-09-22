import React from 'react';
import CartItem from '../cartItem/CartItem';
import './ShoppingCart.css';

const ShoppingCart = ({ cart, onRemove, onUpdateQuantity }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="shopping-cart">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <CartItem 
              key={item.product.id}
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
          <h2 className="total-price">Total Price: {getTotalPrice()}€</h2>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;