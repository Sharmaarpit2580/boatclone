// src/pages/products/Product.jsx - ✅ CATEGORY FILTER FIXED VERSION
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.css';
import { useCart } from '../../components/cart/CartContext';
import { useSearch } from '../../components/search/SearchContext';
import { useFilter } from '../../components/filter/FilterContext';
import { useAuth } from '../../components/auth/AuthContext';
import FilterSidebar from '../../components/filtersidebar/FilterSidebar';
import ProductList, { productsData } from '../../components/productlist/ProductList';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer.jsx';

export default function Product() {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { searchQuery } = useSearch();
  const { activeFilter, selectedCategory } = useFilter(); // nav filters ke liye
  const { user } = useAuth();

  // 👉 Sidebar filters local state
  const [sidebarFilters, setSidebarFilters] = useState({
    sortBy: 'default',
    categories: [],
    priceRanges: [],
    tags: [],
    ratings: [],
  });

  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    // 🔥 DEBUG LOGS
    console.log('🔍 DEBUG - activeFilter:', activeFilter, 'sidebarFilters:', sidebarFilters);

    // 🔥 1) SEARCH FILTER PEHLE (highest priority)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.tag.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)
      );
    }

    // 🔥 2) SIDEBAR FILTERS PEHLE (PRIORITY HIGH) 👈 FIXED!
    if (sidebarFilters.categories.length > 0) {
      console.log('✅ Applying sidebar category filter:', sidebarFilters.categories);
      filtered = filtered.filter((product) =>
        sidebarFilters.categories.includes(product.category)
      );
    }

    if (sidebarFilters.tags.length > 0) {
      filtered = filtered.filter((product) =>
        sidebarFilters.tags.includes(product.tag)
      );
    }

    if (sidebarFilters.priceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price.replace(/[₹,]/g, ''));
        return sidebarFilters.priceRanges.some(
          (range) => price >= range.min && price <= range.max
        );
      });
    }

    if (sidebarFilters.ratings.length > 0) {
      filtered = filtered.filter((product) =>
        sidebarFilters.ratings.some((rating) => product.rating >= rating)
      );
    }

    // 🔥 3) NAVIGATION FILTERS BAAD ME (lower priority)
    if (activeFilter === 'category' && selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    } else if (activeFilter === 'offers') {
      filtered = filtered.filter(
        (product) =>
          product.tag === 'Hot' ||
          product.tag === 'Bestseller' ||
          parseFloat(product.price.replace(/[₹,]/g, '')) < 2000
      );
    } else if (activeFilter === 'new') {
      filtered = filtered.filter((product) => product.tag === 'New');
    } else if (activeFilter === 'bestseller') {
      filtered = filtered.filter((product) => product.tag === 'Bestseller');
    } else if (activeFilter === 'gaming') {
      filtered = filtered.filter((product) => product.tag === 'Gaming');
    } else if (activeFilter === 'premium') {
      filtered = filtered.filter((product) => product.tag === 'Premium');
    } else if (activeFilter === 'budget') {
      filtered = filtered.filter((product) => product.tag === 'Budget');
    }

    // 🔥 4) SORT LAST (sab filters ke baad)
    if (sidebarFilters.sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[₹,]/g, ''));
        const priceB = parseFloat(b.price.replace(/[₹,]/g, ''));
        return priceA - priceB;
      });
    } else if (sidebarFilters.sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[₹,]/g, ''));
        const priceB = parseFloat(b.price.replace(/[₹,]/g, ''));
        return priceB - priceA;
      });
    } else if (sidebarFilters.sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    console.log('📊 Final filtered products:', filtered.length);
    return filtered;
  }, [searchQuery, activeFilter, selectedCategory, sidebarFilters]);

  return (
    <>
      <Navbar />
      <section className={styles.page}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Shop the latest</p>
            <h1 className={styles.title}>Boat Products</h1>
            <p className={styles.sub}>
              {searchQuery
                ? `Found ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  } for "${searchQuery}"`
                : activeFilter === 'category' && selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} - ${
                    filteredProducts.length
                  } ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'offers'
                ? `Special Offers - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'new'
                ? `New Launches - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'bestseller'
                ? `Bestsellers - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'gaming'
                ? `Gaming Products - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'premium'
                ? `Premium Collection - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'budget'
                ? `Budget Friendly - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : activeFilter === 'explore'
                ? `Explore All Products - ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`
                : 'Curated picks with Boat-style vibes.'}
            </p>
          </div>
        </header>

        <div className={styles.content}>
          <FilterSidebar
            filters={sidebarFilters}
            onFilterChange={setSidebarFilters}
            onClearFilters={() =>
              setSidebarFilters({
                sortBy: 'default',
                categories: [],
                priceRanges: [],
                tags: [],
                ratings: [],
              })
            }
          />

          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>No products found</p>
              <p className={styles.noResultsSub}>
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <ProductList
              products={filteredProducts}
              addedItems={addedItems}
              isInCart={isInCart}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
