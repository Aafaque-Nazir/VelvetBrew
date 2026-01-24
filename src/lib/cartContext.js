"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('velvet_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('velvet_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, variant = null) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.variant?.id === variant?.id);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.variant?.id === variant?.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, variant }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (itemId, variantId) => {
    setCartItems(prev => prev.filter(item => !(item.id === itemId && item.variant?.id === variantId)));
  };

  const updateQuantity = (itemId, variantId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId && item.variant?.id === variantId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartOpen, setCartOpen, 
      cartItems, addToCart, removeFromCart, updateQuantity,
      cartTotal, cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
