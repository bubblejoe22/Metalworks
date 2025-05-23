import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { productsData } from '../../data/productsData';
import { useCart } from '../../data/CartProvider';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rushOrder, setRushOrder] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { handleAddToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === parseInt(id));
      setProduct(foundProduct);

      if (foundProduct) {
        let related = productsData.filter(p => 
          p.material === foundProduct.material && 
          p.id !== foundProduct.id
        );

        const uniqueTypes = [];
        const typedRelated = [];
        
        related.forEach(product => {
          if (!uniqueTypes.includes(product.type)) {
            uniqueTypes.push(product.type);
            typedRelated.push(product);
          }
        });

        if (typedRelated.length >= 4) {
          related = typedRelated.slice(0, 4);
        } else {
          related = related.slice(0, 4);
        }

        setRelatedProducts(related);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
const navigate = useNavigate();
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleRushOrder = () => {
    setRushOrder(!rushOrder);
  };

  const addToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      description: product.description,
      rushOrder: rushOrder,
      totalPrice: product.price * quantity * (rushOrder ? 1.2 : 1)
    };

    handleAddToCart(cartItem);
    alert(`${quantity} ${product.name}(s) added to cart${rushOrder ? ' (Rush Order)' : ''}!`);
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="pd-star filled">★</span>);
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(<span key={i} className="pd-star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="pd-star">★</span>);
      }
    }

    return stars;
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout with this item!');
    navigate('/checkout');
  };

  if (!product) {
    return <div className="pd-loading">Loading product details...</div>;
  }

  return (
    <div className="pd-product-detail-page">
      <div className="pd-product-detail-container">
        <div className="pd-product-gallery">
          <div className="pd-main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="pd-thumbnail-gallery">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((related) => (
                <div key={related.id} className="pd-thumbnail">
                  <img src={related.image} alt={related.name} />
                </div>
              ))
            ) : (
              <div className="pd-no-thumbnails">
                <p>No related products available</p>
              </div>
            )}
          </div>
        </div>

        <div className="pd-product-info">
          <h1 className="pd-product-title">{product.name}</h1>

          <div className="pd-price-rating-container">
            <span className="pd-product-price">₱ {product.price.toLocaleString()}</span>
            <div className="pd-product-rating">
              {renderStarRating(product.rating)}
              <span className="pd-review-count">({Math.round(product.rating * 10)} reviews)</span>
            </div>
          </div>

          <p className="pd-product-number">Item #{product.id}</p>
          <p className="pd-crafted-by">Crafted by: {product.craftedBy}</p>

          <div className="pd-stock-info">
            <span className="pd-in-stock">● In Stock</span>
            <span className="pd-stock-quantity">({product.stock} available)</span>
          </div>

          <div className="pd-product-material">
            <h3>Material:</h3>
            <div className="pd-material-selector">
              <select defaultValue={product.material}>
                <option value="steel">Steel</option>
                <option value="iron">Iron</option>
                <option value="bronze">Bronze</option>
                <option value="titanium">Titanium</option>
              </select>
            </div>
          </div>

          <div className="pd-product-quantity">
            <h3>Quantity:</h3>
            <div className="pd-quantity-selector">
              <button className="pd-quantity-button" onClick={decrementQuantity}>-</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0 && value <= product.stock) {
                    setQuantity(value);
                  }
                }}
                min="1"
                max={product.stock}
              />
              <button className="pd-quantity-button" onClick={incrementQuantity}>+</button>
            </div>
          </div>

          <div className="pd-rush-order">
            <input 
              type="checkbox" 
              id="pd-rush-order-checkbox" 
              checked={rushOrder} 
              onChange={toggleRushOrder} 
            />
            <label htmlFor="pd-rush-order-checkbox">Rush Order (+20% fee)</label>
          </div>

          <div className="pd-action-buttons">
            <button className="pd-add-to-cart" onClick={addToCart}>ADD TO CART</button>
            <button className="pd-checkout" onClick={handleCheckout}>CHECKOUT</button>
          </div>
        </div>
      </div>

      <div className="pd-product-tabs">
        <div className="pd-tab-header">
          <div 
            className={`pd-tab ${activeTab === 'Description' ? 'pd-active' : ''}`} 
            onClick={() => setActiveTab('Description')}
          >
            Description
          </div>
          <div 
            className={`pd-tab ${activeTab === 'Specification' ? 'pd-active' : ''}`} 
            onClick={() => setActiveTab('Specification')}
          >
            Specification
          </div>
          <div 
            className={`pd-tab ${activeTab === 'Reviews' ? 'pd-active' : ''}`} 
            onClick={() => setActiveTab('Reviews')}
          >
            Reviews
          </div>
        </div>

        <div className="pd-tab-content">
          {activeTab === 'Description' && <p>{product.description}</p>}
          {activeTab === 'Specification' && (
            <div>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>Material:</strong> {product.material}</p>
              <p><strong>Weight:</strong> {product.type === 'sword' ? '2.5 kg' : 
                                         product.type === 'shield' ? '5.8 kg' :
                                         product.type === 'armor' ? '15.2 kg' :
                                         product.type === 'dagger' ? '1.2 kg' : '3.5 kg'}</p>
            </div>
          )}
          {activeTab === 'Reviews' && (
            <div>
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;