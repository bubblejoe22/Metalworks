import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import { productsData } from '../../data/productsData';

const ProductPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    types: {
      sword: false,
      shield: false,
      armor: false,
      dagger: false,
      helmet: false
    },
    materials: {
      steel: false,
      iron: false,
      bronze: false,
      titanium: false
    }
  });
      
  useEffect(() => {
    filterProducts();
  }, [filters]);

  const filterProducts = () => {
    const activeTypeFilters = Object.entries(filters.types).filter(([_, value]) => value).map(([key, _]) => key);
    const activeMaterialFilters = Object.entries(filters.materials).filter(([_, value]) => value).map(([key, _]) => key);
    
    if (activeTypeFilters.length === 0 && activeMaterialFilters.length === 0) {
      setProducts(productsData);
      return;
    }
    
    const filteredProducts = productsData.filter(product => {
      const typeMatch = activeTypeFilters.length === 0 || activeTypeFilters.includes(product.type);
      const materialMatch = activeMaterialFilters.length === 0 || activeMaterialFilters.includes(product.material);
      return typeMatch && materialMatch;
    });
    
    setProducts(filteredProducts);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value]
      }
    }));
  };

  const renderStarRating = (rating) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="pl-rating-container">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`pl-star ${i < roundedRating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <h1>Our Products</h1>
        
        <div className="products-content">
          <div className="filters-sidebar">
            <h3>Filters</h3>
            <div className="filter-section">
              <h4>ITEM TYPE</h4>
              <div className="filter-options">
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.types.sword}
                    onChange={() => handleFilterChange('types', 'sword')}
                  />
                  Swords
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.types.shield}
                    onChange={() => handleFilterChange('types', 'shield')}
                  />
                  Shields
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.types.armor}
                    onChange={() => handleFilterChange('types', 'armor')}
                  />
                  Armors
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.types.dagger}
                    onChange={() => handleFilterChange('types', 'dagger')}
                  />
                  Daggers
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.types.helmet}
                    onChange={() => handleFilterChange('types', 'helmet')}
                  />
                  Helmets
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h4>MATERIAL</h4>
              <div className="filter-options">
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.materials.steel}
                    onChange={() => handleFilterChange('materials', 'steel')}
                  />
                  Steel
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.materials.iron}
                    onChange={() => handleFilterChange('materials', 'iron')}
                  />
                  Iron
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.materials.bronze}
                    onChange={() => handleFilterChange('materials', 'bronze')}
                  />
                  Bronze
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={filters.materials.titanium}
                    onChange={() => handleFilterChange('materials', 'titanium')}
                  />
                  Titanium
                </label>
              </div>
            </div>
          </div>

          <div className="products-grid">
            {products.map(product => (
              <div className="pl-product-card" key={product.id}>
                <div className="pl-product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="pl-product-info">
                  <h4>{product.name}</h4>
                  <p className="pl-product-type">{product.type.toUpperCase()}</p>
                    <div className="pl-product-rating">
                    {renderStarRating(product.rating)}
                    <span className="pl-review-count">({Math.round(product.rating * 10)} reviews)</span>
                  </div>
                    <p className="pl-product-price">₱ {product.price.toLocaleString()}</p>
                </div>
                <Link to={`/productdetails/${product.id}`} className="view-details-button">
                  VIEW DETAILS
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;