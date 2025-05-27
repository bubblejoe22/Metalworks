import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './co.css';
import bronzeShield from './coassets/bronze_shield.png';
import bronzeSword from './coassets/bronze_sword.png';
import backgroundImage from './coassets/bg.png'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: 'Bronze Shield', 
      description: 'Boasting an antique finish, this bronze shield merges history and durability.',
      price: 1200.00, 
      quantity: 1,
      image: bronzeShield
    },
    { 
      id: 2, 
      name: 'Bronze Sword', 
      description: 'A sword with character and weight, the bronze blade offers a classic look.',
      price: 1300.00, 
      quantity: 1,
      image: bronzeSword
    }
  ]);
  
  const [message, setMessage] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const validPromoCode = '1111';
  const promoDiscount = 100;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const applyDiscount = () => {
    if (!discountCode) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (discountCode.trim() === validPromoCode) {
      setDiscountApplied(true);
      setDiscountAmount(promoDiscount);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setDiscountApplied(false);
      setDiscountAmount(0);
    }
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items,
      message,
      discountCode: discountApplied ? discountCode : null,
      discountAmount: discountApplied ? promoDiscount : 0,
      paymentMethod,
      subtotal,
      shipping,
      total
    };
    
    navigate('/orderconfirm', { state: { orderData } });
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 100.00;
  const total = subtotal + shipping - (discountApplied ? promoDiscount : 0);

  return (
    <div 
      className="checkout-page"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Inline style for background
    >
      <div className="background-effects">
        <div className="particles"></div>
        <div className="glow-effect"></div>
      </div>
      
      
      <main className="checkout-container">
        <h1>Checkout</h1>
        <p className="checkout-description">
          Review your order details, enter your delivery and payment info, and place your order to complete your purchase.
        </p>

        <div className="checkout-sections">
          <div className="order-items-section">
            {items.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="returner">Returner</p>
                    <p className="item-price">P {item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="message-section">
              <label>Message for Seller:</label>
              <textarea
                placeholder="Any special instructions for your order..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="promo-section">
              <div className="promo-input">
                <input 
                  type="text" 
                  placeholder="Enter promo code" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={discountApplied}
                />
                <button 
                  className="apply-btn"
                  onClick={applyDiscount}
                  disabled={discountApplied}
                >
                  {discountApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoError && <p className="promo-error">{promoError}</p>}
              {discountApplied && (
                <p className="promo-success">
                  Promo code applied! Discount: P {promoDiscount.toFixed(2)}
                </p>
              )}
            </div>

            <div className="total-section">
              <p>Total Order ({items.length} items):</p>
              <div className="payment-option">
                <span>Payment Option</span>
                <div className="payment-selector">
                  <span>{paymentMethod}</span>
                  <button 
                    className="payment-toggle"
                    onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  >
                    &gt;
                  </button>
                  {showPaymentOptions && (
                    <div className="payment-dropdown">
                      <button onClick={() => {
                        setPaymentMethod('Cash On Delivery');
                        setShowPaymentOptions(false);
                      }}>
                        Cash On Delivery
                      </button>
                      <button onClick={() => {
                        setPaymentMethod('GCash');
                        setShowPaymentOptions(false);
                      }}>
                        GCash
                      </button>
                      <button onClick={() => {
                        setPaymentMethod('Credit/Debit Card');
                        setShowPaymentOptions(false);
                      }}>
                        Credit/Debit Card
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary-section">
            <h2>Order Summary</h2>
            <table className="summary-table">
              <tbody>
                <tr>
                  <td>Merchandise Subtotal</td>
                  <td>P {subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping Subtotal</td>
                  <td>P {shipping.toFixed(2)}</td>
                </tr>
                {discountApplied && (
                  <tr>
                    <td>Discount Subtotal</td>
                    <td>- P {promoDiscount.toFixed(2)}</td>
                  </tr>
                )}
                <tr className="total-row">
                  <td><strong>Total Payment:</strong></td>
                  <td><strong>P {total.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};


export default CheckoutPage;