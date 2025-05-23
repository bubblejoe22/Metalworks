import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './oc.css';
import bronzeShield from './ocassets/bronze_shield.png';
import bronzeSword from './ocassets/bronze_sword.png';
import receiptImage from './ocassets/RCPT.png';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderData = state?.orderData || {
    items: [
      { name: 'Bronze Shield', price: 1200, quantity: 1 },
      { name: 'Bronze Sword', price: 1300, quantity: 1 }
    ],
    subtotal: 2500,
    shipping: 100,
    discountAmount: 100,
    total: 2500,
    orderNumber: '2023300851'
  };

  const [isCanceled, setIsCanceled] = useState(false);

  const handlePrintOrder = () => {
    const link = document.createElement('a');
    link.href = receiptImage;
    link.download = 'Metalworks_Receipt.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancelOrder = () => {
    setIsCanceled(true);
    setTimeout(() => setIsCanceled(false), 3000);
  };

  const handleTrackOrder = () => {
    navigate('/ordertrack', { 
      state: { 
        orderNumber: orderData.orderNumber,
        items: orderData.items,
        total: orderData.total
      }
    });
  };

  return (
    <div className="order-confirmation-container">
      
      <div className="confirmation-content">
        <h1 className="confirmation-title">Your order has been forged!</h1>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-number">
            <h3>Order No. {orderData.orderNumber}</h3>
            <p>We've sent a confirmation email with your order details.</p>
          </div>
        </div>
        
        <div className="order-details" id="order-receipt">
          <h2>Order Details</h2>
          
          <div className="shipping-info">
            <h3>Home Shipping</h3>
            <p><strong>Shipping To:</strong> CM Recto Ave. Lapasan, CDOC PH</p>
          </div>
          
          <div className="items-list">
            {orderData.items.map((item, index) => (
              <div className="item" key={index}>
                <div className="item-name">{item.name}</div>
                <img 
                  src={item.name.includes('Shield') ? bronzeShield : bronzeSword} 
                  alt={item.name} 
                  className="item-image" 
                />
                <div className="item-qty">Qty: {item.quantity}</div>
                <div className="item-price">Price: P {item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <h3>Order Total ({orderData.items.length} items):</h3>
            <div className="total-line">
              <span>Merchandise Subtotal</span>
              <span>P {orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>Shipping Subtotal</span>
              <span>P {orderData.shipping.toFixed(2)}</span>
            </div>
            <div className="total-line discount-line">
              <span>Promo Code Discount</span>
              <span>- P {orderData.discountAmount.toFixed(2)}</span>
            </div>
            <div className="total-line final-total">
              <span>Total Payment:</span>
              <span>P {orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="order-actions">
          <button className="action-btn print-btn" onClick={handlePrintOrder}>
            Print Order Details
          </button>
          <button className="action-btn track-btn" onClick={handleTrackOrder}>
            Track My Order
          </button>
          <button className="action-btn cancel-btn" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        </div>
      </div>
      
      {isCanceled && (
        <div className="cancel-notification">
          Your Order Has Been Canceled
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;