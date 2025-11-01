import React from 'react';
import { BlogPost } from 'types/blog';
import styles from './BlogCard.module.css';

// Helper to format the date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface BlogPostProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className={styles.card}>
      {/* This link wrapper makes the entire card clickable */}
      <a href="#" className={styles.cardLink}>
        <div className={styles.cardContent}>
          <div className={styles.metadata}>
            <div className={styles.categories}>
              {/* Map over categories if they exist */}
              {post.blogpost_categories?.map((cat) => (
                <span key={cat.id} className={styles.categoryPill}>
                  {cat.name}
                </span>
              ))}
            </div>
            <span className={styles.date}>
              {formatDate(post.publication_date)}
            </span>
          </div>

          <h3 className={styles.title}>{post.title}</h3>

          {/* This is the corrected <p> tag */}
          <p className={styles.summary}>
            {post.summary || 'Click to read the full article...'}
          </p>

          <footer className={styles.footer}>
            <span className={styles.author}>
              By {post.author?.name || 'VIKTOR Team'}
            </span>
            <span className={styles.readMore}>
              Read more &rarr;
            </span>
          </footer>
        </div>
      </a>
    </article>
  );
};