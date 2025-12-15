import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../cart/CartContext';
import { useSearch } from '../search/SearchContext';
import { useFilter } from '../filter/FilterContext';
// import About  from '../../pages/about/About';
const categories = [
  { label: 'Earbuds', value: 'earbuds' },
  { label: 'Headphones', value: 'headphones' },
  { label: 'Smartwatch', value: 'smartwatch' },
  { label: 'Speaker', value: 'speaker' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const { updateSearch, clearSearch } = useSearch();
  const { setFilter, clearFilter, activeFilter } = useFilter();

  const handleLogout = () => {
    signOut();
    navigate('/signin', { replace: true });
  };
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'U';
  const cartCount = getCartCount();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    updateSearch(value);
    // Navigate to home if not already there when searching
    if (value && window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateSearch(searchValue);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleNavClick = (filterType, value = null) => {
    clearSearch();
    setFilter(filterType, value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    setCategoriesOpen(false);
    setMoreOpen(false);
  };

  const handleCategoryClick = (category) => { 
    clearSearch();
    setFilter('category', category);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    setCategoriesOpen(false);
    
  };

  // const handleAboutClick = () => {
  //   navigate('/about');
  // };

  return (
    <header className={styles.header}>
      {/* <div className={styles.topStrip}>
        <span>⚡ Up to 70% Off | Free shipping on select items</span>
        <a className={styles.cta} href="#shop">Shop Now</a>
      </div> */}

      <div className={styles.bar}>
        <div className={styles.brand}>
          <img
            className={styles.logo}
            src="https://righttorepairindia.gov.in/companylogo/1a8dc856f01e8e6cb227f49797375aef1677500854.png"
            alt="boAt"
          />
        </div>

        <nav className={styles.nav}>
          <div 
            className={`${styles.link} ${styles.dropdown} ${activeFilter === 'category' ? styles.active : ''}`}
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <span>Categories</span>
            {categoriesOpen && (
              <div className={styles.dropdownMenu}>
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    className={styles.dropdownItem}
                    onClick={() => handleCategoryClick(cat.value)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* this is about page link to the about page */}
          {/* <button className={styles.link} onClick={handleAboutClick}>About</button> */}
          
          <button 
            className={`${styles.link} ${activeFilter === 'offers' ? styles.active : ''}`}
            onClick={() => handleNavClick('offers')}
          >
            Offers
          </button>
          <button 
            className={`${styles.link} ${activeFilter === 'new' ? styles.active : ''}`}
            onClick={() => handleNavClick('new')}
          >
            New Launches
          </button>
          <button 
            className={`${styles.link} ${activeFilter === 'corporate' ? styles.active : ''}`}
            onClick={() => handleNavClick('corporate')}
          >
            Corporate
          </button>
          <div 
            className={`${styles.link} ${styles.dropdown} ${activeFilter === 'more' ? styles.active : ''}`}
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <span>More</span>
            {moreOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownItem} onClick={() => handleNavClick('bestseller')}>
                  Bestsellers
                </button>
                <button className={styles.dropdownItem} onClick={() => handleNavClick('gaming')}>
                  Gaming
                </button>
                <button className={styles.dropdownItem} onClick={() => handleNavClick('premium')}>
                  Premium
                </button>
                <button className={styles.dropdownItem} onClick={() => handleNavClick('budget')}>
                  Budget
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className={styles.actions}>
          <form className={styles.search} onSubmit={handleSearchSubmit}>
            <span className={styles.icon}>🔍</span>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search products, categories..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </form>
          {user ? (
            <div className={styles.userBlock}>
              <div className={styles.avatar} title={user.email} aria-label={user.name}>
                {initials}
              </div>
              <div className={styles.userMeta}>
                <span className={styles.userName}>{user.name}</span>
                <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/signin" className={styles.iconBtn} aria-label="Account">
              👤
            </Link>
          )}
          <button className={styles.iconBtn} aria-label="Wishlist">♡</button>
          <Link to="/cart" className={styles.cartBtn} aria-label="Cart">
            🛒
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
          <button
            className={styles.burger}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(o => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <button className={styles.mobileLink} onClick={() => { handleNavClick('explore'); setMobileOpen(false); }}>
          Explore
        </button>
        <button className={styles.mobileLink} onClick={() => { handleNavClick('offers'); setMobileOpen(false); }}>
          Offers
        </button>
        <button className={styles.mobileLink} onClick={() => { handleNavClick('new'); setMobileOpen(false); }}>
          New Launches
        </button>
        <button className={styles.mobileLink} onClick={() => { handleNavClick('corporate'); setMobileOpen(false); }}>
          Corporate
        </button>
        <div className={styles.mobileCategories}>
          <p className={styles.mobileCategoryTitle}>Categories:</p>
          {categories.map(cat => (
            <button
              key={cat.value}
              className={styles.mobileLink}
              onClick={() => { handleCategoryClick(cat.value); setMobileOpen(false); }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className={styles.mobileSearch}>
          <form onSubmit={handleSearchSubmit}>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search products, categories..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>
      
    </header>
  );
}