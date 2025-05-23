import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (newItem) => {
    setCartItems(prevItems => {
      // More comprehensive item comparison
      const existingItem = prevItems.find(item => 
        item.id === newItem.id && 
        item.rushOrder === newItem.rushOrder
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          (item.id === newItem.id && item.rushOrder === newItem.rushOrder)
            ? { 
                ...item, 
                quantity: item.quantity + (newItem.quantity || 1),
                // Preserve calculated total price if it exists
                totalPrice: newItem.totalPrice || item.totalPrice || item.price * (item.quantity + (newItem.quantity || 1))
              } 
            : item
        );
      } else {
        return [...prevItems, { 
          ...newItem, 
          quantity: newItem.quantity || 1,
          // Ensure image is included
          image: newItem.image || null,
          // Calculate total price if not provided
          totalPrice: newItem.totalPrice || newItem.price * (newItem.quantity || 1)
        }];
      }
    });
  };

  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => 
        item.id === id
          ? { 
              ...item, 
              quantity: Math.max(1, item.quantity + change),
              // Update total price when quantity changes
              totalPrice: item.price * Math.max(1, item.quantity + change) * (item.rushOrder ? 1.2 : 1)
            } 
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total, item) => total + (item.totalPrice || item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems,
        cartTotal,
        itemCount,
        handleAddToCart, 
        handleQuantityChange, 
        handleRemoveItem 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};