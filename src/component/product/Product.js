import React from 'react';
import './Product.css';

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.title} className="product-image" /> {/* اضافه کردن تصویر */}
      <h2 className="product-title">{product.title}</h2> {/* API uses 'title' */}
      <p className="product-price">{product.price.toFixed(2)}€</p>
      <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
