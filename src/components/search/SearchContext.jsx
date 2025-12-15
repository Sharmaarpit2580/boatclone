import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearch = (query) => {
    setSearchQuery(query.toLowerCase().trim());
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const value = {
    searchQuery,
    updateSearch,
    clearSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

