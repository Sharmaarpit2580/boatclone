// src/components/filtersidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import styles from './FilterSidebar.module.css';

const categories = [
  { label: 'Earbuds', value: 'earbuds' },
  { label: 'Headphones', value: 'headphones' },
  { label: 'Smartwatch', value: 'smartwatch' },
  { label: 'Speaker', value: 'speaker' },
];

const tags = [
  { label: 'Bestseller', value: 'Bestseller' },
  { label: 'New', value: 'New' },
  { label: 'Hot', value: 'Hot' },
  { label: 'Gaming', value: 'Gaming' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Budget', value: 'Budget' },
];

const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 - ₹3,000', min: 2000, max: 3000 },
  { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: Infinity },
];

// optional future use
const ratings = [4.5, 4.0, 3.5, 3.0];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // helpers
  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleTagToggle = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    onFilterChange({ ...filters, tags: newTags });
  };

  const handlePriceRangeToggle = (range) => {
    const exists = filters.priceRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );

    const newRanges = exists
      ? filters.priceRanges.filter(
          (r) => !(r.min === range.min && r.max === range.max)
        )
      : [...filters.priceRanges, range];

    onFilterChange({ ...filters, priceRanges: newRanges });
  };

  const handleRatingToggle = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];

    onFilterChange({ ...filters, ratings: newRatings });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({ ...filters, sortBy });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.ratings.length > 0;

  const activeCount =
    filters.categories.length +
    filters.tags.length +
    filters.priceRanges.length +
    filters.ratings.length;

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle filters"
      >
        🔍 Filters
        {hasActiveFilters && (
          <span className={styles.filterBadge}>{activeCount}</span>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Product filters"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          {hasActiveFilters && (
            <button
              className={styles.clearBtn}
              onClick={onClearFilters}
              type="button"
            >
              Clear All
            </button>
          )}
        </div>

        <div className={styles.content}>
          {/* Sort By */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Sort By</h3>
            <div className={styles.sortOptions}>
              <button
                type="button"
                className={`${styles.sortBtn} ${
                  filters.sortBy === 'default' ? styles.active : ''
                }`}
                onClick={() => handleSortChange('default')}
              >
                Default
              </button>
              <button
                type="button"
                className={`${styles.sortBtn} ${
                  filters.sortBy === 'price-low' ? styles.active : ''
                }`}
                onClick={() => handleSortChange('price-low')}
              >
                Price: Low to High
              </button>
              <button
                type="button"
                className={`${styles.sortBtn} ${
                  filters.sortBy === 'price-high' ? styles.active : ''
                }`}
                onClick={() => handleSortChange('price-high')}
              >
                Price: High to Low
              </button>
              <button
                type="button"
                className={`${styles.sortBtn} ${
                  filters.sortBy === 'rating' ? styles.active : ''
                }`}
                onClick={() => handleSortChange('rating')}
              >
                Highest Rated
              </button>
            </div>
          </div>

          {/* Category */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Category</h3>
            <div className={styles.options}>
              {categories.map((cat) => (
                <label key={cat.value} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.value)}
                    onChange={() => handleCategoryToggle(cat.value)}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Price Range</h3>
            <div className={styles.options}>
              {priceRanges.map((range) => (
                <label key={range.label} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={filters.priceRanges.some(
                      (r) => r.min === range.min && r.max === range.max
                    )}
                    onChange={() => handlePriceRangeToggle(range)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Rating</h3>
            <div className={styles.options}>
              {ratings.map((rating) => (
                <label key={rating} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating)}
                    onChange={() => handleRatingToggle(rating)}
                  />
                  <span>⭐ {rating}+</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Tags</h3>
            <div className={styles.tagGrid}>
              {tags.map((tag) => (
                <button
                  key={tag.value}
                  type="button"
                  className={`${styles.tagBtn} ${
                    filters.tags.includes(tag.value) ? styles.active : ''
                  }`}
                  onClick={() => handleTagToggle(tag.value)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
