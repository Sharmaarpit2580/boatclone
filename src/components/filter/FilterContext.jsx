import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within FilterProvider');
  }
  return context;
}

export function FilterProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sidebarFilters, setSidebarFilters] = useState({
    categories: [],
    tags: [],
    priceRanges: [],
    ratings: [],
    sortBy: 'default',
  });

  const setFilter = (filterType, value = null) => {
    setActiveFilter(filterType);
    setSelectedCategory(value);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setSelectedCategory(null);
  };

  const updateSidebarFilters = (filters) => {
    setSidebarFilters(filters);
  };

  const clearSidebarFilters = () => {
    setSidebarFilters({
      categories: [],
      tags: [],
      priceRanges: [],
      ratings: [],
      sortBy: 'default',
    });
  };

  const value = {
    activeFilter,
    selectedCategory,
    sidebarFilters,
    setFilter,
    clearFilter,
    updateSidebarFilters,
    clearSidebarFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

