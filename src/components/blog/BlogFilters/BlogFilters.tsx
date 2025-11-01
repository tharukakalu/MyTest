import React, { useState, useEffect } from 'react';
import { useDebounce } from 'hooks/useDebounce';
import styles from './BlogFilters.module.css';

interface BlogFiltersProps {
  initialSearch: string;
  onSearchChange: (search: string) => void;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  initialSearch,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);
  
  // Update local state if URL changes (e.g., browser back button)
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  return (
    <div className={styles.filters}>
      <input
        type="search"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
        aria-label="Search posts by title"
      />
    </div>
  );
};