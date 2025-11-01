import React from 'react';
import { BlogPost } from 'types/blog';
import { BlogCard } from '../BlogCard/BlogCard';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  posts: BlogPost[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <p className={styles.noPosts}>No posts found.</p>;
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};