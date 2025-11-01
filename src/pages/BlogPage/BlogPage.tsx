import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { useBlogPosts } from 'hooks/useBlogPosts';
import { fetchBlogCategories } from 'api/blogApi'; // Import new fetcher
import { BlogGrid } from 'components/blog/BlogGrid/BlogGrid';
import { Pagination } from 'components/blog/Pagination/Pagination';
import { BlogFilters } from 'components/blog/BlogFilters/BlogFilters';
import { SelectFilter } from 'components/common/SelectFilter/SelectFilter'; // Import new component
import { Spinner } from 'components/common/Spinner';
import { ErrorMessage } from 'components/common/ErrorMessage';
import styles from './BlogPage.module.css';

export const POSTS_PER_PAGE = 9;

// Sort options
const sortOptions = [
  { value: 'publication_date:DESC', label: 'Newest First' },
  { value: 'publication_date:ASC', label: 'Oldest First' },
  { value: 'title:ASC', label: 'Title (A-Z)' },
  { value: 'title:DESC', label: 'Title (Z-A)' },
];

export const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read all state from URL
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'publication_date:DESC';

  // Fetch categories for the dropdown
  const { data: categories = [] } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: fetchBlogCategories,
  });

  // Fetch blog posts using our custom hook
  const { data, isLoading, isError, error } = useBlogPosts({
    page,
    limit: POSTS_PER_PAGE,
    search,
    category_id: category ? parseInt(category, 10) : undefined,
    sort,
  });
  
  // Generic handler to update URL state for any filter
  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set('page', '1'); // Reset page on any filter change
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    }, { replace: true });
  };

  // Specific handler for pagination (doesn't reset page)
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    }, { replace: true });
    // Scroll to top on page change for good UX
    window.scrollTo(0, 0);
  };

  // Renders the main content based on API state
  const renderContent = () => {
    if (isLoading) {
      return <Spinner />; 
    }

    if (isError) {
      return <ErrorMessage message={error?.message || 'Failed to fetch posts.'} />;
    }

    if (data) {
      return (
        <>
          <BlogGrid posts={data.posts} />
          <Pagination
            currentPage={page}
            totalCount={data.totalCount}
            pageSize={POSTS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      );
    }
    
    return null;
  };

  return (
    <div className={styles.blogPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>VIKTOR Blog</h1>
      </header>

      {/* --- FILTER BAR --- */}
      <div className={styles.filterBar}>
        <BlogFilters 
          initialSearch={search} 
          onSearchChange={(val) => handleFilterChange('search', val)} 
        />
        <SelectFilter
          label="Category"
          value={category}
          onChange={(val) => handleFilterChange('category', val)}
          defaultOptionLabel="All Categories"
          options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
        />
        <SelectFilter
          label="Sort By"
          value={sort}
          onChange={(val) => handleFilterChange('sort', val)}
          defaultOptionLabel="Default" // Will use the initial value
          options={sortOptions}
        />
      </div>
      {/* --- END FILTER BAR --- */}

      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};