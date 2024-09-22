import React, { useState, useEffect } from 'react';
import Product from '../product/Product';
import ShoppingCart from '../shoppingCart/ShoppingCart';
import './Home.css';

function Home() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Load products from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate parsedCart
        if (Array.isArray(parsedCart)) {
          const isValid = parsedCart.every(item =>
            item &&
            item.product &&
            typeof item.product.id === 'number' &&
            typeof item.product.title === 'string' && // API uses 'title' for product name
            typeof item.product.price === 'number' &&
            typeof item.quantity === 'number'
          );

          if (isValid) {
            setCart(cart => [
              ...cart,
              ...parsedCart
            ]);

          } else {
            console.warn("Parsed cart data is not valid.");
            setCart([]);
          }
        } else {
          console.warn("Parsed cart data is not an array.");
          setCart([]);
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        setCart([]);
      }
    } else {
      console.log("No saved cart data found.");
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", cart); // Log cart data before saving
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart(cart => {
      const existingItem = cart.find(item => item.product.id === product.id);
      if (existingItem) {
        return cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cart, { product, quantity: 1 }];
    });
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setCart(cart => cart.filter(item => item.product.id !== productId));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCart(cart =>
      cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="container">
            <ShoppingCart cart={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />

      <h1>Shopping Cart Demo</h1>
      <div className="product-list">
        {products.map(product => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
